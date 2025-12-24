# SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
#
# SPDX-License-Identifier: MIT

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}