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

resource "aws_lambda_function" "lambda_site_view_counter" {
  filename      = "lambda_function_site_view_counter_payload.zip"
  function_name = "${var.name}-site-view-counter"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_site_view_counter.lambda_handler"
  memory_size   = 256
  timeout       = 10

  source_code_hash = data.archive_file.lambda_site_view_counter_src.output_base64sha256

  runtime = "python3.9"
}

resource "aws_lambda_function_url" "lambda_site_view_counter_invoke_url" {
  function_name      = aws_lambda_function.lambda_site_view_counter.function_name
  authorization_type = "NONE"
}
