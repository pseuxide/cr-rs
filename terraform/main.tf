terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.14.0"
    }
  }

  required_version = ">= 1.7.2"
}

provider "google" {
  credentials = var.gcp_credentials
  project     = var.project_id
  region      = "asia-northeast1"
}

resource "google_sql_database_instance" "postgres" {
  name             = "crud-rust-instance"
  region           = "asia-northeast1"
  database_version = "POSTGRES_15"

  settings {
    tier = "db-f1-micro" # Very small machine type with the lowest cost

    backup_configuration {
      enabled = false
    }

    ip_configuration {
      ipv4_enabled = true
    }
  }
}

resource "google_sql_database" "crud_rust_database" {
  name     = "crud-rust-database"
  instance = google_sql_database_instance.postgres.name
}

resource "google_sql_user" "default" {
  name     = "postgres"
  instance = google_sql_database_instance.postgres.name
  password = var.db_password
}

resource "google_artifact_registry_repository" "gar_repo" {
  provider = google

  location      = var.region
  repository_id = var.gar_repo_name
  format        = "DOCKER"
  description   = "Docker repository for ${var.gar_repo_name}"

  labels = {
    env = "test"
  }
}

output "instance_connection_name" {
  value = google_sql_database_instance.postgres.connection_name
}

output "database_url" {
  # public ipじゃなくていいのか？
  value = "postgres://postgres:${var.db_password}@/${google_sql_database_instance.postgres.connection_name}:5432/${google_sql_database.crud_rust_database.name}?host=/cloudsql/${google_sql_database_instance.postgres.connection_name}&sslmode=disable"
}
