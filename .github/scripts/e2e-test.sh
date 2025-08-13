#!/bin/bash

set -e

echo "Starting E2E test execution..."

echo "Building Docker containers..."
docker-compose -f docker-compose.e2e.yml build

echo "Starting E2E environment..."
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
