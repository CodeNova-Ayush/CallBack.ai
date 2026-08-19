'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  LayoutDashboard,
  Hammer,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function TrustScorePage() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-[#F5F9FB] relative overflow-hidden">
      {/* Soft ambient gradient orb behind the glass */}
      <div className="absolute w-72 h-72 rounded-full bg-[#048BA2]/15 blur-3xl pointer-events-none" />

      {/* Sleek Minimalist Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/90 border border-slate-200 shadow-xl rounded-3xl p-8 md:p-10 flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Minimalist Glowing Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#048BA2] text-white flex items-center justify-center shadow-lg shadow-[#048BA2]/25">
          <Hammer className="w-8 h-8" />
        </div>

        {/* Minimal Clean Typography */}
        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F5F8] text-[#048BA2] text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Coming Soon</span>
          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Under Construction
          </h1>

          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            This feature is currently being crafted with care. Check back soon for the next release!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full pt-1">
          <Link href="/dashboard" className="flex-1">
            <Button
              variant="secondary"
              size="md"
              leftIcon={<LayoutDashboard className="w-4 h-4" />}
              className="w-full"
            >
              Dashboard
            </Button>
          </Link>
          <Link href="/agent/demo-resume-alex-1" className="flex-1">
            <Button
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full"
            >
              Living Agent
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
