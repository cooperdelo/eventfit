# Azure Deployment Guide for EventFit Public Pages

This guide will help you deploy the EventFit public pages to Azure App Service.

## Prerequisites

1. Azure Student Account with App Service access
2. Domain name configured
3. Node.js 20.x installed locally
4. Azure CLI installed (optional, for command-line deployment)

## Step 1: Create Azure App Service

1. Log in to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Web App" and select it
4. Click "Create"
5. Fill in the details:
   - **Subscription**: Your Azure Student subscription
   - **Resource Group**: Create new or use existing
   - **Name**: Your app name (e.g., `eventfit-public`)
   - **Publish**: Code
   - **Runtime stack**: Node.js 20 LTS
   - **Operating System**: Linux
   - **Region**: Choose closest to your users
   - **App Service Plan**: Create new (Free tier available for students)
6. Click "Review + create", then "Create"

## Step 2: Configure Domain

1. In your App Service, go to "Custom domains"
2. Click "Add custom domain"
3. Enter your domain name
4. Follow the instructions to add DNS records:
   - Add a CNAME record pointing to `your-app-name.azurewebsites.net`
   - Or add an A record if you prefer (requires verification)

## Step 3: Configure Environment Variables

1. In your App Service, go to "Configuration" > "Application settings"
2. Add the following environment variables:
   ```
   NODE_ENV=production
   PORT=8080
   ```

## Step 4: Deploy the Application

### Option A: Using Azure Portal (GitHub Actions)

1. In your App Service, go to "Deployment Center"
2. Select "GitHub Actions" as source
3. Connect your GitHub account
4. Select your repository and branch
5. Azure will automatically create a GitHub Actions workflow
6. Push to your main branch to trigger deployment

### Option B: Using Azure CLI

```bash
# Login to Azure
az login

# Navigate to the web app directory
cd apps/web

# Build the application
npm ci
npm run build

# Deploy using Azure CLI
az webapp up --name your-app-name --resource-group your-resource-group --runtime "NODE:20-lts"
```

### Option C: Using VS Code Azure Extension

1. Install the "Azure App Service" extension in VS Code
2. Right-click on `apps/web` folder
3. Select "Deploy to Web App"
4. Follow the prompts

### Option D: Manual FTP Deployment

1. In your App Service, go to "Deployment Center" > "FTPS credentials"
2. Note down the FTP hostname, username, and password
3. Use an FTP client to upload:
   - `.next` folder (build output)
   - `public` folder
   - `package.json` and `package-lock.json`
   - `next.config.js`
   - `web.config` (for Windows hosting)
   - `server.js` (create this file - see below)

## Step 5: Create server.js for Azure

Create a `server.js` file in `apps/web`:

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = process.env.PORT || 8080;

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
```

## Step 6: Configure Startup Command

1. In your App Service, go to "Configuration" > "General settings"
2. Set the startup command to:
   ```
   npm start
   ```
   Or if you created server.js:
   ```
   node server.js
   ```

## Step 7: Verify Deployment

1. Visit your domain or `https://your-app-name.azurewebsites.net`
2. Verify that only public pages are accessible:
   - `/` - Landing page
   - `/about` - About page
   - `/how-it-works` - How it works page
   - `/contact` - Contact page
   - `/waitlist` - Waitlist page
   - `/terms` - Terms of service
   - `/privacy` - Privacy policy
3. Verify that protected routes redirect to home:
   - `/dashboard` → should redirect to `/`
   - `/login` → should redirect to `/`
   - `/signup` → should redirect to `/`

## Troubleshooting

### Application not starting

- Check logs in App Service > "Log stream"
- Verify Node.js version matches (20.x)
- Ensure `package.json` has correct start script

### Routes not working

- Verify `middleware.ts` is in place
- Check that Next.js routing is configured correctly
- Review Azure App Service logs

### Static files not loading

- Ensure `public` folder is deployed
- Check `next.config.js` for correct image domains
- Verify file paths are correct

### Domain not working

- Verify DNS records are correct
- Check SSL certificate is configured (Azure provides free SSL)
- Ensure custom domain is verified in Azure Portal

## Public Pages Only

The application is configured to only serve public pages:

- Landing page (`/`)
- About (`/about`)
- How It Works (`/how-it-works`)
- Contact (`/contact`)
- Waitlist (`/waitlist`)
- Terms (`/terms`)
- Privacy (`/privacy`)

All other routes (dashboard, login, signup, events, etc.) will redirect to the home page.

## Support

For Azure-specific issues, refer to:

- [Azure App Service Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [Next.js on Azure](https://docs.microsoft.com/en-us/azure/static-web-apps/nextjs)
