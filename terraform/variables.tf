variable "gcp_credentials" {
  description = "Content of the GCP credentials JSON file"
  type        = string
}

variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "db_password" {
  description = "The database password"
  type        = string
}

variable "region" {
  description = "The GCP region for resources"
  type        = string
  default     = "asia-northeast1"
}

variable "gar_repo_name" {
  description = "The name of the GAR repository"
  type        = string
}