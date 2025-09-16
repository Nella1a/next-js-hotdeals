#!/bin/bash

set -x
set -e

apt-get update

# Navigate to the frontend directory
cd /opt/frontend

# Install dependencies
npm install

# Run Playwright installation
npx playwright install --with-deps

# Remove .next folder to ensure a clean build
# Resolve .next path relative to script location
#rm -rf "$(dirname "$0")/../.next"

# Set environment variables
export NODE_ENV="production"
npm run build

npm run start &

# Debug: see the env var
echo "APP_ENV=$APP_ENV"


# Test
npx playwright test