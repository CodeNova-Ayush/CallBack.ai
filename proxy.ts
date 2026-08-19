import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const pubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
const secretKey = process.env.CLERK_SECRET_KEY || '';
const isClerkConfigured =
  Boolean(pubKey && secretKey) &&
  !pubKey.includes('your_clerk') &&
  !pubKey.includes('example') &&
  !secretKey.includes('your_clerk') &&
  !secretKey.includes('example');

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/login(.*)',
  '/register(.*)',
  '/api/export-pdf(.*)',
  '/api/match(.*)',
  '/api/auth(.*)',
]);

export default isClerkConfigured
  ? clerkMiddleware(async (auth, req) => {
      // If user has local session cookie or clerk auth, permit access
      const hasAuthCookie = req.cookies.get('callback_auth')?.value === '1';
      if (hasAuthCookie) {
        return NextResponse.next();
      }

      if (!isPublicRoute(req)) {
        const { userId } = await auth();
        if (!userId) {
          const url = req.nextUrl.clone();
          url.pathname = '/sign-in';
          url.searchParams.set('redirect_url', req.nextUrl.pathname);
          return NextResponse.redirect(url);
        }
      }
      return NextResponse.next();
    })
  : (req: any) => {
      const hasAuthCookie = req.cookies.get('callback_auth')?.value === '1';
      if (hasAuthCookie) {
        return NextResponse.next();
      }

      if (!isPublicRoute(req)) {
        const url = req.nextUrl.clone();
        url.pathname = '/sign-in';
        url.searchParams.set('redirect_url', req.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    };

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
