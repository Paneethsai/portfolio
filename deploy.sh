#!/bin/bash
echo "🚀 Building your 3D Portfolio..."
npm run build

echo "📤 Deploying to Netlify..."
echo "(Make sure you have netlify-cli installed globally: npm i -g netlify-cli)"
echo "Running: netlify deploy --prod --dir=dist"
netlify deploy --prod --dir=dist

echo "✅ Done! Your portfolio is now live."
