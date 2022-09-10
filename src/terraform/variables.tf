variable "region" {
  type    = string
  default = "eu-central-1"
}

variable "name" {
  type    = string
  default = "schurteb-cloud-resume-challenge"
}

variable "default_tags" {
  type = map(string)

  default = {
    Project   = "cloud-resume-challenge"
    Terraform = "true"
  }
}
