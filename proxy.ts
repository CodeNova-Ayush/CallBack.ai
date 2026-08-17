import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const pubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
const secretKey = process.env.CLERK_SECRET_KEY || '';
const isClerkConfigured =
  Boolean(pubKey && secretKey) &&
  !pubKey.includes('your_clerk') &&
  !pubKey.includes('example') &&
  !secretKey.includes('your_clerk') &&
  !secretKey.includes('example');

export default isClerkConfigured
  ? clerkMiddleware()
  : () => NextResponse.next();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

