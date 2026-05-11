#!/bin/bash
set -e

echo "🔨 Building MYC Document Platform for Vercel..."

echo "📦 Building client..."
cd client
npm install --legacy-peer-deps
npm run build
cd ..

if [ ! -d "client/dist" ]; then
  echo "❌ ERROR: Client build failed - dist directory not found!"
  exit 1
fi

echo "✅ Client built successfully"

echo "📦 Installing server dependencies..."
cd server
npm install --legacy-peer-deps
cd ..

echo "🎉 Build complete!"
