'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileQuestion,
  Home,
  LayoutDashboard,
  FileText,
  Bot,
  Sparkles,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#231F1D] flex flex-col justify-between p-6 font-sans relative selection:bg-[#FDF4F0] selection:text-[#C85A32]">
      {/* Background Subtle Dot Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#EAE3D5_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      {/* Header Bar */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-4 relative z-10">
        <Logo size="md" showTagline />
        <Link href="/dashboard">
          <Button variant="secondary" size="sm" leftIcon={<LayoutDashboard className="w-4 h-4 text-[#C85A32]" />}>
            Go to Dashboard
          </Button>
        </Link>
      </header>

      {/* 404 Main Card */}
      <main className="w-full max-w-2xl mx-auto my-auto py-12 flex flex-col items-center text-center gap-6 relative z-10">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-[#FDF4F0] text-[#C85A32] border border-[#F6DCD1] flex items-center justify-center shadow-lg animate-bounce">
            <FileQuestion className="w-12 h-12" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#C85A32] text-white px-2.5 py-0.5 rounded-full text-xs font-black shadow-sm">
            404
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#231F1D] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-[#786F68] max-w-md mx-auto leading-relaxed">
            The candidate agent link or page route you are looking for doesn't exist, may have moved, or had an incomplete URL address.
          </p>
        </div>

        {/* Action Button Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md mt-2">
          <Link href="/dashboard" className="flex-1 min-w-[140px]">
            <Button variant="primary" size="md" className="w-full shadow-xs" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
              Return to Dashboard
            </Button>
          </Link>
          <Link href="/" className="flex-1 min-w-[140px]">
            <Button variant="secondary" size="md" className="w-full" leftIcon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Quick Route Suggestions */}
        <div className="w-full bg-white border border-[#EAE3D5] rounded-2xl p-5 shadow-xs flex flex-col gap-3 mt-4 text-left">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#786F68] flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-[#C85A32]" /> Popular Candidate Workspace Links:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
            <Link
              href="/builder/demo-resume-alex-1"
              className="p-3 bg-[#FAF6F0] hover:bg-[#FDF4F0] border border-[#EAE3D5] hover:border-[#C85A32] rounded-xl flex items-center gap-2 text-[#231F1D] transition-all"
            >
              <FileText className="w-4 h-4 text-[#C85A32]" />
              <span>Resume Builder</span>
            </Link>
            <Link
              href="/agent/demo-resume-alex-1"
              className="p-3 bg-[#FAF6F0] hover:bg-[#FDF4F0] border border-[#EAE3D5] hover:border-[#C85A32] rounded-xl flex items-center gap-2 text-[#231F1D] transition-all"
            >
              <Bot className="w-4 h-4 text-purple-600" />
              <span>Living Resume Agent</span>
            </Link>
            <Link
              href="/analyzer/demo-resume-alex-1"
              className="p-3 bg-[#FAF6F0] hover:bg-[#FDF4F0] border border-[#EAE3D5] hover:border-[#C85A32] rounded-xl flex items-center gap-2 text-[#231F1D] transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>ATS Analyzer</span>
            </Link>
            <Link
              href="/import-resume"
              className="p-3 bg-[#FAF6F0] hover:bg-[#FDF4F0] border border-[#EAE3D5] hover:border-[#C85A32] rounded-xl flex items-center gap-2 text-[#231F1D] transition-all"
            >
              <FileQuestion className="w-4 h-4 text-amber-600" />
              <span>Upload Old Resume</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto py-4 text-center text-xs text-[#786F68] relative z-10 border-t border-[#EAE3D5]/60">
        © 2026 Callback AI. All candidate agent routes active.
      </footer>
    </div>
  );
}
