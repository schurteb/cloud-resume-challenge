# SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
#
# SPDX-License-Identifier: MIT

terraform {
  backend "s3" {
    bucket         = "schurteb-cloud-resume-challenge-tfstate"
    key            = "infra.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "schurteb-cloud-resume-challenge-tfstate"
    encrypt        = true
  }
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Author    = "schurteb"
      Website   = "https://resume.schurteb.ch"
      Project   = "cloud-resume-challenge"
      Terraform = "true"
    }
  }
}
