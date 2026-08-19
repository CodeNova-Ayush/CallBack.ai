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
  const [templateCarouselIdx, setTemplateCarouselIdx] = useState(0);

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

  // Smooth 3.5-Second Auto-cycling timer for 3D template revolving carousel
  useEffect(() => {
    if (!isAutoCycling) return;

    const interval = setInterval(() => {
      setHeroPromptIdx((prev) => (prev + 1) % 4);
    }, 3500);

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
    <div className="min-h-screen bg-[#F5F9FB] text-slate-900 flex flex-col font-sans relative overflow-x-hidden selection:bg-[#E6F5F8] selection:text-[#048BA2]">
      {/* Ambient Multi-Color Gradient Mesh Glow using user palette */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-r from-[#008CA0]/15 via-[#2E75C4]/20 to-[#5039F6]/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40 -z-10" />

      {/* Top Navbar — Edge to Edge */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80">
        <div className="w-full px-6 lg:px-12 h-20 flex items-center justify-between">
          <Logo size="md" showTagline />

          {/* Pill Navigation Bar */}
          <nav className="hidden md:flex items-center gap-2">
            <a href="#templates" className="px-4 py-2 bg-white/90 border border-slate-200 text-slate-800 text-xs font-bold rounded-full shadow-2xs hover:border-[#048BA2] hover:text-[#048BA2] transition-all">
              Templates
            </a>
            <a href="#features" className="px-4 py-2 bg-white/90 border border-slate-200 text-slate-800 text-xs font-bold rounded-full shadow-2xs hover:border-[#048BA2] hover:text-[#048BA2] transition-all">
              Features
            </a>
            <a href="#ats-matrix" className="px-4 py-2 bg-white/90 border border-slate-200 text-slate-800 text-xs font-bold rounded-full shadow-2xs hover:border-[#048BA2] hover:text-[#048BA2] transition-all">
              ATS Multi-Parser
            </a>
            <a href="#wall-of-proof" className="px-4 py-2 bg-white/90 border border-slate-200 text-slate-800 text-xs font-bold rounded-full shadow-2xs hover:border-[#048BA2] hover:text-[#048BA2] transition-all">
              Wall of Proof
            </a>
            <a href="#faq" className="px-4 py-2 bg-white/90 border border-slate-200 text-slate-800 text-xs font-bold rounded-full shadow-2xs hover:border-[#048BA2] hover:text-[#048BA2] transition-all">
              FAQ
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-xs font-bold text-slate-700 hover:text-[#048BA2] transition-colors">
              Sign In
            </Link>
            <Link href="/sign-in">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 border border-[#048BA2]/30 rounded-full shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#048BA2] animate-pulse" />
              <span className="text-xs font-bold text-slate-800">Next-Gen AI Resume Builder & Candidate Agent</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1]">
              Your Resume is No Longer a Static PDF.{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#008CA0] via-[#2E75C4] to-[#5039F6]">
                It's an Autonomous Candidate Agent.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Create ATS-optimized resumes from multiple professional template designs, verify experience claims, and empower recruiters to converse directly with your candidate agent.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 w-full py-3 border-y border-slate-200/80 my-2">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900">40+ Templates</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase">ATS Library</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">94%</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase">ATS Pass Rate</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900">100%</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase">Grounded Q&A</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
              <Link href="/sign-in">
                <Button size="lg" className="w-full sm:w-auto px-8 shadow-md" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Launch App
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                  Open 3-Zone Builder
                </Button>
              </Link>
            </div>
          </div>
                 {/* Right Column: Enhancv-Style Revolving 3D Template Showcase */}
          <div className="lg:col-span-6 w-full flex flex-col items-center justify-center relative">
            {/* Ambient Multi-Color Gradient Backdrop Glow */}
            <div className="absolute w-96 h-96 bg-gradient-to-tr from-teal-400/20 via-sky-400/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none -top-10 -right-10" />

            {/* Main 3D Carousel Stage */}
            <div className="w-full relative z-10 flex flex-col items-center gap-4">
              {/* Carousel Navigation Pill Header */}
              <div className="w-full bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-2 shadow-sm flex items-center justify-between gap-2">
                {/* Template Mode Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none">
                  {[
                    { id: 0, label: 'Executive Leader', icon: Award },
                    { id: 1, label: 'Agile & Tech', icon: Code },
                    { id: 2, label: 'ATS Tailored', icon: FileText },
                    { id: 3, label: 'Product & Design', icon: Sparkles },
                    { id: 4, label: 'Living AI Agent', icon: Bot },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setHeroPromptIdx(tab.id);
                        setIsAutoCycling(false);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        heroPromptIdx === tab.id
                          ? 'bg-[#048BA2] text-white shadow-md shadow-[#048BA2]/25'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Play/Pause Auto-rotate */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setIsAutoCycling(!isAutoCycling)}
                    className="p-1.5 text-slate-500 hover:text-[#048BA2] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title={isAutoCycling ? 'Pause rotation' : 'Auto-rotate'}
                  >
                    {isAutoCycling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#048BA2]" />}
                  </button>
                </div>
              </div>

              {/* 3D Template Canvas Viewport */}
              <div className="w-full h-[460px] md:h-[480px] relative flex items-center justify-center select-none overflow-visible">
                <AnimatePresence mode="wait">
                  {/* SLIDE 0: Template 1 (Ethan Smith - Chief Experience Officer) */}
                  {heroPromptIdx === 0 && (
                    <motion.div
                      key="tpl-0"
                      initial={{ opacity: 0, scale: 0.94, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="relative w-full max-w-[330px] sm:max-w-[370px] flex items-center justify-center rounded-3xl overflow-hidden drop-shadow-2xl"
                    >
                      <img
                        src="/images/templates/tpl-1.png"
                        alt="Executive Leader Resume Template"
                        className="w-full h-auto max-h-[460px] object-contain rounded-3xl"
                      />
                    </motion.div>
                  )}

                  {/* SLIDE 1: Template 2 (Emma Smith - Agile & Tech Architect) */}
                  {heroPromptIdx === 1 && (
                    <motion.div
                      key="tpl-1"
                      initial={{ opacity: 0, scale: 0.94, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="relative w-full max-w-[330px] sm:max-w-[370px] flex items-center justify-center rounded-3xl overflow-hidden drop-shadow-2xl"
                    >
                      <img
                        src="/images/templates/tpl-2.png"
                        alt="Agile Tech Resume Template"
                        className="w-full h-auto max-h-[460px] object-contain rounded-3xl"
                      />
                    </motion.div>
                  )}

                  {/* SLIDE 2: Template 3 (ATS Tailored Software Engineer) */}
                  {heroPromptIdx === 2 && (
                    <motion.div
                      key="tpl-2"
                      initial={{ opacity: 0, scale: 0.94, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="relative w-full max-w-[330px] sm:max-w-[370px] flex items-center justify-center rounded-3xl overflow-hidden drop-shadow-2xl"
                    >
                      <img
                        src="/images/templates/tpl-3.png"
                        alt="ATS Tailored Software Engineer Resume"
                        className="w-full h-auto max-h-[460px] object-contain rounded-3xl"
                      />
                    </motion.div>
                  )}

                  {/* SLIDE 3: Template 4 (Erin Schaefer - Product & Project Leader) */}
                  {heroPromptIdx === 3 && (
                    <motion.div
                      key="tpl-3"
                      initial={{ opacity: 0, scale: 0.94, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="relative w-full max-w-[330px] sm:max-w-[370px] flex items-center justify-center rounded-3xl overflow-hidden drop-shadow-2xl"
                    >
                      <img
                        src="/images/templates/tpl-4.png"
                        alt="Modern Product Manager Resume"
                        className="w-full h-auto max-h-[460px] object-contain rounded-3xl"
                      />
                    </motion.div>
                  )}

                  {/* SLIDE 4: Living Resume Agent Showcase Card */}
                  {heroPromptIdx === 4 && (
                    <motion.div
                      key="tpl-4"
                      initial={{ opacity: 0, scale: 0.94, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="relative w-full max-w-[350px] sm:max-w-[390px] h-[450px] bg-white rounded-3xl p-6 shadow-2xl border border-slate-200/80 flex flex-col justify-between"
                    >
                      <div className="flex flex-col gap-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-[#048BA2] text-white flex items-center justify-center font-black text-lg shadow-md shadow-[#048BA2]/25">
                            <Bot className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-black text-sm text-slate-900">Living Resume Agent</h4>
                            <span className="text-[10px] font-bold text-[#048BA2] bg-[#E6F5F8] px-2 py-0.5 rounded-full border border-[#048BA2]/30 inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-[#048BA2]" /> 100% Grounded Candidate Twin
                            </span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-0.5 text-left">
                          <span className="text-[9.5px] font-bold uppercase text-[#048BA2] tracking-wider">Recruiter Live Query:</span>
                          <p className="text-xs font-bold text-slate-800 leading-snug">
                            "What is your experience with latency benchmarks & high-throughput system architecture?"
                          </p>
                        </div>

                        <div className="p-3.5 bg-[#E6F5F8]/50 rounded-2xl border border-[#048BA2]/20 text-left flex flex-col gap-1 shadow-2xs">
                          <span className="text-[9.5px] font-extrabold uppercase text-[#048BA2] tracking-wider">Agent Response:</span>
                          <p className="text-xs text-slate-800 leading-relaxed font-medium">
                            "Architected distributed query pipelines and multi-agent systems with sub-140ms p95 latency handling 250k+ daily active requests."
                          </p>
                          <span className="text-[9.5px] text-[#048BA2] font-extrabold mt-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#048BA2]" /> Grounded in Verified Production Benchmarks
                          </span>
                        </div>
                      </div>

                      <Link href="/sign-in" className="w-full">
                        <Button variant="primary" size="md" className="w-full font-bold rounded-xl py-2.5 shadow-md shadow-[#048BA2]/25">
                          Converse with Living Agent →
                        </Button>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Centered Bottom Carousel Controls */}
              <div className="flex items-center justify-center gap-4 w-full pt-2">
                <button
                  onClick={() => {
                    setHeroPromptIdx((prev) => (prev === 0 ? 4 : prev - 1));
                    setIsAutoCycling(false);
                  }}
                  className="p-2 rounded-full bg-white border border-slate-200 hover:border-[#048BA2] text-slate-600 hover:text-[#048BA2] shadow-xs transition-colors cursor-pointer"
                  title="Previous template"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>

                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setHeroPromptIdx(idx);
                        setIsAutoCycling(false);
                      }}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        heroPromptIdx === idx ? 'w-8 bg-gradient-to-r from-indigo-600 to-teal-500 shadow-xs' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    setHeroPromptIdx((prev) => (prev === 4 ? 0 : prev + 1));
                    setIsAutoCycling(false);
                  }}
                  className="p-2 rounded-full bg-white border border-slate-200 hover:border-[#048BA2] text-slate-600 hover:text-[#048BA2] shadow-xs transition-colors cursor-pointer"
                  title="Next template"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhancv-Style Real Resume Templates Gallery Showcase Section with Continuous Motion */}
      <section id="templates" className="py-20 bg-slate-50 border-y border-slate-200/80 relative z-10 w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10 px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
            <Badge variant="aurora" size="sm">
              <Layout className="w-3.5 h-3.5" /> 16+ Production Resume Templates in Motion
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-[#231F1D] tracking-tight">
              Pick Your Template & Stand Out
            </h2>
            <p className="text-sm md:text-base text-[#786F68] leading-relaxed">
              Every template is ATS-tested, compliant with Workday & Greenhouse parsers, and formatted for single-page A4 export. Hover anytime to pause and explore.
            </p>
          </div>

          {/* Continuous Infinite Auto-Motion Marquee Tape */}
          <div className="w-full relative overflow-hidden py-4 group">
            {/* Left & Right Ambient Fades for Depth */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#F1F5F9] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#FAF6F0] to-transparent z-10 pointer-events-none" />

            {/* Seamless Infinite Marquee Track (16 Unique Templates x 2 for Perfect Loop) */}
            <div className="animate-marquee-infinite flex items-center gap-6 sm:gap-8">
              {[
                { id: 't1', img: '/images/templates/enhancv-extra-1.png', title: 'Scarlett Anderson', role: 'CPA & Financial Auditing' },
                { id: 't2', img: '/images/templates/enhancv-extra-2.png', title: 'Isaac Hall', role: 'Global Health Project Director' },
                { id: 't3', img: '/images/templates/enhancv-extra-3.png', title: 'Elise Carter', role: 'Senior Backend Engineer' },
                { id: 't4', img: '/images/templates/enhancv-extra-4.png', title: 'Carrie Jones', role: 'Product Strategy & Innovation' },
                { id: 't5', img: '/images/templates/enhancv-extra-5.png', title: 'Maeve Delaney', role: 'Strategic Sourcing Leader' },
                { id: 't6', img: '/images/templates/enhancv-extra-6.png', title: 'Ellen Johnson', role: 'Digital Marketing Manager' },
                { id: 't7', img: '/images/templates/enhancv-extra-7.png', title: 'Grace Jackson', role: 'Data Scientist & ML' },
                { id: 't8', img: '/images/templates/enhancv-extra-8.png', title: 'Austin Adams', role: 'Business Development Manager' },
                { id: 't9', img: '/images/templates/enhancv-extra-9.png', title: 'David Miller', role: 'Staff ML Engineer' },
                { id: 't10', img: '/images/templates/enhancv-extra-10.png', title: 'Elena Rostova', role: 'VP of Marketing' },
                { id: 't11', img: '/images/templates/enhancv-extra-11.png', title: 'Marcus Vance', role: 'Cloud Infrastructure Architect' },
                { id: 't12', img: '/images/templates/enhancv-extra-12.png', title: 'Sophia Chen', role: 'Biotech Operations Director' },
                { id: 't13', img: '/images/templates/enhancv-extra-13.png', title: 'Liam O’Connor', role: 'Cybersecurity Analyst' },
                { id: 't14', img: '/images/templates/enhancv-extra-14.png', title: 'Rachel Green', role: 'Head of Product Design & UX' },
                { id: 't15', img: '/images/templates/enhancv-extra-15.png', title: 'Alexander Wright', role: 'Principal Quantitative Researcher' },
                { id: 't16', img: '/images/templates/enhancv-extra-16.png', title: 'Claire Dupont', role: 'International Corporate Counsel' },
                // Loop duplicate to make seamless 360 loop
                { id: 't1-dup', img: '/images/templates/enhancv-extra-1.png', title: 'Scarlett Anderson', role: 'CPA & Financial Auditing' },
                { id: 't2-dup', img: '/images/templates/enhancv-extra-2.png', title: 'Isaac Hall', role: 'Global Health Project Director' },
                { id: 't3-dup', img: '/images/templates/enhancv-extra-3.png', title: 'Elise Carter', role: 'Senior Backend Engineer' },
                { id: 't4-dup', img: '/images/templates/enhancv-extra-4.png', title: 'Carrie Jones', role: 'Product Strategy & Innovation' },
                { id: 't5-dup', img: '/images/templates/enhancv-extra-5.png', title: 'Maeve Delaney', role: 'Strategic Sourcing Leader' },
                { id: 't6-dup', img: '/images/templates/enhancv-extra-6.png', title: 'Ellen Johnson', role: 'Digital Marketing Manager' },
                { id: 't7-dup', img: '/images/templates/enhancv-extra-7.png', title: 'Grace Jackson', role: 'Data Scientist & ML' },
                { id: 't8-dup', img: '/images/templates/enhancv-extra-8.png', title: 'Austin Adams', role: 'Business Development Manager' },
                { id: 't9-dup', img: '/images/templates/enhancv-extra-9.png', title: 'David Miller', role: 'Staff ML Engineer' },
                { id: 't10-dup', img: '/images/templates/enhancv-extra-10.png', title: 'Elena Rostova', role: 'VP of Marketing' },
                { id: 't11-dup', img: '/images/templates/enhancv-extra-11.png', title: 'Marcus Vance', role: 'Cloud Infrastructure Architect' },
                { id: 't12-dup', img: '/images/templates/enhancv-extra-12.png', title: 'Sophia Chen', role: 'Biotech Operations Director' },
                { id: 't13-dup', img: '/images/templates/enhancv-extra-13.png', title: 'Liam O’Connor', role: 'Cybersecurity Analyst' },
                { id: 't14-dup', img: '/images/templates/enhancv-extra-14.png', title: 'Rachel Green', role: 'Head of Product Design & UX' },
                { id: 't15-dup', img: '/images/templates/enhancv-extra-15.png', title: 'Alexander Wright', role: 'Principal Quantitative Researcher' },
                { id: 't16-dup', img: '/images/templates/enhancv-extra-16.png', title: 'Claire Dupont', role: 'International Corporate Counsel' },
              ].map((tpl) => (
                <Link
                  key={tpl.id}
                  href="/sign-in"
                  className="shrink-0 w-[230px] sm:w-[260px] md:w-[290px] h-[330px] sm:h-[370px] md:h-[410px] rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl border border-gray-200/90 transition-all duration-300 hover:scale-[1.04] group/card relative cursor-pointer block"
                >
                  <img
                    src={tpl.img}
                    alt={`${tpl.title} - ${tpl.role}`}
                    className="w-full h-full object-contain object-top p-1 bg-white"
                    loading="lazy"
                  />

                  {/* Hover Floating Action Card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col justify-end p-4 text-left">
                    <span className="text-white font-extrabold text-xs">{tpl.title}</span>
                    <span className="text-white/80 text-[10px] font-medium mb-3">{tpl.role}</span>
                    <span className="w-full py-2 bg-[#048BA2] hover:bg-[#037488] text-white text-[11px] font-black rounded-xl shadow-md text-center transition-all">
                      Customize This Template →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 3 Enhancv-Style Feature Pillars (Direct from Reference) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl pt-2 border-t border-slate-200">
            <div className="flex items-center gap-3 justify-center text-center md:text-left">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                ATS-friendly professionally designed templates
              </span>
            </div>

            <div className="flex items-center gap-3 justify-center text-center md:text-left">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                <Palette className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                Customizable sections, fonts, colors, and layouts
              </span>
            </div>

            <div className="flex items-center gap-3 justify-center text-center md:text-left">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                <Layout className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                Single-column, double-column, and modern layouts
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Interactive Template Preview Canvas */}
      <section id="preview" className="py-24 px-6 lg:px-12 w-full relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs">
            <div className="flex flex-col gap-4 max-w-xl text-left">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#E6F5F8] border border-[#048BA2]/30 text-[#048BA2] text-xs font-extrabold rounded-full">
                  Selected Active Preview
                </span>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  100% ATS Verified
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900">
                {selectedDemoTemplate === 'classic_ats' && 'Classic ATS Standard'}
                {selectedDemoTemplate === 'modern_executive' && 'Modern Executive Accent'}
                {selectedDemoTemplate === 'minimalist_tech' && 'Minimalist Tech Monospace'}
                {selectedDemoTemplate === 'editorial_two_col' && 'Editorial Two-Column'}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedDemoTemplate === 'classic_ats' &&
                  'Single-column serif design optimized for Fortune 500 ATS parsers (Taleo, Workday, iCIMS). Maximizes text extraction precision.'}
                {selectedDemoTemplate === 'modern_executive' &&
                  'Features a subtle left accent border, clean sans-serif typography, and structured section dividers for tech leaders.'}
                {selectedDemoTemplate === 'minimalist_tech' &&
                  'Compact monospace headers, clean code-style section breaks, perfect for Software Engineers, Systems Architects & DevOps.'}
                {selectedDemoTemplate === 'editorial_two_col' &&
                  'Structured two-column layout placing contact details & skill chips in the left sidebar with extensive work history in the main column.'}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <Link href="/sign-in">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Use This Template in Builder
                  </Button>
                </Link>
              </div>
            </div>

            {/* Rendered Live Sample Card */}
            <div className="w-full lg:w-96 bg-white border border-slate-200 rounded-2xl p-6 shadow-md flex flex-col gap-3 text-left">
              <div className="border-b border-slate-100 pb-3 flex flex-col gap-0.5">
                <span className="text-base font-extrabold text-slate-900">John Snow</span>
                <span className="text-xs text-[#048BA2] font-semibold">Senior Full-Stack & AI Engineer</span>
                <span className="text-[10px] text-slate-500">San Francisco, CA • john.snow@demo.com</span>
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-500">Senior AI Engineer — Aether Cloud Tech</span>
                <span className="text-[11px] text-slate-600">Architected PgVector RAG query pipeline handling 150k daily requests at 180ms p95 latency.</span>
              </div>
            </div>
          </div>

          {/* YC-Level Interactive Candidate Intelligence & ATS Matrix */}
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-[#048BA2] tracking-wider">
                    Candidate Intelligence Matrix
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold text-teal-800 bg-teal-100 rounded-full border border-teal-300">
                    Live Specification
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Engineered for Every High-Growth Industry Role
                </h3>
              </div>
              <Link href="/sign-in">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Launch 3-Zone Builder Workspace
                </Button>
              </Link>
            </div>

            {/* Spec Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Engineering */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between gap-4 shadow-2xs hover:border-[#048BA2] transition-all">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#048BA2]" /> Software & AI Engineering
                    </span>
                    <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                      98% ATS Score
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Optimized for PgVector embeddings, GitHub repo claim verification, and quantified impact metrics.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-slate-900 font-medium pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Primary Layout:</span>
                    <span className="font-bold text-[#048BA2]">Minimalist Tech</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Parser Target:</span>
                    <span className="font-bold">Greenhouse / Workday</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Executive */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between gap-4 shadow-2xs hover:border-[#048BA2] transition-all">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-[#048BA2]" /> Executive & Leadership
                    </span>
                    <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                      96% ATS Score
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Structured for team leadership scale, P&L management, revenue growth, and executive summaries.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-slate-900 font-medium pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Primary Layout:</span>
                    <span className="font-bold text-[#048BA2]">Modern Executive</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Parser Target:</span>
                    <span className="font-bold">Fortune 500 ATS</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Product & Design */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between gap-4 shadow-2xs hover:border-[#048BA2] transition-all">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      <Layout className="w-4 h-4 text-[#048BA2]" /> Product, Design & Growth
                    </span>
                    <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                      94% ATS Score
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Side-by-side skill matrix layout, portfolio link integration, and voice career intake support.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-slate-900 font-medium pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Primary Layout:</span>
                    <span className="font-bold text-[#048BA2]">Editorial Two-Column</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Parser Target:</span>
                    <span className="font-bold text-slate-900">Lever / Ashby</span>
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
          <Badge variant="aurora" size="sm">Architecture & Capabilities</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Core Resume Baseline + Living Agentic Intelligence
          </h2>
          <p className="text-base text-slate-600">
            Every feature is built on top of a single canonical data model, transforming static resumes into verified candidate graphs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col gap-4 hover:border-[#048BA2] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F5F8] text-[#048BA2] flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Full-Viewport 3-Zone Builder</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Drag-and-drop reordering, section management, template switching, and a debounced real-time A4 printable preview.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col gap-4 hover:border-[#048BA2] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">ATS Analyzer & Grammar Fix</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Instant ATS scoring, formatting warnings, missing section checklists, and inline one-click grammar improvement suggestions.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col gap-4 hover:border-[#048BA2] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Job Description Matcher</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Parse any job posting, extract key skills & keywords, compare against candidate experience, and receive actionable gap reports.
            </p>
          </div>

          <div id="living-agent" className="bg-white p-7 rounded-3xl border border-[#048BA2]/20 shadow-xs flex flex-col gap-4 hover:border-[#048BA2] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#048BA2] text-white flex items-center justify-center font-bold shadow-xs">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Living Resume Agent (Flagship)</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              RAG-grounded conversational agent that answers free-form recruiter follow-up questions with explicit source citations. Zero hallucination.
            </p>
          </div>

          <div id="trust-score" className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col gap-4 hover:border-[#048BA2] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Claim Verification & Trust Score</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Per-claim verification badges (Verified, Unverifiable), timeline sanity checks, and claim specificity scoring backed by public evidence.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col gap-4 hover:border-[#048BA2] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F5F8] text-[#048BA2] flex items-center justify-center font-bold">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Opportunities & Auto-Tailor</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Score resumes against real postings, generate tailored application snapshots, and review modifications with an interactive side-by-side diff view.
            </p>
          </div>
        </div>
      </section>

      {/* ATS Multi-Parser Verification Matrix */}
      <section id="ats-matrix" className="py-24 px-6 lg:px-12 w-full relative z-10 border-t border-slate-200/80 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
            <Badge variant="aurora" size="sm">Enterprise Parser Benchmark</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Why 70% of Resumes Fail ATS — And How Callback AI Solves It
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Standard PDF creators and visual builders break semantic parser trees. Callback AI generates clean, multi-layered canonical schemas engineered to extract with 98%+ precision across every major ATS.
            </p>
          </div>

          {/* 4-Column Parser Benchmark Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between gap-4 hover:border-[#048BA2] transition-all">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 uppercase">Workday Enterprise</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold text-teal-800 bg-teal-100 rounded-full">
                    98.6% Pass
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Flawless hierarchical XML tree extraction with zero table-dropping or merged chronological lines.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-teal-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> 0% Parse Distortion
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between gap-4 hover:border-[#048BA2] transition-all">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 uppercase">Greenhouse JSON-LD</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold text-teal-800 bg-teal-100 rounded-full">
                    99.2% Pass
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Maps directly into candidate database fields with automated skill tokenization and entity matching.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-teal-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Direct Field Ingestion
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between gap-4 hover:border-[#048BA2] transition-all">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 uppercase">Taleo Corporate</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold text-teal-800 bg-teal-100 rounded-full">
                    97.8% Pass
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Strict single-column text stream optimization guaranteeing zero multi-column overlap bugs.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-teal-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Clean Chronology
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between gap-4 hover:border-[#048BA2] transition-all">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 uppercase">Ashby & Lever</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold text-teal-800 bg-teal-100 rounded-full">
                    99.5% Pass
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Semantic vector embeddings aligned for modern startup recruiting Boolean search queries.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-teal-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> High-Relevance Rank
              </div>
            </div>
          </div>

          {/* Side-by-Side Breakdown Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-red-50 border border-red-200 text-red-700 text-xs font-extrabold rounded-full">
                  ❌ Traditional PDF / Visual Resume
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">42% Extraction Failure Rate</h3>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
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

            <div className="flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-6 lg:pt-0 lg:pl-8">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-extrabold rounded-full">
                  ✔ Callback AI Canonical System
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">100% Guaranteed Structural Fidelity</h3>
              <ul className="space-y-3 text-xs text-slate-900 leading-relaxed font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Canonical structured JSON & Markdown model renders pixel-perfect PDF and machine-readable data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Cryptographic GitHub commit & degree verification embeds authentic proof badges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Empowers recruiters to interrogate your verified Living Candidate Agent 24/7.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Wall of Proof */}
      <section id="wall-of-proof" className="py-24 px-6 lg:px-12 w-full relative z-10 border-t border-slate-200/80 bg-slate-50/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
            <Badge variant="aurora" size="sm">Hiring Leader Validation</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Trusted by Candidates & Top Tier Hiring Teams
            </h2>
            <p className="text-base text-slate-600">
              High-growth startup founders, tech recruiters, and elite candidates share how Callback AI accelerated their hiring velocity.
            </p>
          </div>

          {/* Metric Highlights Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
            <div className="flex flex-col items-center justify-center text-center p-3">
              <span className="text-3xl sm:text-4xl font-black text-[#048BA2]">4.2x</span>
              <span className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wide">Callback Rate</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-3 border-l border-slate-200/80">
              <span className="text-3xl sm:text-4xl font-black text-teal-600">180ms</span>
              <span className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wide">p95 RAG Latency</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-3 border-l border-slate-200/80">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">98.4%</span>
              <span className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wide">ATS Pass Rate</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-3 border-l border-slate-200/80">
              <span className="text-3xl sm:text-4xl font-black text-[#048BA2]">100%</span>
              <span className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wide">Zero Hallucination</span>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between gap-6 hover:shadow-md transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
                  "Callback AI fundamentally transformed technical candidate screening for our team. Instead of guessing if bullet points were inflated, our hiring managers questioned the living candidate agent and got instant GitHub citations."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#048BA2] text-white font-black flex items-center justify-center text-sm shadow-xs">
                  SC
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-slate-900">Sarah Chen</span>
                  <span className="text-[10px] text-slate-500">Head of Technical Talent • Stripe Ecosystem</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between gap-6 hover:shadow-md transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
                  "The clean Markdown & JSON-LD schema exports straight into Greenhouse without manual re-formatting. It is the gold standard for developer resumes. No dropped sections, no font errors."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#048BA2] text-white font-black flex items-center justify-center text-sm shadow-xs">
                  MV
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-slate-900">Marcus Vance</span>
                  <span className="text-[10px] text-slate-500">VP of Engineering • Vercel Partner Network</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between gap-6 hover:shadow-md transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
                  "I switched my resume to Callback AI Minimalist Tech and received 4 Tier-1 interview requests within 48 hours. The recruiter told me the interactive candidate agent was the clincher."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#048BA2] text-white font-black flex items-center justify-center text-sm shadow-xs">
                  ER
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-slate-900">Elena Rostova</span>
                  <span className="text-[10px] text-slate-500">Founding AI Engineer • YC W24 Startup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & CTA Banner */}
      <section id="faq" className="py-24 px-6 lg:px-12 w-full relative z-10 border-t border-slate-200 bg-slate-50">
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          <div className="text-center flex flex-col items-center gap-3">
            <Badge variant="aurora" size="sm">Frequently Asked Questions</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Know
            </h2>
            <p className="text-base text-slate-500">
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
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs transition-all hover:border-[#048BA2]"
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 hover:text-[#048BA2] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ml-4 ${
                      openFaqIdx === idx ? 'rotate-180 text-[#048BA2]' : ''
                    }`}
                  />
                </button>
                {openFaqIdx === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Grand Finale High-Conversion CTA Banner */}
          <div className="w-full bg-slate-900 text-white p-8 sm:p-14 rounded-3xl border border-slate-800 shadow-2xl flex flex-col items-center text-center gap-6 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#048BA2]/25 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/15 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#048BA2] animate-pulse" />
              YC-Level Candidate Intelligence Platform
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-2xl leading-tight">
              Turn Your Resume Into a Living Agent Today.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Create an ATS-proof resume across 40+ modern designs, verify your accomplishments, and let your candidate agent handle recruiter screening around the clock.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full justify-center">
              <Link href="/sign-in" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-8" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Launch 3-Zone Builder Workspace
                </Button>
              </Link>
              <Link href="/sign-in" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Try Recruiter Q&A Agent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-50 border-t border-slate-200/80 py-12 px-6 lg:px-12 relative z-10 w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <Logo size="sm" showTagline={false} />
            <span>© 2026 Callback AI. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <Link href="/sign-in" className="hover:text-[#048BA2]">Dashboard</Link>
            <Link href="/sign-in" className="hover:text-[#048BA2]">Builder Workspace</Link>
            <Link href="/sign-in" className="hover:text-[#048BA2]">Living Agent</Link>
            <Link href="/sign-in" className="hover:text-[#048BA2]">Recruiter Surface</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
