module "pipeline_authentication" {
  source = "./modules/pipeline-authentication"

  region = var.region

  default_tags = merge(
    var.default_tags,
    tomap({
      Module = "pipeline_authentication",
    })
  )
}

resource "aws_s3_bucket" "schurteb-cloud-resume-challenge-bucket" {
  bucket = "${var.name}-bucket"

  tags = merge(
    var.default_tags,
    tomap({
      Name = "${var.name}-bucket",
    })
  )
}

resource "aws_s3_bucket_policy" "allow_access_from_cloudfront_oac" {
  bucket = aws_s3_bucket.schurteb-cloud-resume-challenge-bucket.id
  policy = data.aws_iam_policy_document.allow_access_from_cloudfront_oac.json
}

resource "aws_cloudfront_origin_access_control" "origin_access_control" {
  name                              = "${var.name}-origin-access-control"
  description                       = "The OAI to be used with cloudfront and the s3 bucket for the public site"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}


resource "aws_cloudfront_distribution" "cloudfront_distribution_public_site" {
  default_cache_behavior {
    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]
    compress        = "true"
    default_ttl     = "0"

    forwarded_values {
      cookies {
        forward = "none"
      }

      query_string = "false"
    }

    max_ttl                = "0"
    target_origin_id       = aws_s3_bucket.schurteb-cloud-resume-challenge-bucket.bucket_regional_domain_name
    viewer_protocol_policy = "redirect-to-https"
  }

  default_root_object = "index.html"
  enabled             = "true"
  http_version        = "http2"
  is_ipv6_enabled     = "true"

  aliases = [
    "resume.schurteb.ch"
  ]

  origin {
    domain_name              = aws_s3_bucket.schurteb-cloud-resume-challenge-bucket.bucket_regional_domain_name
    origin_id                = aws_s3_bucket.schurteb-cloud-resume-challenge-bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.origin_access_control.id
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  retain_on_delete = "false"

  tags = merge(
    var.default_tags,
    tomap({
      Name = "${var.name}-public-site",
    })
  )

  viewer_certificate {
    minimum_protocol_version = "TLSv1"
    acm_certificate_arn      = "arn:aws:acm:us-east-1:420018626735:certificate/d6e6e836-cc21-418f-9cfd-b34c496d9965"
    ssl_support_method       = "sni-only"
  }
}

resource "aws_dynamodb_table" "dynamodb_backend" {
  name         = "${var.name}-backend"
  hash_key     = "ID"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "ID"
    type = "S"
  }
}

resource "aws_iam_role" "lambda_role" {
  name               = "${var.name}-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json
}

resource "aws_iam_policy" "lambda_role_permissions_policy" {
  name   = "${var.name}-site-view-counter-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.lambda_role_permissions_policy.json

  lifecycle {
    create_before_destroy = false
  }
}

resource "aws_iam_role_policy_attachment" "lambda_role_permissions_policy_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_role_permissions_policy.arn
}

##############################
### Lambda functions
##############################
resource "aws_lambda_function" "lambda_read_site_view_counter" {
  filename      = "lambda_function_read_site_view_counter_payload.zip"
  function_name = "${var.name}-read-site-view-counter"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_read_site_view_counter.lambda_handler"
  memory_size   = 256
  timeout       = 10

  source_code_hash = data.archive_file.lambda_read_site_view_counter_src.output_base64sha256

  runtime = "python3.9"
}

resource "aws_lambda_function" "lambda_write_site_view_counter" {
  filename      = "lambda_function_write_site_view_counter_payload.zip"
  function_name = "${var.name}-write-site-view-counter"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_write_site_view_counter.lambda_handler"
  memory_size   = 256
  timeout       = 10

  source_code_hash = data.archive_file.lambda_write_site_view_counter_src.output_base64sha256

  runtime = "python3.9"
}

/*resource "aws_lambda_function_url" "lambda_site_view_counter_invoke_url" {
  function_name      = aws_lambda_function.lambda_site_view_counter.function_name
  authorization_type = "NONE"
}*/

##############################
### ACM Certificate
##############################
resource "aws_acm_certificate" "certificate" {
  domain_name       = "resume.schurteb.ch"
  validation_method = "DNS"

  subject_alternative_names = [
    "api.resume.schurteb.ch",
    "dev.api.resume.schurteb.ch",
    "*.api.resume.schurteb.ch",
    "*.dev.api.resume.schurteb.ch",
  ]

  lifecycle {
    create_before_destroy = true
  }

  options {
    certificate_transparency_logging_preference = "ENABLED"
  }
}

resource "aws_acm_certificate_validation" "certificate" {
  certificate_arn = aws_acm_certificate.certificate.arn
}

##############################
### API Gateway
##############################
resource "aws_api_gateway_rest_api" "api" {
  name        = "${var.name}-api"
  description = "The api for the project \"${var.name}\""

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_deployment" "dev" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name = "dev"

  # TODO: Needs triggers here
  triggers = {
    # NOTE: The configuration below will satisfy ordering considerations,
    #       but not pick up all future REST API changes. More advanced patterns
    #       are possible, such as using the filesha1() function against the
    #       Terraform configuration file(s) or removing the .id references to
    #       calculate a hash against whole resources. Be aware that using whole
    #       resources will show a difference after the initial implementation.
    #       It will stabilize to only change when resources change afterwards.
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.view_count.id,
      aws_api_gateway_method.view_count_get.id,
      aws_api_gateway_method.view_count_post.id,
      aws_api_gateway_integration.view_count_get.id,
      aws_api_gateway_integration.view_count_post.id,
    ]))
  }

  /*depends_on = [
    aws_api_gateway_resource.view_count,
      aws_api_gateway_method.view_count_get,
      aws_api_gateway_method.view_count_post,
      aws_api_gateway_integration.view_count_get,
      aws_api_gateway_integration.view_count_post,
  ]*/

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_deployment" "prod" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name = "prod"

  # TODO: Needs triggers here
  triggers = {
    # NOTE: The configuration below will satisfy ordering considerations,
    #       but not pick up all future REST API changes. More advanced patterns
    #       are possible, such as using the filesha1() function against the
    #       Terraform configuration file(s) or removing the .id references to
    #       calculate a hash against whole resources. Be aware that using whole
    #       resources will show a difference after the initial implementation.
    #       It will stabilize to only change when resources change afterwards.
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.view_count.id,
      aws_api_gateway_method.view_count_get.id,
      aws_api_gateway_method.view_count_post.id,
      aws_api_gateway_integration.view_count_get.id,
      aws_api_gateway_integration.view_count_post.id,
    ]))
  }

  /*depends_on = [
    aws_api_gateway_resource.view_count,
      aws_api_gateway_method.view_count_get,
      aws_api_gateway_method.view_count_post,
      aws_api_gateway_integration.view_count_get,
      aws_api_gateway_integration.view_count_post,
  ]*/

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "dev" {
  deployment_id = aws_api_gateway_deployment.dev.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = "dev"
}

resource "aws_api_gateway_stage" "prod" {
  deployment_id = aws_api_gateway_deployment.prod.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = "prod"
}

# Domain mappings
resource "aws_api_gateway_domain_name" "api_dev" {
  regional_certificate_arn = aws_acm_certificate.certificate.arn
  domain_name              = "dev.api.resume.schurteb.ch"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_domain_name" "api_prod" {
  regional_certificate_arn = aws_acm_certificate.certificate.arn
  domain_name              = "api.resume.schurteb.ch"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_route53_record" "dns_apigateway_dev" {
  zone_id = "Z02021131EL6YPIPUO7IZ"
  name    = "dev.api.resume.schurteb.ch"
  type    = "A"

  alias {
    evaluate_target_health = false
    name                   = aws_api_gateway_domain_name.api_dev.regional_domain_name
    zone_id                = aws_api_gateway_domain_name.api_dev.regional_zone_id
  }
}

resource "aws_route53_record" "dns_apigateway_prod" {
  zone_id = "Z02021131EL6YPIPUO7IZ"
  name    = "api.resume.schurteb.ch"
  type    = "A"

  alias {
    evaluate_target_health = false
    name                   = aws_api_gateway_domain_name.api_prod.regional_domain_name
    zone_id                = aws_api_gateway_domain_name.api_prod.regional_zone_id
  }
}

resource "aws_api_gateway_base_path_mapping" "dev_mapping" {
  api_id      = aws_api_gateway_rest_api.api.id
  stage_name  = aws_api_gateway_stage.dev.stage_name
  domain_name = aws_api_gateway_domain_name.api_dev.domain_name
}

resource "aws_api_gateway_base_path_mapping" "prod_mapping" {
  api_id      = aws_api_gateway_rest_api.api.id
  stage_name  = aws_api_gateway_stage.prod.stage_name
  domain_name = aws_api_gateway_domain_name.api_prod.domain_name
}

# TODO: Update api-proxy-resource module to handle the root path edge case.
// path = /
/*resource "aws_api_gateway_resource" "root" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "/"
}*/

/*resource "aws_api_gateway_method" "view_count" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.root.id
  http_method   = "ANY"
  authorization = "NONE"

  lifecycle {
    create_before_destroy = false
  }
}*/

// path = /view_count
resource "aws_api_gateway_resource" "view_count" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "view_count"

  lifecycle {
    create_before_destroy = false
  }
}

// GET
resource "aws_api_gateway_method" "view_count_get" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.view_count.id
  http_method   = "GET"
  authorization = "NONE"

  lifecycle {
    create_before_destroy = false
  }
}

// POST
resource "aws_api_gateway_method" "view_count_post" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.view_count.id
  http_method   = "POST"
  authorization = "NONE"

  lifecycle {
    create_before_destroy = false
  }
}

resource "aws_api_gateway_integration" "view_count_get" {
  http_method             = aws_api_gateway_method.view_count_get.http_method
  integration_http_method = "POST"
  passthrough_behavior = "WHEN_NO_MATCH"
  resource_id             = aws_api_gateway_resource.view_count.id
  rest_api_id             = aws_api_gateway_rest_api.api.id
  timeout_milliseconds = "29000"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda_read_site_view_counter.invoke_arn
  credentials             = aws_iam_role.lambda_role.arn
}

resource "aws_api_gateway_integration" "view_count_post" {
  http_method             = aws_api_gateway_method.view_count_post.http_method
  integration_http_method = "POST"
  passthrough_behavior = "WHEN_NO_MATCH"
  resource_id             = aws_api_gateway_resource.view_count.id
  rest_api_id             = aws_api_gateway_rest_api.api.id
  timeout_milliseconds = "29000"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda_write_site_view_counter.invoke_arn
  credentials             = aws_iam_role.lambda_role.arn
}

# Lambda
/*resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_site_view_counter.function_name
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  # source_arn = "arn:aws:execute-api:${var.myregion}:${var.accountId}:${aws_api_gateway_rest_api.api.id}/ * /${aws_api_gateway_method.method.http_method}${aws_api_gateway_resource.resource.path}"
}*/

resource "aws_lambda_permission" "apigw_lambda_permission_read" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.lambda_read_site_view_counter.function_name}"
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "apigw_lambda_permission_write" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.lambda_write_site_view_counter.function_name}"
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

/*resource "aws_api_gateway_method_response" "response_200" {
  depends_on  = [
    aws_api_gateway_integration.view_count
  ]
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.api_resource_view_count.id
  http_method = aws_api_gateway_method.view_count.http_method
  response_models = {
    "application/json" = "Empty"
  }
  status_code = "200"
}

resource "aws_api_gateway_integration_response" "view_count" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.api_resource_view_count.id
  http_method = aws_api_gateway_method.view_count.http_method
  status_code = aws_api_gateway_method_response.response_200.status_code

  response_templates = {
    "application/json" = "Empty"
  }
} // end of "path = /""*/
/*
// path = /{proxy+}
module "root_proxy" {
  source = "./modules/api-proxy-resource"

  rest_api_id        = aws_api_gateway_rest_api.desigox.id
  parent_resource_id = aws_api_gateway_rest_api.desigox.root_resource_id
  proxy_uri          = join("", [local.prefix_https, local.portal_cloudfront_url, local.proxy_address])
}

// path = /main
resource "aws_api_gateway_resource" "main" {
  parent_id   = aws_api_gateway_rest_api.desigox.root_resource_id
  path_part   = "main"
  rest_api_id = aws_api_gateway_rest_api.desigox.id
}

// path = /main/design
resource "aws_api_gateway_resource" "design" {
  parent_id   = aws_api_gateway_resource.main.id
  path_part   = "design"
  rest_api_id = aws_api_gateway_rest_api.desigox.id
}

// path = /main/design/api
resource "aws_api_gateway_resource" "design_api" {
  parent_id   = aws_api_gateway_resource.design.id
  path_part   = "api"
  rest_api_id = aws_api_gateway_rest_api.desigox.id
}

// path = /main/design/api/{proxy+}
module "design_api_proxy" {
  source = "./modules/api-proxy-resource"

  rest_api_id        = aws_api_gateway_rest_api.desigox.id
  parent_resource_id = aws_api_gateway_resource.design_api.id
  proxy_uri          = join("", [local.prefix, local.design_alb_url, local.server_port, local.proxy_address])
}
*/
