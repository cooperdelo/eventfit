#!/bin/bash
# Azure deployment script for Next.js
# This script builds and prepares the application for Azure App Service

set -e

echo "Starting Azure deployment..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Create output directory for Azure
echo "Preparing deployment package..."
mkdir -p .azure/output

# Copy necessary files
cp -r .next .azure/output/
cp -r public .azure/output/
cp package.json .azure/output/
cp package-lock.json .azure/output/
cp next.config.js .azure/output/
cp web.config .azure/output/

# Create server.js for Azure App Service
cat > .azure/output/server.js << 'EOF'
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
EOF

echo "Deployment package ready in .azure/output/"
echo "Deployment complete!"

