data "aws_caller_identity" "current" {}

locals {
  account_id = data.aws_caller_identity.current.account_id
}

resource "aws_iam_openid_connect_provider" "oidc_provider_github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com",
  ]

  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1"
  ]

  tags = merge(var.default_tags, tomap({
    "Name" = "Identity provider github.com"
    "Desc" = "Identity provider for access from github.com CI/CD pipelines"
  }))
}

resource "aws_iam_role" "pipeline_role" {
  name  = "CICDRole"
  path  = "/"

  # Allow max sessions of up to two hours
  max_session_duration = (2 * 3600)

  assume_role_policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::${local.account_id}:oidc-provider/token.actions.githubusercontent.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
                },
                "StringLike": {
                    "token.actions.githubusercontent.com:sub": "repo:schurteb/cloud-resume-challenge:*"
                }
            }
        }
    ]
}
  POLICY

  tags = merge(var.default_tags, tomap({
    "Name" = "CICDRole"
    "Desc" = "AWS IAM role to be used within pipeline."
  }))
}

resource "aws_iam_policy" "pipeline_access_policy" {
  name        = "${var.name}-access-policy"
  description = "Used to grant required access rights for services in use to the pipeline role"

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iam:*",
        "kms:*",
        "s3:*",
        "dynamodb:*",
        "cloudfront:*"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Deny",
      "Action": [
        "cloudtrail:*",
        "iam:CreateUser"
      ],
      "Resource": "*"
    }
  ]
}
  POLICY

  tags = merge(var.default_tags, tomap({
    "Name" = "${var.name}-access-policy"
  }))
}

resource "aws_iam_role_policy_attachment" "policy_attachment_access_policy" {
  role       = aws_iam_role.pipeline_role.name
  policy_arn = aws_iam_policy.pipeline_access_policy.arn
}
