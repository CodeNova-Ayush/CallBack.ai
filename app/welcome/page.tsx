'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Sparkles, Bot, ShieldCheck, ArrowRight, Layers, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { ResumeAtmosphereCanvas } from '@/components/common/ResumeAtmosphereCanvas';

export default function WelcomePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const displayName = isLoaded && user ? (user.firstName || user.fullName || 'Candidate') : 'Candidate';

  return (
    <div className="min-h-screen bg-[#F5F9FB] flex flex-col justify-between font-sans relative overflow-hidden selection:bg-[#E6F5F8] selection:text-[#048BA2]">
      {/* Corner-Framing 3D Resume Atmosphere Canvas */}
      <ResumeAtmosphereCanvas />

      {/* Ambient background mesh glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-[#048BA2]/18 via-[#024959]/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-35 -z-10" />

      {/* Header */}
      <header className="w-full px-6 lg:px-12 py-6 flex items-center justify-between relative z-10">
        <Logo size="md" showTagline />
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline-block">Signed in as</span>
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-full shadow-2xs">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt={displayName} className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200" />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#008CA0] to-[#048BA2] text-white flex items-center justify-center text-[10px] font-black">
                {displayName.charAt(0)}
              </div>
            )}
            <span className="text-xs font-black text-slate-900 tracking-tight">{displayName}</span>
          </div>
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="w-full max-w-4xl mx-auto px-6 py-6 sm:py-10 flex flex-col items-center text-center gap-8 relative z-10">
        {/* Verification Success Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/95 backdrop-blur-md border border-emerald-300/80 rounded-full shadow-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-extrabold text-emerald-900 tracking-tight">Account Verified & Ready</span>
        </div>

        {/* Welcome Headline */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
            Welcome to CallBack.ai,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#008CA0] via-[#048BA2] to-[#2E75C4]">
              {displayName}
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto font-medium leading-relaxed">
            Your career profile is transforming from a flat static document into an autonomous, verifiable AI candidate agent.
          </p>
        </div>

        {/* Clean, Polished Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full text-left">
          {/* Card 1: Living Agent */}
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-lg hover:border-[#048BA2]/40 hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#E6F5F8] text-[#048BA2] border border-[#048BA2]/15 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-black text-slate-900 tracking-tight">Living Agent</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Recruiters can converse directly with your interactive AI avatar 24/7 to explore your skills and projects.
              </p>
            </div>
          </div>

          {/* Card 2: Trust Score & ATS */}
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-lg hover:border-[#048BA2]/40 hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-500/15 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-black text-slate-900 tracking-tight">Trust Score & ATS</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Verify claims with live GitHub/LinkedIn proof and achieve 94%+ ATS keyword pass rates.
              </p>
            </div>
          </div>

          {/* Card 3: 3-Zone Studio */}
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-lg hover:border-[#048BA2]/40 hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4">
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#008CA0] border border-sky-400/15 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-black text-slate-900 tracking-tight">3-Zone Studio</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Live resume builder with auto-reordering, instant bullet enhancement, and print-perfect A4 PDF export.
              </p>
            </div>
          </div>
        </div>

        {/* Flagship Pushable Next Button */}
        <div className="w-full max-w-sm mt-2 flex flex-col items-center gap-2">
          <Link href="/get-started" className="w-full block">
            <button
              type="button"
              className="w-full py-4 px-8 bg-gradient-to-r from-[#024959] via-[#048BA2] to-[#0FA5BF] hover:from-[#013541] hover:to-[#037488] active:scale-[0.98] text-white font-black text-sm rounded-2xl shadow-lg shadow-[#048BA2]/25 hover:shadow-xl hover:shadow-[#048BA2]/35 flex items-center justify-center gap-3 transition-all cursor-pointer group"
            >
              <span>Next: Set Up Your Resume</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </Link>
          <span className="text-[11px] text-slate-400 font-bold">Step 1 of 2 • Ready to initialize your profile</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-6 text-center text-xs text-slate-400 border-t border-slate-200/80 bg-white/40 backdrop-blur-xs relative z-10">
        <span>CallBack.ai — Autonomous Candidate Agent Platform</span>
      </footer>
    </div>
  );
}

