'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Card';
import { Logo } from '@/components/ui/Logo';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'agent' | 'ats' | 'trust'>('agent');
  const [selectedDemoTemplate, setSelectedDemoTemplate] = useState<'classic_ats' | 'modern_executive' | 'minimalist_tech' | 'editorial_two_col'>('modern_executive');

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#231F1D] flex flex-col font-sans relative overflow-x-hidden selection:bg-[#FDF4F0] selection:text-[#C85A32]">
      {/* Background Subtle Dot Pattern Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#EAE3D5_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      {/* Top Navbar — Edge to Edge */}
      <header className="sticky top-0 z-50 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#EAE3D5]">
        <div className="w-full px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link href="/">
            <Logo size="md" showTagline />
          </Link>

          {/* Pill Navigation Bar */}
          <nav className="hidden md:flex items-center gap-2">
            <a href="#templates" className="px-5 py-2 bg-white border border-[#EAE3D5] text-[#231F1D] text-xs font-bold rounded-full shadow-2xs hover:bg-[#FDF4F0] transition-all">
              Resume Templates
            </a>
            <a href="#features" className="px-5 py-2 bg-white border border-[#EAE3D5] text-[#231F1D] text-xs font-bold rounded-full shadow-2xs hover:bg-[#FDF4F0] transition-all">
              Features
            </a>
            <a href="#living-agent" className="px-5 py-2 bg-white border border-[#EAE3D5] text-[#231F1D] text-xs font-bold rounded-full shadow-2xs hover:bg-[#FDF4F0] transition-all">
              Living Agent
            </a>
            <a href="#trust-score" className="px-5 py-2 bg-white border border-[#EAE3D5] text-[#231F1D] text-xs font-bold rounded-full shadow-2xs hover:bg-[#FDF4F0] transition-all">
              Trust Verification
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
                <span className="text-xl sm:text-2xl font-extrabold text-[#231F1D]">4 Themes</span>
                <span className="text-[11px] font-bold text-[#786F68] uppercase">ATS Templates</span>
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

          {/* Right Column: Interactive Workspace Mockup Card */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white border border-[#EAE3D5] rounded-3xl shadow-xl p-6 flex flex-col gap-5 relative overflow-hidden">
              {/* Window Bar Header */}
              <div className="flex items-center justify-between border-b border-[#EAE3D5] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-bold text-[#786F68]">Callback Workspace — Ayush Mishra</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">ATS Score: 94/100</Badge>
                  <Badge variant="terracotta">Trust Score: 96% Verified</Badge>
                </div>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-2 bg-[#FAF6F0] p-1 rounded-xl border border-[#EAE3D5]">
                <button
                  onClick={() => setActiveTab('agent')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'agent' ? 'bg-white text-[#C85A32] shadow-2xs' : 'text-[#786F68]'
                  }`}
                >
                  Living Agent
                </button>
                <button
                  onClick={() => setActiveTab('ats')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'ats' ? 'bg-white text-[#C85A32] shadow-2xs' : 'text-[#786F68]'
                  }`}
                >
                  ATS Analyzer
                </button>
                <button
                  onClick={() => setActiveTab('trust')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'trust' ? 'bg-white text-[#C85A32] shadow-2xs' : 'text-[#786F68]'
                  }`}
                >
                  Trust Score
                </button>
              </div>

              {/* Dynamic Preview Content */}
              {activeTab === 'agent' && (
                <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                  <div className="bg-[#FAF6F0] p-3.5 rounded-2xl text-xs text-[#231F1D] font-medium border border-[#EAE3D5]">
                    Recruiter: "What was Alex's biggest latency optimization achievement?"
                  </div>
                  <div className="bg-[#FDF4F0] p-4 rounded-2xl text-xs text-[#231F1D] leading-relaxed border border-[#F6DCD1] flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#C85A32] flex items-center gap-1.5">
                        <Bot className="w-4 h-4" /> Living Candidate Agent
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        100% Grounded
                      </span>
                    </div>
                    <span>
                      "Alex architected a PgVector RAG query pipeline at Aether Cloud handling 150k daily active requests, cutting p95 latency by 45% down to 180ms."
                    </span>
                    <div className="pt-2 border-t border-[#F6DCD1] flex items-center gap-1 text-[10px] text-[#C85A32] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Source Citation: Experience #1 — Aether Cloud Tech
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ats' && (
                <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#EAE3D5] flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-[#786F68]">ATS Keyword Density</span>
                      <span className="text-lg font-extrabold text-[#C85A32]">94 / 100</span>
                    </div>
                    <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#EAE3D5] flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-[#786F68]">Readability Grade</span>
                      <span className="text-lg font-extrabold text-emerald-700">Easy (Grade 9)</span>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-medium">
                    ✔ All 5 core sections formatted for Workday & Greenhouse parsers.
                  </div>
                </div>
              )}

              {activeTab === 'trust' && (
                <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                  <div className="p-3 bg-[#FDF4F0] border border-[#F6DCD1] rounded-xl flex items-center justify-between text-xs">
                    <span className="font-bold text-[#231F1D]">GitHub Repository Verification</span>
                    <Badge variant="success">Verified Match</Badge>
                  </div>
                  <div className="p-3 bg-[#FAF6F0] border border-[#EAE3D5] rounded-xl text-xs text-[#786F68]">
                    Verified UC Berkeley Computer Science degree record & AWS Solutions Architect certification.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Resume Templates Gallery Showcase Section */}
      <section id="templates" className="py-20 px-6 lg:px-12 bg-white border-y border-[#EAE3D5] relative z-10 w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
            <Badge variant="terracotta" size="sm">
              <Layout className="w-3.5 h-3.5" /> Multiple Resume Page Designs
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#231F1D] tracking-tight">
              Choose from Multiple Professional Resume Templates
            </h2>
            <p className="text-base text-[#786F68]">
              Switch templates anytime in the 3-zone builder with a single click. Every template is 100% ATS-tested and exportable to printable PDF.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => setSelectedDemoTemplate('classic_ats')}
              className={`bg-[#FAF6F0] p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                selectedDemoTemplate === 'classic_ats' ? 'border-[#C85A32] shadow-md ring-2 ring-[#C85A32]/20' : 'border-[#EAE3D5] hover:border-[#D8CFC4]'
              }`}
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-[#C85A32] uppercase">Classic ATS Standard</span>
                <p className="text-xs text-[#786F68]">Traditional single-column layout with serif headers, favored by Fortune 500 ATS systems.</p>
              </div>
              <div className="h-32 bg-white border border-gray-200 rounded-lg p-3 flex flex-col gap-2 overflow-hidden shadow-2xs opacity-90">
                <div className="w-1/2 h-2 bg-gray-900 rounded mx-auto" />
                <div className="w-3/4 h-1 bg-gray-400 rounded mx-auto" />
                <div className="w-full h-0.5 bg-gray-300 my-1" />
                <div className="w-full h-1 bg-gray-700 rounded" />
                <div className="w-5/6 h-1 bg-gray-500 rounded" />
              </div>
            </div>

            <div
              onClick={() => setSelectedDemoTemplate('modern_executive')}
              className={`bg-[#FAF6F0] p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                selectedDemoTemplate === 'modern_executive' ? 'border-[#C85A32] shadow-md ring-2 ring-[#C85A32]/20' : 'border-[#EAE3D5] hover:border-[#D8CFC4]'
              }`}
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-[#C85A32] uppercase">Modern Executive</span>
                <p className="text-xs text-[#786F68]">Left terracotta accent banner, structured card entries, and sleek sans-serif typography.</p>
              </div>
              <div className="h-32 bg-white border border-gray-200 rounded-lg p-3 flex flex-col gap-2 overflow-hidden shadow-2xs opacity-90">
                <div className="w-full h-6 bg-[#FDF4F0] border-l-2 border-[#C85A32] rounded-r p-1 flex items-center">
                  <div className="w-1/3 h-1.5 bg-[#C85A32] rounded" />
                </div>
                <div className="w-full h-1 bg-[#C85A32] rounded" />
                <div className="w-full h-1 bg-gray-400 rounded" />
              </div>
            </div>

            <div
              onClick={() => setSelectedDemoTemplate('minimalist_tech')}
              className={`bg-[#FAF6F0] p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                selectedDemoTemplate === 'minimalist_tech' ? 'border-[#C85A32] shadow-md ring-2 ring-[#C85A32]/20' : 'border-[#EAE3D5] hover:border-[#D8CFC4]'
              }`}
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-[#C85A32] uppercase">Minimalist Tech</span>
                <p className="text-xs text-[#786F68]">Compact monospace header, clean section dividers, ideal for software engineers & devs.</p>
              </div>
              <div className="h-32 bg-white border border-black rounded-lg p-3 flex flex-col gap-2 overflow-hidden shadow-2xs opacity-90 font-mono">
                <div className="w-2/3 h-2 bg-black rounded" />
                <div className="w-full h-0.5 bg-black my-1" />
                <div className="w-full h-1 bg-gray-700 rounded" />
              </div>
            </div>

            <div
              onClick={() => setSelectedDemoTemplate('editorial_two_col')}
              className={`bg-[#FAF6F0] p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                selectedDemoTemplate === 'editorial_two_col' ? 'border-[#C85A32] shadow-md ring-2 ring-[#C85A32]/20' : 'border-[#EAE3D5] hover:border-[#D8CFC4]'
              }`}
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-[#C85A32] uppercase">Editorial Two-Column</span>
                <p className="text-xs text-[#786F68]">Left sidebar for skills & contact info, main column for work experience & projects.</p>
              </div>
              <div className="h-32 bg-white border border-gray-200 rounded-lg p-2 grid grid-cols-12 gap-1 overflow-hidden shadow-2xs opacity-90">
                <div className="col-span-4 bg-[#FAF6F0] h-full rounded p-1 flex flex-col gap-1">
                  <div className="w-full h-1.5 bg-[#C85A32] rounded" />
                  <div className="w-full h-1 bg-gray-400 rounded" />
                </div>
                <div className="col-span-8 h-full flex flex-col gap-1 p-1">
                  <div className="w-3/4 h-1.5 bg-gray-800 rounded" />
                  <div className="w-full h-1 bg-gray-400 rounded" />
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
