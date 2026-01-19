#!/bin/sh
set -e

echo "📦 Installing dependencies..."
npm install --loglevel=info

echo ""
echo "⏳ Waiting for backend to be ready..."
# Wait for backend API to be available (max 60 seconds)
BACKEND_URL="http://backend:8000"
TIMEOUT=60
ELAPSED=0

until curl -f "$BACKEND_URL/health" -o /dev/null -s 2>/dev/null || [ $ELAPSED -ge $TIMEOUT ]; do
  printf '.'
  sleep 2
  ELAPSED=$((ELAPSED + 2))
done

if [ $ELAPSED -ge $TIMEOUT ]; then
  echo ""
  echo "⚠️  Warning: Backend not ready after ${TIMEOUT}s. Types may be outdated."
  echo "   Continuing with existing types..."
else
  echo ""
  echo "✅ Backend is ready!"
  
  echo ""
  echo "🔄 Generating TypeScript types from backend OpenAPI schema..."
  echo "   Backend URL: $BACKEND_URL/api/openapi.json"
  
  # Generate types from backend using docker-specific script
  if npm run generate-types:docker; then
    echo "✅ Types generated successfully!"
  else
    echo "⚠️  Warning: Type generation failed. Using existing types."
  fi
fi

echo ""
echo "🚀 Starting Vite dev server..."
npm run dev -- --host 0.0.0.0 --port 5173
