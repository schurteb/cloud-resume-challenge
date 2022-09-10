data "aws_iam_policy_document" "allow_access_from_cloudfront_oai" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${aws_cloudfront_origin_access_identity.origin_access_identity.id}"]
    }

    effect = "Allow"

    actions = [
      "s3:GetObject",
      "s3:ListBucket",
    ]

    resources = [
      aws_s3_bucket.schurteb-cloud-resume-challenge-bucket.arn,
      "${aws_s3_bucket.schurteb-cloud-resume-challenge-bucket.arn}/*",
    ]
  }
}