import React from 'react';
import { Sidebar } from '@/components/nav/Sidebar';
import { auth } from '@clerk/nextjs/server';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await auth.protect();

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
