# Azure Deployment Guide for EventFit Public Pages

This guide will help you deploy the EventFit public pages to Azure App Service using your Azure Student account.

## Overview

The EventFit public pages deployment includes:

- **Public Pages Only**: Landing, About, How It Works, Contact, Waitlist, Terms, Privacy
- **Protected Routes Blocked**: All dashboard, login, signup, and other protected routes redirect to home
- **Modern Design**: Maintains the same color scheme and modern look

## Quick Start

### 1. Prerequisites

- Azure Student Account with App Service access
- Domain name configured
- GitHub repository (optional, for CI/CD)

### 2. Create Azure App Service

1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource" → Search "Web App" → Create
3. Configure:
   - **Runtime stack**: Node.js 20 LTS
   - **Operating System**: Linux (recommended) or Windows
   - **App Service Plan**: Free tier (F1) for students
   - **Region**: Choose closest to your users
4. Click "Review + create" → "Create"

### 3. Configure Domain

1. In App Service → "Custom domains"
2. Click "Add custom domain"
3. Enter your domain
4. Add DNS records:
   - **CNAME**: `www` → `your-app-name.azurewebsites.net`
   - **A record**: Root domain (if supported by your registrar)
5. Azure will automatically provision SSL certificate

### 4. Deploy Application

#### Option A: GitHub Actions (Recommended)

1. In App Service → "Deployment Center"
2. Select "GitHub Actions"
3. Connect GitHub account and select repository
4. Azure will create `.github/workflows/azure-deploy.yml`
5. Update `AZURE_WEBAPP_NAME` in the workflow file
6. Push to main branch to deploy

#### Option B: Azure CLI

```bash
# Install Azure CLI if needed
# https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

# Login
az login

# Navigate to web app
cd apps/web

# Install dependencies
npm ci

# Build
npm run build

# Deploy
az webapp up \
  --name your-app-name \
  --resource-group your-resource-group \
  --runtime "NODE:20-lts"
```

#### Option C: VS Code Extension

1. Install "Azure App Service" extension
2. Right-click `apps/web` folder
3. Select "Deploy to Web App"
4. Follow prompts

#### Option D: Manual FTP

1. Build locally: `cd apps/web && npm ci && npm run build`
2. Get FTP credentials from App Service → "Deployment Center" → "FTPS credentials"
3. Upload:
   - `.next/` folder
   - `public/` folder
   - `package.json`, `package-lock.json`
   - `next.config.js`
   - `server.js`
   - `web.config` (Windows hosting)

### 5. Configure Startup Command

In App Service → "Configuration" → "General settings":

- **Startup Command**: `npm start` or `node server.js`

### 6. Environment Variables

Add in App Service → "Configuration" → "Application settings":

```
NODE_ENV=production
PORT=8080
```

## Public Pages

The following pages are accessible:

- `/` - Landing page
- `/about` - About page
- `/how-it-works` - How it works
- `/contact` - Contact form
- `/waitlist` - Join waitlist
- `/terms` - Terms of service
- `/privacy` - Privacy policy

All other routes (dashboard, login, signup, events, etc.) will redirect to `/`.

## File Structure

```
apps/web/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page
│   │   ├── about/
│   │   ├── how-it-works/
│   │   ├── contact/
│   │   ├── waitlist/         # New waitlist page
│   │   ├── terms/
│   │   └── privacy/
│   └── middleware.ts         # Blocks protected routes
├── server.js                 # Azure server entry point
├── web.config                # IIS configuration (Windows)
└── package.json
```

## Design & Styling

The public pages maintain the same design system:

- **Color Scheme**: Emerald (#004D40) + Varsity Gold (#FFC107)
- **Typography**: Playfair Display (headings) + Inter (body)
- **Components**: Consistent UI components from `@eventfit/ui`
- **Responsive**: Mobile-first design

## Troubleshooting

### App won't start

- Check App Service → "Log stream" for errors
- Verify Node.js version is 20.x
- Ensure `package.json` has `"start": "next start"`

### Routes not working

- Verify `middleware.ts` exists in `src/`
- Check middleware matcher configuration
- Review App Service logs

### Static files missing

- Ensure `public/` folder is deployed
- Check `next.config.js` image domains
- Verify file paths

### Domain issues

- Verify DNS records (use `nslookup` or `dig`)
- Check SSL certificate status
- Ensure custom domain is verified

### Build errors

- Run `npm ci` (not `npm install`) for consistent builds
- Check Node.js version matches (20.x)
- Verify all dependencies are installed

## Monitoring

- **Logs**: App Service → "Log stream" (real-time)
- **Metrics**: App Service → "Metrics" (performance)
- **Application Insights**: Enable for detailed analytics

## Cost Optimization

For Azure Student accounts:

- Use **Free tier** (F1) App Service Plan
- Free SSL certificates
- Free custom domain support
- 1 GB storage included

## Next Steps

1. Set up form submissions (Contact/Waitlist) to send emails or store in database
2. Configure analytics (Google Analytics, Azure Application Insights)
3. Set up monitoring and alerts
4. Configure backup strategy

## Support

- [Azure App Service Docs](https://docs.microsoft.com/en-us/azure/app-service/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Azure Student Portal](https://azure.microsoft.com/en-us/free/students/)
