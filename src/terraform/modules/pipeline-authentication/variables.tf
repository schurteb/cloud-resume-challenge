variable "region" {
  type    = string
}

variable "name" {
  type    = string
  default = "schurteb-cloud-resume-challenge-pipeline-authentication"
}

variable "default_tags" {
  type = map(string)

  default = {
    Project   = "cloud-resume-challenge"
    Terraform = "true"
  }
}
