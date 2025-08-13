#!/bin/bash

set -e

export AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID:-123456789012}
export AWS_REGION=${AWS_REGION:-ap-northeast-1}
export VERSION_TAG=${VERSION_TAG:-latest}

echo "Starting E2E test execution..."

echo "Starting E2E environment with ECR images..."
docker-compose -f docker-compose.e2e.yml up -d

echo "Waiting for services to be ready..."
sleep 60

echo "Running health checks..."
curl -f http://localhost:3000/health || echo "Frontend health check failed"
curl -f http://localhost:8080/actuator/health || echo "Auth service health check failed"

echo "Installing Node.js dependencies..."
npm ci

echo "Running E2E tests..."
npx playwright test --reporter=json --output-file=e2e-results.json

echo "Cleaning up environment..."
docker-compose -f docker-compose.e2e.yml down -v

echo "E2E test execution completed."
