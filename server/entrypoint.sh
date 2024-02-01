#!/bin/sh
set -e

diesel migration run

# Start the main application
exec "$@"