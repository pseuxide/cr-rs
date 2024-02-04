terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.14.0"
    }
  }

  required_version = ">= 1.5.7"
}

provider "google" {
  project     = var.project_id
  region      = "asia-northeast1"
}

import {
  id = "crud-rust-instance"
  to = google_sql_database_instance.postgres
}

import {
  id = "crud-rust-repo"
  to = google_artifact_registry_repository.gar_repo
}

# postgres sql
resource "google_sql_database_instance" "postgres" {
  name             = "crud-rust-instance"
  region           = "asia-northeast1"
  database_version = "POSTGRES_15"

  settings {
    tier = "db-f1-micro"

    backup_configuration {
      enabled = false
    }

    ip_configuration {
      ipv4_enabled = true
    }
  }
}

# creating database inside cloud sql instance
resource "google_sql_database" "crud_rust_database" {
  name     = "crud-rust-database"
  instance = google_sql_database_instance.postgres.name
}

# creating user in cloud sql
resource "google_sql_user" "default" {
  name     = "postgres"
  instance = google_sql_database_instance.postgres.name
  password = var.db_password
}

# creating artifact registry
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
  value = "postgres://postgres:${var.db_password}@/${google_sql_database_instance.postgres.connection_name}:5432/${google_sql_database.crud_rust_database.name}?host=/cloudsql/${google_sql_database_instance.postgres.connection_name}&sslmode=disable"
}
