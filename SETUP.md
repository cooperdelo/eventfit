# EventFit Platform Setup Guide

## Prerequisites

- Node.js 18+ and npm 9+
- Firebase account (for Auth, Firestore, Storage)
- Stripe account (for payments)

## Installation

```bash
# Install dependencies
npm install

# Install dependencies for all workspaces
npm install --workspaces
```

## Environment Setup

1. Copy `.env.local.example` to `.env.local` in the root directory
2. Copy `config/firebaseConfig.ts.example` to `config/firebaseConfig.ts`
3. Copy `config/stripeConfig.ts.example` to `config/stripeConfig.ts`
4. Fill in your Firebase and Stripe credentials

## Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Set up Storage bucket
5. Copy credentials to `.env.local` and `config/firebaseConfig.ts`

## Development

```bash
# Run development server (web app)
npm run dev

# Run in specific workspace
npm run dev --workspace=@eventfit/web

# Build all packages
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

## Project Structure

```
eventfit/
├── apps/
│   └── web/              # Next.js 15 web app
├── packages/
│   ├── ui/               # Shared UI components
│   ├── lib/               # Shared utilities
│   └── types/             # Shared TypeScript types
├── config/                # Configuration files
└── docs/                  # Documentation
```

## Quality Standards

This project follows Instagram/Pinterest-level quality:

- Zero duplicate components
- Clean architecture
- Production-ready code
- Full TypeScript strict mode
- Accessibility compliant

See `docs/QUALITY_ASSURANCE_GUIDE.md` for details.
