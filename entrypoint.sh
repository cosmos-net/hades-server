#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Run TypeORM migrations
pnpm run typeorm:migration:run

# Start the application
pnpm run start:prod

exec "$@"