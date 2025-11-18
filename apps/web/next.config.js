/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@eventfit/ui', '@eventfit/lib', '@eventfit/types'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.doorlist',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Amazon product images
      {
        protocol: 'https',
        hostname: '*.ssl-images-amazon.com',
      },
      {
        protocol: 'https',
        hostname: '*.media-amazon.com',
      },
      // eBay product images
      {
        protocol: 'https',
        hostname: 'i.ebayimg.com',
      },
      {
        protocol: 'https',
        hostname: '*.ebayimg.com',
      },
      // Etsy product images
      {
        protocol: 'https',
        hostname: '*.etsystatic.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['@eventfit/ui', 'lucide-react'],
  },
};

module.exports = nextConfig;

