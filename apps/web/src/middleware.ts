import { NextResponse, type NextRequest } from 'next/server';

/**
 * Middleware to block access to protected routes in production
 * Only allows public pages: /, /about, /how-it-works, /contact, /waitlist, /terms, /privacy
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // List of public routes that should be accessible
  const publicRoutes = [
    '/',
    '/about',
    '/how-it-works',
    '/contact',
    '/waitlist',
    '/terms',
    '/privacy',
  ];

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(route);
  });

  // Block access to protected routes (everything except public routes)
  if (!isPublicRoute) {
    // Redirect to home page for any protected route
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
