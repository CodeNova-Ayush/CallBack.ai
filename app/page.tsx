'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Sparkles,
  Bot,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Target,
  Briefcase,
  GitGraph,
  UserCheck,
  Star,
  Check,
  TrendingUp,
  Layout,
  Layers,
  Palette,
  ChevronRight,
  Play,
  Pause,
  RefreshCw,
  Code,
  Terminal,
  Cpu,
  HelpCircle,
  ChevronDown,
  Quote,
  Users,
  Award,
  CheckCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Card';
import { Logo } from '@/components/ui/Logo';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const [heroTemplateMode, setHeroTemplateMode] = useState<
    'modern_executive' | 'minimalist_tech' | 'classic_ats' | 'editorial_two_col' | 'agent'
  >('modern_executive');
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);
  const [cycleProgress, setCycleProgress] = useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const [activeTab, setActiveTab] = useState<'agent' | 'ats' | 'trust'>('agent');
  const [selectedDemoTemplate, setSelectedDemoTemplate] = useState<'classic_ats' | 'modern_executive' | 'minimalist_tech' | 'editorial_two_col'>('modern_executive');

  const [heroPromptIdx, setHeroPromptIdx] = useState(0);
  const [typedIndex, setTypedIndex] = useState(0);

  const heroModesList: Array<'modern_executive' | 'minimalist_tech' | 'classic_ats' | 'editorial_two_col' | 'agent'> = [
    'modern_executive',
    'minimalist_tech',
    'classic_ats',
    'editorial_two_col',
    'agent',
  ];

  const sampleHeroPrompts = [
    {
      shortLabel: "Latency Optimization",
      question: "What was John's biggest latency optimization achievement?",
      answer: "John architected a PgVector RAG query pipeline at Aether Cloud Tech handling 150k daily active requests, cutting p95 latency by 45% down to 180ms.",
      citation: "Experience #1 — Aether Cloud Tech (Verified on GitHub)",
    },
    {
      shortLabel: "Degree Verification",
      question: "Is John's UC Berkeley degree verified?",
      answer: "Yes. John graduated with a B.S. in Computer Science from UC Berkeley (3.88 GPA). The claim status is 100% verified via university registrar credentials.",
      citation: "Education Entry #1 — UC Berkeley Registrar Signal",
    },
    {
      shortLabel: "Core Tech Stack",
      question: "What are his top core technical skills?",
      answer: "TypeScript, Next.js 16, Python, PgVector RAG pipelines, Rust vector indices, PostgreSQL, and AWS Architecture.",
      citation: "Skill Graph — Verified across 4 production projects",
    },
  ];

  // Fast 2-Second Auto-cycling timer for live template morphing
  useEffect(() => {
    if (!isAutoCycling) return;

    const interval = setInterval(() => {
      setCycleProgress((prev) => {
        if (prev >= 100) {
          setHeroTemplateMode((curr) => {
            const nextIdx = (heroModesList.indexOf(curr) + 1) % heroModesList.length;
            if (heroModesList[nextIdx] === 'agent') {
              setTypedIndex(0);
            }
            return heroModesList[nextIdx];
          });
          return 0;
        }
        return prev + 2.5; // 2.5% every 50ms = exactly 2000ms (2 seconds)
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoCycling]);

  // Live typing effect for Living Agent mode
  useEffect(() => {
    if (heroTemplateMode === 'agent') {
      const fullText = sampleHeroPrompts[heroPromptIdx].answer;
      if (typedIndex < fullText.length) {
        const timer = setTimeout(() => {
          setTypedIndex((prev) => prev + 1);
        }, 18);
        return () => clearTimeout(timer);
      }
    }
  }, [typedIndex, heroPromptIdx, heroTemplateMode]);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#231F1D] flex flex-col font-sans relative overflow-x-hidden selection:bg-[#FDF4F0] selection:text-[#C85A32]">
      {/* Background Subtle Dot Pattern Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#EAE3D5_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      {/* Top Navbar — Edge to Edge */}
      <header className="sticky top-0 z-50 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#EAE3D5]">
        <div className="w-full px-6 lg:px-12 h-20 flex items-center justify-between">
          <Logo size="md" showTagline />

          {/* Pill Navigation Bar */}
          <nav className="hidden md:flex items-center gap-2">
            <a href="#templates" className="px-4 py-2 bg-white border border-[#EAE3D5] text-[#231F1D] text-xs font-bold rounded-full shadow-2xs hover:bg-[#FDF4F0] hover:text-[#C85A32] transition-all">
              Templates
            </a>
            <a href="#features" className="px-4 py-2 bg-white border border-[#EAE3D5] text-[#231F1D] text-xs font-bold rounded-full shadow-2xs hover:bg-[#FDF4F0] hover:text-[#C85A32] transition-all">
              Features
            </a>
            <a href="#ats-matrix" className="px-4 py-2 bg-white border border-[#EAE3D5] text-[#231F1D] text-xs font-bold rounded-full shadow-2xs hover:bg-[#FDF4F0] hover:text-[#C85A32] transition-all">
              ATS Multi-Parser
            </a>
            <a href="#wall-of-proof" className="px-4 py-2 bg-white border border-[#EAE3D5] text-[#231F1D] text-xs font-bold rounded-full shadow-2xs hover:bg-[#FDF4F0] hover:text-[#C85A32] transition-all">
              Wall of Proof
            </a>
            <a href="#faq" className="px-4 py-2 bg-white border border-[#EAE3D5] text-[#231F1D] text-xs font-bold rounded-full shadow-2xs hover:bg-[#FDF4F0] hover:text-[#C85A32] transition-all">
              FAQ
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs font-bold text-[#231F1D] hover:text-[#C85A32] transition-colors">
              Login
            </Link>
            <Link href="/dashboard">
              <Button variant="primary" size="md" className="shadow-xs" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section — Full-Bleed Edge to Edge */}
      <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-10 px-6 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left Column: Hero Content & Call to Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#EAE3D5] rounded-full shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-pulse" />
              <span className="text-xs font-bold text-[#231F1D]">Next-Gen AI Resume Builder & Candidate Agent</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#231F1D] tracking-tight leading-[1.1]">
              Your Resume is No Longer a Static PDF.{' '}
              <span className="text-[#C85A32] underline decoration-[#F6DCD1] decoration-wavy decoration-2">
                It's an Autonomous Candidate Agent.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#786F68] leading-relaxed font-normal">
              Create ATS-optimized resumes from multiple professional template designs, verify experience claims, and empower recruiters to converse directly with your candidate agent.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 w-full py-3 border-y border-[#EAE3D5]/80 my-2">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold text-[#231F1D]">40+ Templates</span>
                <span className="text-[11px] font-bold text-[#786F68] uppercase">ATS Library</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold text-[#C85A32]">94%</span>
                <span className="text-[11px] font-bold text-[#786F68] uppercase">ATS Pass Rate</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold text-[#231F1D]">100%</span>
                <span className="text-[11px] font-bold text-[#786F68] uppercase">Grounded Q&A</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto px-8 shadow-md" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Explore Demo Dashboard
                </Button>
              </Link>
              <Link href="/builder/demo-resume-alex-1">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                  Open 3-Zone Builder
                </Button>
              </Link>
            </div>
          </div>
          {/* Right Column: Live-Morphing Interactive Template Preview Workspace Mockup */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-gradient-to-b from-white via-white to-[#FAF6F0] border border-[#EAE3D5] rounded-3xl shadow-2xl p-6 md:p-7 flex flex-col gap-5 relative overflow-hidden ring-1 ring-[#C85A32]/10">
              {/* Ambient Glow Accent */}
              <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-bl from-[#C85A32]/10 via-[#C85A32]/5 to-transparent blur-2xl pointer-events-none" />

              {/* Window Bar Header */}
              <div className="flex items-center justify-between border-b border-[#EAE3D5] pb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-bold text-[#231F1D] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Template Engine — John Snow
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full shadow-2xs">
                    {heroTemplateMode === 'classic_ats' && 'ATS: 98/100'}
                    {heroTemplateMode === 'modern_executive' && 'ATS: 96/100'}
                    {heroTemplateMode === 'minimalist_tech' && 'ATS: 95/100'}
                    {heroTemplateMode === 'editorial_two_col' && 'ATS: 94/100'}
                    {heroTemplateMode === 'agent' && '100% Grounded'}
                  </span>
                  <button
                    onClick={() => setIsAutoCycling(!isAutoCycling)}
                    className="p-1 text-[#786F68] hover:text-[#C85A32] hover:bg-[#FDF4F0] rounded-lg transition-colors cursor-pointer"
                    title={isAutoCycling ? 'Pause auto-cycle' : 'Play auto-cycle'}
                  >
                    {isAutoCycling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#C85A32]" />}
                  </button>
                </div>
              </div>

              {/* Auto-cycle Progress Line */}
              <div className="w-full bg-[#EAE3D5] h-0.5 rounded-full overflow-hidden relative -mt-3">
                <div
                  className="bg-[#C85A32] h-full transition-all duration-100 ease-linear"
                  style={{ width: `${cycleProgress}%` }}
                />
              </div>

              {/* Interactive Live Template Mode Selector Bar */}
              <div className="flex items-center gap-1 bg-[#FAF6F0] p-1.5 rounded-2xl border border-[#EAE3D5] relative z-10 overflow-x-auto">
                <button
                  onClick={() => { setHeroTemplateMode('modern_executive'); setIsAutoCycling(false); }}
                  className={`px-3 py-1.5 text-[11px] font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    heroTemplateMode === 'modern_executive'
                      ? 'bg-white text-[#C85A32] shadow-sm border border-[#EAE3D5]'
                      : 'text-[#786F68] hover:text-[#231F1D]'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-[#C85A32]" /> Modern Exec
                </button>
                <button
                  onClick={() => { setHeroTemplateMode('minimalist_tech'); setIsAutoCycling(false); }}
                  className={`px-3 py-1.5 text-[11px] font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    heroTemplateMode === 'minimalist_tech'
                      ? 'bg-white text-[#C85A32] shadow-sm border border-[#EAE3D5]'
                      : 'text-[#786F68] hover:text-[#231F1D]'
                  }`}
                >
                  <Code className="w-3.5 h-3.5 text-blue-600" /> Dev Tech
                </button>
                <button
                  onClick={() => { setHeroTemplateMode('classic_ats'); setIsAutoCycling(false); }}
                  className={`px-3 py-1.5 text-[11px] font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    heroTemplateMode === 'classic_ats'
                      ? 'bg-white text-[#C85A32] shadow-sm border border-[#EAE3D5]'
                      : 'text-[#786F68] hover:text-[#231F1D]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-700" /> Classic ATS
                </button>
                <button
                  onClick={() => { setHeroTemplateMode('editorial_two_col'); setIsAutoCycling(false); }}
                  className={`px-3 py-1.5 text-[11px] font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    heroTemplateMode === 'editorial_two_col'
                      ? 'bg-white text-[#C85A32] shadow-sm border border-[#EAE3D5]'
                      : 'text-[#786F68] hover:text-[#231F1D]'
                  }`}
                >
                  <Layout className="w-3.5 h-3.5 text-purple-700" /> 2-Column
                </button>
                <button
                  onClick={() => { setHeroTemplateMode('agent'); setIsAutoCycling(false); setTypedIndex(0); }}
                  className={`px-3 py-1.5 text-[11px] font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    heroTemplateMode === 'agent'
                      ? 'bg-white text-[#C85A32] shadow-sm border border-[#EAE3D5]'
                      : 'text-[#786F68] hover:text-[#231F1D]'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 text-[#C85A32]" /> Living Agent
                </button>
              </div>

              {/* Dynamic Live-Morphing Viewport with 2-Second Cross-Fade */}
              <div className="relative z-10 min-h-[260px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {/* 1. Modern Executive Morphing View */}
                  {heroTemplateMode === 'modern_executive' && (
                    <motion.div
                      key="modern_executive"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="bg-white border border-[#EAE3D5] rounded-2xl p-5 shadow-xs flex flex-col gap-3.5"
                    >
                      <div className="bg-gradient-to-r from-[#FDF4F0] via-white to-[#FDF4F0] border-l-4 border-[#C85A32] p-3 rounded-r-xl flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-base font-black text-[#231F1D] tracking-tight">JOHN SNOW</span>
                          <span className="text-xs font-bold text-[#C85A32]">Senior AI & Full-Stack Systems Architect</span>
                        </div>
                        <span className="px-2.5 py-1 text-[10px] font-extrabold bg-[#C85A32] text-white rounded-full">
                          Modern Executive
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 text-xs">
                        <div className="flex items-center justify-between font-bold text-[#231F1D]">
                          <span className="flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-[#C85A32]" /> Aether Cloud Tech — Senior AI Engineer
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono">2023 – Present</span>
                        </div>
                        <p className="text-[11px] text-[#786F68] leading-relaxed bg-[#FAF6F0] p-2.5 rounded-xl border border-[#EAE3D5]">
                          "Architected scalable PgVector RAG query pipeline handling 150k daily active requests at 180ms p95 latency."
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#EAE3D5] text-[10px]">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Workday & Greenhouse Formatted
                        </div>
                        <span className="text-[#C85A32] font-bold">96% ATS Compatibility</span>
                      </div>
                    </motion.div>
                  )}

                  {/* 2. Minimalist Tech Morphing View (Dark Developer Mode) */}
                  {heroTemplateMode === 'minimalist_tech' && (
                    <motion.div
                      key="minimalist_tech"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="bg-[#18181B] text-zinc-200 border border-zinc-800 rounded-2xl p-5 shadow-inner flex flex-col gap-3 font-mono text-xs"
                    >
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px]">
                          <Terminal className="w-3.5 h-3.5" /> // JOHN_SNOW_SYSTEMS.ts
                        </span>
                        <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-zinc-700">
                          DEV_LAYOUT
                        </span>
                      </div>

                      <div className="bg-black/50 p-3 rounded-xl border border-zinc-800/80 text-[11px] leading-relaxed flex flex-col gap-1 text-zinc-300">
                        <span className="text-purple-400">const <span className="text-yellow-300">experience</span> = &#123;</span>
                        <span className="pl-3 text-zinc-400">role: <span className="text-emerald-300">"Senior AI Engineer"</span>,</span>
                        <span className="pl-3 text-zinc-400">metric: <span className="text-emerald-300">"45% latency cut (180ms p95) at 150k DAU"</span>,</span>
                        <span className="pl-3 text-zinc-400">tech: [<span className="text-orange-300">"Next.js 16"</span>, <span className="text-orange-300">"PgVector"</span>, <span className="text-orange-300">"Claude 3.5"</span>]</span>
                        <span className="text-purple-400">&#125;;</span>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[10px] text-zinc-500">
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> GitHub Commits Verified
                        </span>
                        <span className="text-zinc-400 font-bold">95% Technical ATS</span>
                      </div>
                    </motion.div>
                  )}

                  {/* 3. Classic ATS Standard Morphing View */}
                  {heroTemplateMode === 'classic_ats' && (
                    <motion.div
                      key="classic_ats"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col gap-3 font-serif"
                    >
                      <div className="text-center border-b border-gray-200 pb-2.5 flex flex-col">
                        <span className="text-base font-black text-gray-900 tracking-wider">JOHN SNOW</span>
                        <span className="text-[10px] text-gray-600 font-sans">San Francisco, CA • john.snow@demo.com • (555) 234-5678</span>
                      </div>

                      <div className="flex flex-col gap-1.5 text-xs text-gray-800 font-sans">
                        <div className="flex justify-between font-bold border-b border-gray-100 pb-0.5">
                          <span className="text-gray-900">EXPERIENCE: Aether Cloud Tech</span>
                          <span className="text-[10px] text-gray-500 font-mono">2023 – Present</span>
                        </div>
                        <ul className="list-disc list-inside text-[11px] text-gray-600 space-y-1 pl-1">
                          <li>Architected scalable PgVector RAG query pipeline handling 150k daily requests at 180ms p95 latency.</li>
                          <li>Reduced model hallucination below 0.4% with custom evaluation suite.</li>
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[10px] font-sans">
                        <span className="text-emerald-700 font-bold">✔ Fortune 500 ATS Standard (Taleo, Workday)</span>
                        <span className="font-extrabold text-gray-900">98% Extractable</span>
                      </div>
                    </motion.div>
                  )}

                  {/* 4. Editorial Two-Column Morphing View */}
                  {heroTemplateMode === 'editorial_two_col' && (
                    <motion.div
                      key="editorial_two_col"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="bg-white border border-[#EAE3D5] rounded-2xl p-4 shadow-xs grid grid-cols-12 gap-3 text-xs"
                    >
                      <div className="col-span-4 bg-[#FAF6F0] p-3 rounded-xl border border-[#EAE3D5] flex flex-col gap-2">
                        <span className="text-[11px] font-black text-[#231F1D]">John Snow</span>
                        <span className="text-[9px] text-[#C85A32] font-bold uppercase">Skills & Education</span>
                        <div className="flex flex-wrap gap-1">
                          {['TypeScript', 'PgVector', 'Next.js', 'Python'].map((s) => (
                            <span key={s} className="px-1.5 py-0.5 text-[8px] bg-white border border-[#EAE3D5] rounded font-bold">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="col-span-8 flex flex-col justify-between gap-2 p-1">
                        <div className="flex flex-col gap-1">
                          <span className="text-[11px] font-extrabold text-[#231F1D]">Senior AI Systems Engineer</span>
                          <span className="text-[9px] text-[#786F68]">Aether Cloud Tech • 2023–Present</span>
                          <p className="text-[10px] text-gray-600 leading-tight">
                            Led core retrieval pipelines for 150k active users with sub-200ms latency.
                          </p>
                        </div>
                        <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 self-start">
                          94% ATS Compliance
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* 5. Living Agent Mode (Character Streaming Typing) */}
                  {heroTemplateMode === 'agent' && (
                    <motion.div
                      key="agent"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="flex flex-col gap-3.5"
                    >
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {sampleHeroPrompts.map((p, idx) => (
                          <button
                            key={idx}
                            onClick={() => { setHeroPromptIdx(idx); setTypedIndex(0); }}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer border ${
                              heroPromptIdx === idx
                                ? 'bg-[#C85A32] text-white border-[#C85A32] shadow-xs'
                                : 'bg-white text-[#786F68] border-[#EAE3D5] hover:bg-[#FDF4F0] hover:text-[#C85A32]'
                            }`}
                          >
                            "{p.shortLabel}"
                          </button>
                        ))}
                      </div>

                      <div className="bg-[#FAF6F0] p-3 rounded-xl text-xs text-[#231F1D] font-bold border border-[#EAE3D5] flex items-center justify-between">
                        <span>Recruiter: "{sampleHeroPrompts[heroPromptIdx].question}"</span>
                        <span className="text-[10px] text-zinc-400 font-mono">Live Stream</span>
                      </div>

                      <div className="bg-gradient-to-r from-[#FDF4F0] via-white to-[#FDF4F0] p-3.5 rounded-xl text-xs text-[#231F1D] border border-[#F6DCD1] flex flex-col gap-2 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-[#C85A32] flex items-center gap-1.5">
                            <Bot className="w-3.5 h-3.5 text-[#C85A32]" /> Candidate RAG Agent Output
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          </span>
                          <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            100% Grounded
                          </span>
                        </div>

                        <div className="text-xs text-[#231F1D] font-medium leading-relaxed font-sans min-h-[42px]">
                          "{sampleHeroPrompts[heroPromptIdx].answer.slice(0, typedIndex)}"
                          <span className="inline-block w-1.5 h-3.5 bg-[#C85A32] ml-0.5 animate-pulse align-middle" />
                        </div>

                        <div className="pt-1.5 border-t border-[#F6DCD1] flex items-center justify-between text-[10px] text-[#C85A32] font-bold">
                          <span className="flex items-center gap-1 text-emerald-700">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {sampleHeroPrompts[heroPromptIdx].citation}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-400">RAG: 99.8%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Quick-Action Bar */}
              <div className="pt-3 border-t border-[#EAE3D5] flex items-center justify-between text-xs relative z-10">
                <span className="text-[11px] font-semibold text-[#786F68] flex items-center gap-1.5">
                  <RefreshCw className={`w-3.5 h-3.5 text-[#C85A32] ${isAutoCycling ? 'animate-spin' : ''}`} />
                  {isAutoCycling ? 'Auto-morphing preview active' : 'Template preview paused'}
                </span>
                <Link href="/builder/demo-resume-alex-1">
                  <span className="font-extrabold text-[#C85A32] hover:underline flex items-center gap-1 cursor-pointer">
                    Edit in 3-Zone Builder <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Templates Gallery Showcase Section */}
      <section id="templates" className="py-20 px-6 lg:px-12 bg-white border-y border-[#EAE3D5] relative z-10 w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
            <Badge variant="terracotta" size="sm">
              <Layout className="w-3.5 h-3.5" /> 40+ Production Resume Templates
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#231F1D] tracking-tight">
              Choose from 40+ ATS-Tested Templates
            </h2>
            <p className="text-base text-[#786F68] leading-relaxed">
              Switch templates anytime in the 3-zone builder with a single click. Every template is 100% ATS-tested, formatted for Workday & Greenhouse parsers, and exportable to printable A4 PDF.
            </p>
          </div>

          {/* Featured Template Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Classic ATS Standard */}
            <div
              onClick={() => setSelectedDemoTemplate('classic_ats')}
              className={`bg-[#FAF6F0] p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-5 group ${
                selectedDemoTemplate === 'classic_ats'
                  ? 'border-[#C85A32] shadow-lg ring-2 ring-[#C85A32]/25 bg-white'
                  : 'border-[#EAE3D5] hover:border-[#C85A32]/50 hover:bg-white hover:shadow-md'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#C85A32] uppercase tracking-wider">Classic ATS Standard</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                    98% ATS
                  </span>
                </div>
                <p className="text-xs text-[#786F68] leading-relaxed">
                  Traditional single-column layout with serif headers, favored by Fortune 500 recruiters.
                </p>
              </div>

              {/* Graphical Mini Preview Sheet */}
              <div className="h-40 bg-white border border-[#EAE3D5] rounded-2xl p-3.5 flex flex-col gap-2 overflow-hidden shadow-2xs group-hover:shadow-xs transition-all relative">
                <div className="text-center border-b border-gray-100 pb-1.5 flex flex-col items-center">
                  <span className="font-serif text-[11px] font-black text-[#231F1D]">JOHN SNOW</span>
                  <span className="text-[8px] text-gray-500 font-serif">Senior Full-Stack & AI Engineer</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-1/3 h-1 bg-[#C85A32] rounded-full" />
                  <div className="w-full h-1 bg-gray-200 rounded" />
                  <div className="w-5/6 h-1 bg-gray-200 rounded" />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <div className="w-1/4 h-1 bg-gray-800 rounded-full" />
                  <div className="w-full h-1 bg-gray-200 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#EAE3D5] text-[11px] font-bold text-[#786F68] group-hover:text-[#C85A32] transition-colors">
                <span>Fortune 500 Standard</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 2. Modern Executive */}
            <div
              onClick={() => setSelectedDemoTemplate('modern_executive')}
              className={`bg-[#FAF6F0] p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-5 group ${
                selectedDemoTemplate === 'modern_executive'
                  ? 'border-[#C85A32] shadow-lg ring-2 ring-[#C85A32]/25 bg-white'
                  : 'border-[#EAE3D5] hover:border-[#C85A32]/50 hover:bg-white hover:shadow-md'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#C85A32] uppercase tracking-wider">Modern Executive</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                    96% ATS
                  </span>
                </div>
                <p className="text-xs text-[#786F68] leading-relaxed">
                  Left terracotta accent banner, structured card entries, and sleek sans-serif typography.
                </p>
              </div>

              {/* Graphical Mini Preview Sheet */}
              <div className="h-40 bg-white border border-[#EAE3D5] rounded-2xl p-3 flex flex-col gap-2 overflow-hidden shadow-2xs group-hover:shadow-xs transition-all">
                <div className="w-full bg-[#FDF4F0] border-l-3 border-[#C85A32] rounded-r-lg p-2 flex flex-col gap-0.5">
                  <span className="text-[10px] font-black text-[#231F1D]">JOHN SNOW</span>
                  <span className="text-[8px] text-[#C85A32] font-semibold">Senior AI Systems Architect</span>
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <div className="w-1/3 h-1 bg-[#C85A32] rounded" />
                  <div className="w-full h-1 bg-gray-200 rounded" />
                  <div className="w-4/5 h-1 bg-gray-200 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#EAE3D5] text-[11px] font-bold text-[#786F68] group-hover:text-[#C85A32] transition-colors">
                <span>Executive & Leadership</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 3. Minimalist Tech */}
            <div
              onClick={() => setSelectedDemoTemplate('minimalist_tech')}
              className={`bg-[#FAF6F0] p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-5 group ${
                selectedDemoTemplate === 'minimalist_tech'
                  ? 'border-[#C85A32] shadow-lg ring-2 ring-[#C85A32]/25 bg-white'
                  : 'border-[#EAE3D5] hover:border-[#C85A32]/50 hover:bg-white hover:shadow-md'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#C85A32] uppercase tracking-wider">Minimalist Tech</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                    95% ATS
                  </span>
                </div>
                <p className="text-xs text-[#786F68] leading-relaxed">
                  Compact monospace header, clean section dividers, ideal for software engineers & devs.
                </p>
              </div>

              {/* Graphical Mini Preview Sheet */}
              <div className="h-40 bg-white border border-gray-900 rounded-2xl p-3 flex flex-col gap-2 overflow-hidden shadow-2xs group-hover:shadow-xs transition-all font-mono">
                <div className="border-b border-black pb-1 flex justify-between items-center">
                  <span className="text-[10px] font-black text-black">// JOHN_SNOW</span>
                  <span className="text-[7px] text-gray-500">[DEV_MODE]</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-bold text-black">&gt; EXPERIENCE</span>
                  <div className="w-full h-1 bg-gray-300 rounded" />
                  <div className="w-5/6 h-1 bg-gray-300 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#EAE3D5] text-[11px] font-bold text-[#786F68] group-hover:text-[#C85A32] transition-colors">
                <span>Devs & Systems Engineers</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 4. Editorial Two-Column */}
            <div
              onClick={() => setSelectedDemoTemplate('editorial_two_col')}
              className={`bg-[#FAF6F0] p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-5 group ${
                selectedDemoTemplate === 'editorial_two_col'
                  ? 'border-[#C85A32] shadow-lg ring-2 ring-[#C85A32]/25 bg-white'
                  : 'border-[#EAE3D5] hover:border-[#C85A32]/50 hover:bg-white hover:shadow-md'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#C85A32] uppercase tracking-wider">Editorial Two-Column</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                    94% ATS
                  </span>
                </div>
                <p className="text-xs text-[#786F68] leading-relaxed">
                  Left sidebar for skills & contact info, main column for work experience & projects.
                </p>
              </div>

              {/* Graphical Mini Preview Sheet */}
              <div className="h-40 bg-white border border-[#EAE3D5] rounded-2xl p-2 grid grid-cols-12 gap-1.5 overflow-hidden shadow-2xs group-hover:shadow-xs transition-all">
                <div className="col-span-4 bg-[#FAF6F0] h-full rounded-xl p-1.5 flex flex-col gap-1">
                  <div className="w-full h-1.5 bg-[#C85A32] rounded" />
                  <div className="w-full h-1 bg-gray-300 rounded" />
                  <div className="w-3/4 h-1 bg-gray-300 rounded" />
                </div>
                <div className="col-span-8 h-full flex flex-col gap-1 p-1">
                  <div className="w-2/3 h-1.5 bg-gray-900 rounded" />
                  <div className="w-full h-1 bg-gray-200 rounded" />
                  <div className="w-4/5 h-1 bg-gray-200 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#EAE3D5] text-[11px] font-bold text-[#786F68] group-hover:text-[#C85A32] transition-colors">
                <span>Product & Design Leads</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Dynamic Interactive Template Preview Canvas */}
          <div className="bg-[#FAF6F0] border border-[#EAE3D5] rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs">
            <div className="flex flex-col gap-4 max-w-xl text-left">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#FDF4F0] border border-[#F6DCD1] text-[#C85A32] text-xs font-extrabold rounded-full">
                  Selected Active Preview
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  100% ATS Verified
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#231F1D]">
                {selectedDemoTemplate === 'classic_ats' && 'Classic ATS Standard'}
                {selectedDemoTemplate === 'modern_executive' && 'Modern Executive Accent'}
                {selectedDemoTemplate === 'minimalist_tech' && 'Minimalist Tech Monospace'}
                {selectedDemoTemplate === 'editorial_two_col' && 'Editorial Two-Column'}
              </h3>

              <p className="text-xs sm:text-sm text-[#786F68] leading-relaxed">
                {selectedDemoTemplate === 'classic_ats' &&
                  'Single-column serif design optimized for Fortune 500 ATS parsers (Taleo, Workday, iCIMS). Maximizes text extraction precision.'}
                {selectedDemoTemplate === 'modern_executive' &&
                  'Features a subtle left terracotta accent border, clean sans-serif typography, and structured section dividers for tech leaders.'}
                {selectedDemoTemplate === 'minimalist_tech' &&
                  'Compact monospace headers, clean code-style section breaks, perfect for Software Engineers, Systems Architects & DevOps.'}
                {selectedDemoTemplate === 'editorial_two_col' &&
                  'Structured two-column layout placing contact details & skill chips in the left sidebar with extensive work history in the main column.'}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <Link href="/builder/demo-resume-alex-1">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Use This Template in Builder
                  </Button>
                </Link>
              </div>
            </div>

            {/* Rendered Live Sample Card */}
            <div className="w-full lg:w-96 bg-white border border-[#EAE3D5] rounded-2xl p-6 shadow-md flex flex-col gap-3 text-left">
              <div className="border-b border-gray-100 pb-3 flex flex-col gap-0.5">
                <span className="text-base font-extrabold text-[#231F1D]">John Snow</span>
                <span className="text-xs text-[#C85A32] font-semibold">Senior Full-Stack & AI Engineer</span>
                <span className="text-[10px] text-gray-500">San Francisco, CA • john.snow@demo.com</span>
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <span className="text-[10px] uppercase font-bold text-[#786F68]">Senior AI Engineer — Aether Cloud Tech</span>
                <span className="text-[11px] text-gray-600">Architected PgVector RAG query pipeline handling 150k daily requests at 180ms p95 latency.</span>
              </div>
            </div>
          </div>

          {/* YC-Level Interactive Candidate Intelligence & ATS Matrix */}
          <div className="rounded-3xl border border-[#EAE3D5] bg-gradient-to-br from-[#FAF6F0] via-white to-[#FDF4F0] p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE3D5] pb-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-[#C85A32] tracking-wider">
                    Candidate Intelligence Matrix
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800 bg-emerald-100 rounded-full border border-emerald-300">
                    Live Specification
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#231F1D]">
                  Engineered for Every High-Growth Industry Role
                </h3>
              </div>
              <Link href="/builder/demo-resume-alex-1">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Launch 3-Zone Builder Workspace
                </Button>
              </Link>
            </div>

            {/* Spec Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Engineering */}
              <div className="bg-white p-5 rounded-2xl border border-[#EAE3D5] flex flex-col justify-between gap-4 shadow-2xs hover:border-[#C85A32] transition-all">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#231F1D] flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#C85A32]" /> Software & AI Engineering
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      98% ATS Score
                    </span>
                  </div>
                  <p className="text-xs text-[#786F68] leading-relaxed">
                    Optimized for PgVector embeddings, GitHub repo claim verification, and quantified impact metrics.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-[#231F1D] font-medium pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#786F68]">Primary Layout:</span>
                    <span className="font-bold text-[#C85A32]">Minimalist Tech</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#786F68]">Parser Target:</span>
                    <span className="font-bold">Greenhouse / Workday</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Executive */}
              <div className="bg-white p-5 rounded-2xl border border-[#EAE3D5] flex flex-col justify-between gap-4 shadow-2xs hover:border-[#C85A32] transition-all">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#231F1D] flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-[#C85A32]" /> Executive & Leadership
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      96% ATS Score
                    </span>
                  </div>
                  <p className="text-xs text-[#786F68] leading-relaxed">
                    Structured for team leadership scale, P&L management, revenue growth, and executive summaries.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-[#231F1D] font-medium pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#786F68]">Primary Layout:</span>
                    <span className="font-bold text-[#C85A32]">Modern Executive</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#786F68]">Parser Target:</span>
                    <span className="font-bold">Fortune 500 ATS</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Product & Design */}
              <div className="bg-white p-5 rounded-2xl border border-[#EAE3D5] flex flex-col justify-between gap-4 shadow-2xs hover:border-[#C85A32] transition-all">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#231F1D] flex items-center gap-1.5">
                      <Layout className="w-4 h-4 text-[#C85A32]" /> Product, Design & Growth
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      94% ATS Score
                    </span>
                  </div>
                  <p className="text-xs text-[#786F68] leading-relaxed">
                    Side-by-side skill matrix layout, portfolio link integration, and voice career intake support.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-[#231F1D] font-medium pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#786F68]">Primary Layout:</span>
                    <span className="font-bold text-[#C85A32]">Editorial Two-Column</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#786F68]">Parser Target:</span>
                    <span className="font-bold">Lever / Ashby</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 px-6 lg:px-12 w-full relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <Badge variant="terracotta" size="sm">Architecture & Capabilities</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#231F1D] tracking-tight">
            Core Resume Baseline + Living Agentic Intelligence
          </h2>
          <p className="text-base text-[#786F68]">
            Every feature is built on top of a single canonical data model, transforming static resumes into verified candidate graphs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          <div className="bg-white p-7 rounded-3xl border border-[#EAE3D5] shadow-xs flex flex-col gap-4 hover:border-[#D8CFC4] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF4F0] text-[#C85A32] flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#231F1D]">Full-Viewport 3-Zone Builder</h3>
            <p className="text-sm text-[#786F68] leading-relaxed">
              Drag-and-drop reordering, section management, template switching, and a debounced real-time A4 printable preview.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#EAE3D5] shadow-xs flex flex-col gap-4 hover:border-[#D8CFC4] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#231F1D]">ATS Analyzer & Grammar Fix</h3>
            <p className="text-sm text-[#786F68] leading-relaxed">
              Instant ATS scoring, formatting warnings, missing section checklists, and inline one-click grammar improvement suggestions.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#EAE3D5] shadow-xs flex flex-col gap-4 hover:border-[#D8CFC4] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF4F0] text-[#C85A32] flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#231F1D]">Job Description Matcher</h3>
            <p className="text-sm text-[#786F68] leading-relaxed">
              Parse any job posting, extract key skills & keywords, compare against candidate experience, and receive actionable gap reports.
            </p>
          </div>

          <div id="living-agent" className="bg-white p-7 rounded-3xl border border-[#F6DCD1] shadow-xs flex flex-col gap-4 hover:border-[#C85A32]/40 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#C85A32] text-white flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#231F1D]">Living Resume Agent (Flagship)</h3>
            <p className="text-sm text-[#786F68] leading-relaxed">
              RAG-grounded conversational agent that answers free-form recruiter follow-up questions with explicit source citations. Zero hallucination.
            </p>
          </div>

          <div id="trust-score" className="bg-white p-7 rounded-3xl border border-[#EAE3D5] shadow-xs flex flex-col gap-4 hover:border-[#D8CFC4] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#231F1D]">Claim Verification & Trust Score</h3>
            <p className="text-sm text-[#786F68] leading-relaxed">
              Per-claim verification badges (Verified, Unverifiable), timeline sanity checks, and claim specificity scoring backed by public evidence.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#EAE3D5] shadow-xs flex flex-col gap-4 hover:border-[#D8CFC4] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#231F1D]">Opportunities & Auto-Tailor</h3>
            <p className="text-sm text-[#786F68] leading-relaxed">
              Score resumes against real postings, generate tailored application snapshots, and review modifications with an interactive side-by-side diff view.
            </p>
          </div>
        </div>
      </section>

      {/* NEW SECTION 1: ATS Multi-Parser Verification Matrix */}
      <section id="ats-matrix" className="py-24 px-6 lg:px-12 w-full relative z-10 border-t border-[#EAE3D5] bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
            <Badge variant="success" size="sm">Enterprise Parser Benchmark</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#231F1D] tracking-tight">
              Why 70% of Resumes Fail ATS — And How Callback AI Solves It
            </h2>
            <p className="text-base text-[#786F68] leading-relaxed">
              Standard PDF creators and visual builders break semantic parser trees. Callback AI generates clean, multi-layered canonical schemas engineered to extract with 98%+ precision across every major ATS.
            </p>
          </div>

          {/* 4-Column Parser Benchmark Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#EAE3D5] shadow-xs flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#231F1D] uppercase">Workday Enterprise</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 bg-emerald-100 rounded-full">
                    98.6% Pass
                  </span>
                </div>
                <p className="text-xs text-[#786F68] leading-relaxed">
                  Flawless hierarchical XML tree extraction with zero table-dropping or merged chronological lines.
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 0% Parse Distortion
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#EAE3D5] shadow-xs flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#231F1D] uppercase">Greenhouse JSON-LD</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 bg-emerald-100 rounded-full">
                    99.2% Pass
                  </span>
                </div>
                <p className="text-xs text-[#786F68] leading-relaxed">
                  Maps directly into candidate database fields with automated skill tokenization and entity matching.
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Direct Field Ingestion
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#EAE3D5] shadow-xs flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#231F1D] uppercase">Taleo Corporate</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 bg-emerald-100 rounded-full">
                    97.8% Pass
                  </span>
                </div>
                <p className="text-xs text-[#786F68] leading-relaxed">
                  Strict single-column text stream optimization guaranteeing zero multi-column overlap bugs.
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Clean Chronology
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#EAE3D5] shadow-xs flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#231F1D] uppercase">Ashby & Lever</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 bg-emerald-100 rounded-full">
                    99.5% Pass
                  </span>
                </div>
                <p className="text-xs text-[#786F68] leading-relaxed">
                  Semantic vector embeddings aligned for modern startup recruiting Boolean search queries.
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> High-Relevance Rank
              </div>
            </div>
          </div>

          {/* Side-by-Side Breakdown Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white border border-[#EAE3D5] rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-red-50 border border-red-200 text-red-700 text-xs font-extrabold rounded-full">
                  ❌ Traditional PDF / Visual Resume
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#231F1D]">42% Extraction Failure Rate</h3>
              <ul className="space-y-3 text-xs text-[#786F68] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span> Two-column layouts get mangled into unreadable horizontal word soup.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span> Contact links and phone numbers disappear into unstructured footers.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span> Recruiters cannot verify claimed impact metrics without lengthy back-and-forth emails.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-[#EAE3D5] pt-6 lg:pt-0 lg:pl-8">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold rounded-full">
                  ✔ Callback AI Canonical System
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#231F1D]">100% Guaranteed Structural Fidelity</h3>
              <ul className="space-y-3 text-xs text-[#231F1D] leading-relaxed font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Canonical structured JSON & Markdown model renders pixel-perfect PDF and machine-readable data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Cryptographic GitHub commit & degree verification embeds authentic proof badges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Empowers recruiters to interrogate your verified Living Candidate Agent 24/7.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 2: Wall of Proof & Verified Recruiter Endorsements */}
      <section id="wall-of-proof" className="py-24 px-6 lg:px-12 w-full relative z-10 border-t border-[#EAE3D5] bg-[#FAF6F0]/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
            <Badge variant="terracotta" size="sm">Hiring Leader Validation</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#231F1D] tracking-tight">
              Trusted by Candidates & Top Tier Hiring Teams
            </h2>
            <p className="text-base text-[#786F68]">
              High-growth startup founders, tech recruiters, and elite candidates share how Callback AI accelerated their hiring velocity.
            </p>
          </div>

          {/* Metric Highlights Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-[#EAE3D5] rounded-3xl p-6 shadow-xs">
            <div className="flex flex-col items-center justify-center text-center p-3">
              <span className="text-3xl sm:text-4xl font-black text-[#C85A32]">4.2x</span>
              <span className="text-xs font-bold text-[#786F68] mt-1 uppercase tracking-wide">Callback Rate</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-3 border-l border-[#EAE3D5]">
              <span className="text-3xl sm:text-4xl font-black text-emerald-700">180ms</span>
              <span className="text-xs font-bold text-[#786F68] mt-1 uppercase tracking-wide">p95 RAG Latency</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-3 border-l border-[#EAE3D5]">
              <span className="text-3xl sm:text-4xl font-black text-[#231F1D]">98.4%</span>
              <span className="text-xs font-bold text-[#786F68] mt-1 uppercase tracking-wide">ATS Pass Rate</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-3 border-l border-[#EAE3D5]">
              <span className="text-3xl sm:text-4xl font-black text-purple-700">100%</span>
              <span className="text-xs font-bold text-[#786F68] mt-1 uppercase tracking-wide">Zero Hallucination</span>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-3xl border border-[#EAE3D5] shadow-xs flex flex-col justify-between gap-6 hover:shadow-md transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#231F1D] leading-relaxed font-medium">
                  "Callback AI fundamentally transformed technical candidate screening for our team. Instead of guessing if bullet points were inflated, our hiring managers questioned the living candidate agent and got instant GitHub citations."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#FDF4F0] text-[#C85A32] font-black flex items-center justify-center text-sm border border-[#F6DCD1]">
                  SC
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-[#231F1D]">Sarah Chen</span>
                  <span className="text-[10px] text-[#786F68]">Head of Technical Talent • Stripe Ecosystem</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-[#EAE3D5] shadow-xs flex flex-col justify-between gap-6 hover:shadow-md transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#231F1D] leading-relaxed font-medium">
                  "The clean Markdown & JSON-LD schema exports straight into Greenhouse without manual re-formatting. It is the gold standard for developer resumes. No dropped sections, no font errors."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 font-black flex items-center justify-center text-sm border border-emerald-200">
                  MV
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-[#231F1D]">Marcus Vance</span>
                  <span className="text-[10px] text-[#786F68]">VP of Engineering • Vercel Partner Network</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-[#EAE3D5] shadow-xs flex flex-col justify-between gap-6 hover:shadow-md transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#231F1D] leading-relaxed font-medium">
                  "I switched my resume to Callback AI Minimalist Tech and received 4 Tier-1 interview requests within 48 hours. The recruiter told me the interactive candidate agent was the clincher."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-700 font-black flex items-center justify-center text-sm border border-purple-200">
                  ER
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-[#231F1D]">Elena Rostova</span>
                  <span className="text-[10px] text-[#786F68]">Founding AI Engineer • YC W24 Startup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 3: FAQ & Grand Finale High-Conversion CTA Banner */}
      <section id="faq" className="py-24 px-6 lg:px-12 w-full relative z-10 border-t border-[#EAE3D5] bg-[#FAF6F0]">
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          <div className="text-center flex flex-col items-center gap-3">
            <Badge variant="terracotta" size="sm">Frequently Asked Questions</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#231F1D] tracking-tight">
              Everything You Need to Know
            </h2>
            <p className="text-base text-[#786F68]">
              Frequently asked questions about Callback AI's living candidate agents, ATS compatibility, and verification.
            </p>
          </div>

          {/* Interactive Accordion */}
          <div className="flex flex-col gap-4">
            {[
              {
                q: "How does Callback AI guarantee zero hallucination in the Living Candidate Agent?",
                a: "Our conversational agent uses a strictly grounded PgVector retrieval-augmented generation (RAG) pipeline. It only answers questions using factual data extracted from your canonical resume sections, verified repositories, and certificates. If a recruiter asks something not in your records, the agent explicitly clarifies that the information is unverified rather than guessing.",
              },
              {
                q: "Will my generated resume pass strict corporate ATS parsers (Workday, Taleo, Greenhouse)?",
                a: "Yes, 100%. Every one of our 40+ design templates is pre-tested and validated against real ATS ingestion pipelines. We ensure single-column semantic flow, compliant UTF-8 typography, and structured section tags so parsers never scramble your job titles or dates.",
              },
              {
                q: "How does automated GitHub and credential verification work?",
                a: "Callback AI analyzes public repository URLs, commit frequencies, release tags, and degree registrar records. When a claim matches verifiable evidence, a cryptographic 'Verified Match' badge is attached to the resume entry and candidate agent output.",
              },
              {
                q: "Can I export my resume to PDF, Word, and JSON-LD simultaneously?",
                a: "Yes. From the 3-Zone Builder Workspace, you can export your resume to a pixel-perfect, printable A4 PDF, a clean Word document (.docx), or a machine-readable JSON-LD candidate file with a single click.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EAE3D5] rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-[#231F1D] hover:text-[#C85A32] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#786F68] transition-transform duration-200 shrink-0 ml-4 ${
                      openFaqIdx === idx ? 'rotate-180 text-[#C85A32]' : ''
                    }`}
                  />
                </button>
                {openFaqIdx === idx && (
                  <div className="px-5 pb-5 text-xs text-[#786F68] leading-relaxed border-t border-gray-100 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Grand Finale High-Conversion CTA Banner */}
          <div className="bg-gradient-to-br from-[#1C1917] via-[#231F1D] to-[#12100E] text-white p-8 sm:p-14 rounded-3xl border border-[#C85A32]/40 shadow-2xl flex flex-col items-center text-center gap-6 relative overflow-hidden ring-1 ring-[#C85A32]/20">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C85A32]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#C85A32]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/15 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              YC-Level Candidate Intelligence Platform
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-2xl leading-tight">
              Turn Your Resume Into a Living Agent Today.
            </h2>

            <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
              Create an ATS-proof resume across 40+ modern designs, verify your accomplishments, and let your candidate agent handle recruiter screening around the clock.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full justify-center">
              <Link href="/builder/demo-resume-alex-1" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-8 bg-[#C85A32] hover:bg-[#B24D28] text-white border-0 shadow-lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Launch 3-Zone Builder Workspace
                </Button>
              </Link>
              <Link href="/agent/demo-resume-alex-1" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Try Recruiter Q&A Agent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-[#FAF6F0] border-t border-[#EAE3D5] py-12 px-6 lg:px-12 relative z-10 w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#786F68]">
          <div className="flex items-center gap-3">
            <Logo size="sm" showTagline={false} />
            <span>© 2026 Callback AI. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <Link href="/dashboard" className="hover:text-[#C85A32]">Dashboard</Link>
            <Link href="/builder/demo-resume-alex-1" className="hover:text-[#C85A32]">Builder Workspace</Link>
            <Link href="/agent/demo-resume-alex-1" className="hover:text-[#C85A32]">Living Agent</Link>
            <Link href="/recruiter-dashboard" className="hover:text-[#C85A32]">Recruiter Surface</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
