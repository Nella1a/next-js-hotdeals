#!/bin/bash

set -x
set -e

# Remove .next folder to ensure a clean build
rm -rf ../.next


# Set environment variables
export NODE_ENV="production"
# Debug: see the env var
echo "USE_MOCK_PRISMA=$USE_MOCK_PRISMA"

# Build
npm run build

# Test
npx playwright test