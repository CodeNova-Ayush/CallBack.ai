import React from 'react';
import { Sidebar } from '@/components/nav/Sidebar';
import { auth } from '@clerk/nextjs/server';

const pubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
const secretKey = process.env.CLERK_SECRET_KEY || '';
const isClerkConfigured =
  Boolean(pubKey && secretKey) &&
  !pubKey.includes('your_clerk') &&
  !pubKey.includes('example') &&
  !secretKey.includes('your_clerk') &&
  !secretKey.includes('example');

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (isClerkConfigured) {
    try {
      await auth.protect();
    } catch {}
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

