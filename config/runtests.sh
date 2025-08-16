#!/bin/bash

set -x
set -e

# Remove .next folder to ensure a clean build
# Resolve .next path relative to script location
rm -rf "$(dirname "$0")/../.next"

# Set environment variables
export NODE_ENV="production"

# Debug: see the env var
echo "APP_ENV=$APP_ENV"

# production build
npm run build

# Test
npx playwright test