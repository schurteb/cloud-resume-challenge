data "aws_iam_policy_document" "allow_access_from_cloudfront_oac" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
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

data "aws_iam_policy_document" "lambda_assume_role_policy" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

data "aws_iam_policy_document" "lambda_role_permissions_policy" {
  statement {
    effect = "Allow"

    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem"
    ]

    resources = [
      aws_dynamodb_table.dynamodb_backend.arn
    ]
  }
}

data "archive_file" "lambda_site_view_counter_src" {
  type        = "zip"
  source_file = "lambda_site_view_counter.py"
  output_path = "lambda_function_site_view_counter_payload.zip"
}
