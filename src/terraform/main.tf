resource "aws_s3_bucket" "schurteb-cloud-resume-challenge-bucket" {
  bucket = "${var.name}-bucket"

  tags = merge(
    var.default_tags,
    tomap({
      Name = "${var.name}-bucket",
    })
  )
}

resource "aws_s3_bucket_policy" "allow_access_from_cloudfront_oai" {
  bucket = aws_s3_bucket.schurteb-cloud-resume-challenge-bucket.id
  policy = data.aws_iam_policy_document.allow_access_from_cloudfront_oai.json
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "The OAI to be used with cloudfront and the s3 bucket for the public site"
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
    domain_name = aws_s3_bucket.schurteb-cloud-resume-challenge-bucket.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.schurteb-cloud-resume-challenge-bucket.bucket_regional_domain_name

    s3_origin_config {
      origin_access_identity = "origin-access-identity/cloudfront/${aws_cloudfront_origin_access_identity.origin_access_identity.id}"
    }
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
    minimum_protocol_version       = "TLSv1"
    acm_certificate_arn = aws_acm_certificate.certificate_resume_cf_distro.arn
    ssl_support_method = "sni-only"
  }
}

resource "aws_acm_certificate" "certificate_resume_cf_distro" {
  domain_name       = "resume.schurteb.ch"
  validation_method = "DNS"

  tags = merge(
    var.default_tags,
    tomap({
      Name = "${var.name}-cert",
    })
  )

  lifecycle {
    create_before_destroy = true
  }
}