'use client';

import React, { useState, useEffect, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Target,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  FileText,
  Copy,
  Check,
  Upload,
  Layers,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Cpu,
  BrainCircuit,
  Wand2,
  FileUp,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Card, Badge } from '@/components/ui/Card';
import { clsx } from 'clsx';
import { MatchResultOutput } from '@/lib/services/jd-match-service';

const PRESET_JOBS = [
  {
    id: 'vercel-ai',
    company: 'Vercel Labs',
    title: 'Senior AI Engineer',
    roleTag: 'Next.js + RAG + PgVector',
    text: `Role: Senior AI Engineer at Vercel Labs
Requirements:
- 3+ years of professional full-stack engineering experience using Next.js (App Router), React 19, and TypeScript.
- Hands-on expertise building production RAG applications with PgVector or specialized vector databases.
- Deep experience with LLM prompt engineering, evaluation frameworks (evals), and token latency optimization.
- Familiarity with Cloud infrastructure (AWS / Docker), serverless edge runtimes, and CI/CD pipelines.
- Proven track record shipping high-throughput, low-latency AI features at scale.`,
  },
  {
    id: 'stripe-backend',
    company: 'Stripe',
    title: 'Staff Backend Architect',
    roleTag: 'Distributed Systems & Microservices',
    text: `Role: Staff Backend Architect at Stripe
Requirements:
- 5+ years building fault-tolerant distributed systems, financial APIs, and high-concurrency microservices.
- Mastery of TypeScript / Node.js, Go, or Python with deep PostgreSQL schema optimization.
- Hands-on experience with Kafka / Redis event streaming and distributed transaction consistency.
- Experience with Docker, Kubernetes, Terraform, and multi-region AWS cloud deployments.
- Strong focus on automated testing, TDD, and 99.99% system availability.`,
  },
  {
    id: 'openai-ml',
    company: 'OpenAI',
    title: 'Applied AI & ML Platform Lead',
    roleTag: 'Multi-Agent & LLM Infra',
    text: `Role: Applied AI & ML Platform Lead at OpenAI
Requirements:
- 4+ years architecting autonomous multi-agent AI systems, embeddings pipelines, and real-time model orchestration.
- Deep hands-on experience with Python, TypeScript, Vector DBs (Pinecone/PgVector), and LangChain/LlamaIndex.
- Strong background in latency optimization, streaming responses, and prompt evaluation benchmarks.
- Proven leadership delivering customer-facing AI applications with verifiable impact metrics.`,
  },
  {
    id: 'figma-frontend',
    company: 'Figma',
    title: 'Senior Frontend Systems Engineer',
    roleTag: 'Design Systems & Performance',
    text: `Role: Senior Frontend Systems Engineer at Figma
Requirements:
- 4+ years crafting high-performance, accessible web applications with React, TypeScript, and Tailwind CSS.
- Deep expertise in DOM optimization, canvas rendering, state management, and real-time collaborative protocols.
- Experience writing clean, robust unit tests with Vitest/Jest and end-to-end testing with Playwright.
- Passion for pixel-perfect UI design systems and fluid micro-animations.`,
  },
];

export default function JDMatchPage(props: { params: Promise<{ resumeId: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const resumeId = params.resumeId || 'demo-resume-alex-1';

  // State Management
  const [jdText, setJdText] = useState(PRESET_JOBS[0].text);
  const [selectedPresetId, setSelectedPresetId] = useState('vercel-ai');
  const [activeTab, setActiveTab] = useState<'missing' | 'matched' | 'tailoring' | 'snapshot'>('tailoring');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Resume Metadata & Switcher State
  const [resumesList, setResumesList] = useState<{ id: string; title: string; updatedAt: string }[]>([]);
  const [candidateInfo, setCandidateInfo] = useState<{ name: string; title: string; email: string }>({
    name: 'Candidate',
    title: 'Software Engineer',
    email: '',
  });

  // Direct File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Match Result State
  const [matchResult, setMatchResult] = useState<MatchResultOutput | null>(null);

  // Initial Load: Fetch Resume Details & Prior Match
  useEffect(() => {
    let name = 'Candidate';
    let title = 'Software Engineer';
    let email = '';

    if (typeof window !== 'undefined') {
      const storedActiveId = localStorage.getItem('active_resume_id');
      if (resumeId === 'demo-resume-alex-1' && storedActiveId && storedActiveId !== 'demo-resume-alex-1') {
        router.replace(`/jd-match/${storedActiveId}`);
        return;
      }

      try {
        const saved = localStorage.getItem('callback_ai_saved_resume_' + resumeId);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.personalInfo?.fullName) name = parsed.personalInfo.fullName;
          if (parsed.personalInfo?.title) title = parsed.personalInfo.title;
          if (parsed.personalInfo?.email) email = parsed.personalInfo.email;
          setCandidateInfo({ name, title, email });
        }
      } catch (e) {}
    }

    fetch(`/api/resumes/${resumeId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.resume) {
          if (data.resume.sections) {
            const pInfo = data.resume.sections.find((s: any) => s.sectionType === 'personal_info');
            if (pInfo) {
              try {
                const parsed = typeof pInfo.content === 'string' ? JSON.parse(pInfo.content) : pInfo.content;
                if (parsed.fullName) name = parsed.fullName;
                if (parsed.title) title = parsed.title;
                if (parsed.email) email = parsed.email;
              } catch {}
            }
            const expSec = data.resume.sections.find((s: any) => s.sectionType === 'experience');
            if (expSec) {
              try {
                const parsed = typeof expSec.content === 'string' ? JSON.parse(expSec.content) : expSec.content;
                if (parsed[0]?.role && title === 'Software Engineer') title = parsed[0].role;
              } catch {}
            }
          }
          if (data.resume.title && name === 'Candidate') {
            name = data.resume.title.split('—')[0].trim();
          }
          setCandidateInfo({ name, title, email });
        }
      })
      .catch(console.error);

    // Fetch user resumes list
    fetch(`/api/match?resumeId=${resumeId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.resumes) setResumesList(data.resumes);
      })
      .catch(console.error);

    // Auto-run initial match
    handleRunMatch(resumeId, PRESET_JOBS[0].text);
  }, [resumeId, router]);

  // Execute Match
  const handleRunMatch = async (targetResumeId = resumeId, targetJdText = jdText) => {
    setIsLoading(true);
    setLoadingStep('Analyzing with AI & computing match score...');

    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId: targetResumeId, jdText: targetJdText }),
      });

      const data = await res.json();
      if (data.match) {
        setMatchResult(data.match);
      }
    } catch (err) {
      console.error('Match calculation failed:', err);
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  // Handle Direct Resume File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadedFileName(file.name);
    setLoadingStep(`Parsing ${file.name} binary stream...`);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('jdText', jdText);

      const res = await fetch('/api/match', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.resumeId) {
        setMatchResult(data.match);
        // Switch route to newly uploaded resume
        router.push(`/jd-match/${data.resumeId}`);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
      setLoadingStep('');
    }
  };

  // Copy helper
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Compute grade colors
  const matchPct = matchResult?.matchPercentage || 0;
  const gradeColor =
    matchPct >= 90 ? 'text-emerald-600 bg-emerald-50 border-emerald-200' :
    matchPct >= 75 ? 'text-[#048BA2] bg-[#E6F5F8] border-slate-200' :
    matchPct >= 60 ? 'text-amber-600 bg-amber-50 border-amber-200' :
    'text-rose-600 bg-rose-50 border-rose-200';

  const strokeColor =
    matchPct >= 90 ? '#059669' :
    matchPct >= 75 ? '#048BA2' :
    matchPct >= 60 ? '#D97706' :
    '#E11D48';

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#E6F5F8] rounded-xl border border-slate-200 text-[#048BA2]">
              <Target className="w-6 h-6" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              Job Description Matcher & AI Tailoring
            </h1>
          </div>
          <p className="text-xs lg:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Compare this candidate's verified resume against any target job posting. Surfaces exact keyword gaps, multi-dimensional fit telemetry, and context-aware bullet rewrites.
          </p>
        </div>

        {/* Active Candidate Badge & Upload Quick Action */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Active Candidate Chip */}
          <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-2xl shadow-2xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#048BA2] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {candidateInfo.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900">{candidateInfo.name}</span>
              <span className="text-[10px] text-slate-500">{candidateInfo.title}</span>
            </div>
          </div>

          {/* Resume Switcher Dropdown (if multiple resumes) */}
          {resumesList.length > 1 && (
            <div className="relative">
              <select
                value={resumeId}
                onChange={(e) => router.push(`/jd-match/${e.target.value}`)}
                className="px-3.5 py-2.5 bg-white border border-slate-200 text-xs font-bold text-slate-900 rounded-2xl shadow-2xs cursor-pointer hover:border-[#048BA2] transition-colors appearance-none pr-8"
              >
                {resumesList.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title.slice(0, 24)}...
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}

          {/* Direct Resume Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.docx,.txt"
            className="hidden"
          />
          <Button
            variant="secondary"
            size="md"
            onClick={() => fileInputRef.current?.click()}
            isLoading={isUploading}
            leftIcon={<Upload className="w-4 h-4 text-[#048BA2]" />}
            className="shadow-2xs rounded-2xl bg-white hover:bg-slate-50 border-slate-200"
          >
            Upload Resume to Match
          </Button>
        </div>
      </div>

      {/* Main Grid: Left JD Input / Right Real-Time Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Target Job Description & Quick Presets (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="p-6 bg-white border border-slate-200 rounded-3xl shadow-md flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#048BA2]" />
                <h2 className="text-sm font-extrabold text-slate-900">Target Job Description</h2>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {jdText.trim().split(/\s+/).length} words
              </span>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                ⚡ Quick Target Roles
              </span>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_JOBS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setSelectedPresetId(preset.id);
                      setJdText(preset.text);
                      handleRunMatch(resumeId, preset.text);
                    }}
                    className={clsx(
                      'p-2.5 text-left rounded-xl border text-xs font-bold transition-all flex flex-col gap-0.5 cursor-pointer',
                      selectedPresetId === preset.id
                        ? 'bg-[#E6F5F8] border-[#048BA2] text-[#048BA2] shadow-2xs ring-1 ring-[#048BA2]'
                        : 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-white hover:border-slate-300'
                    )}
                  >
                    <span className="truncate">{preset.company}</span>
                    <span className="text-[10px] font-normal text-slate-500 truncate">{preset.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Job Description Textarea */}
            <div className="flex flex-col gap-2">
              <Textarea
                rows={11}
                value={jdText}
                onChange={(e) => {
                  setJdText(e.target.value);
                  setSelectedPresetId('');
                }}
                placeholder="Paste the target job description or requirements here..."
                className="font-mono text-xs leading-relaxed border-slate-200 focus:border-[#048BA2] focus:ring-[#048BA2]/20 rounded-2xl"
              />
            </div>

            {/* Match CTA Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleRunMatch(resumeId, jdText)}
              isLoading={isLoading}
              className="w-full shadow-md rounded-2xl text-xs font-extrabold"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isLoading ? (loadingStep || 'Analyzing Match...') : 'Calculate Match & Generate AI Tailoring'}
            </Button>

            {/* Dropzone Mini Helper */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-3.5 border border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-[#E6F5F8] transition-colors flex items-center justify-between text-xs text-slate-500 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileUp className="w-4 h-4 text-[#048BA2]" />
                <span className="font-medium">
                  {uploadedFileName ? `Matched with: ${uploadedFileName}` : 'Drag & drop a different resume (PDF / DOCX)'}
                </span>
              </div>
              <span className="text-[10px] font-extrabold text-[#048BA2] uppercase">Browse</span>
            </div>
          </Card>
        </div>

        {/* Right Column: AI Telemetry Scorecard & Tailoring Recommendations (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Top Scorecard & Multi-Dimensional Telemetry */}
          <Card className="p-6 bg-white border border-slate-200 rounded-3xl shadow-md flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#048BA2]/5 to-transparent rounded-full pointer-events-none" />

            {/* SVG Radial Score Ring */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    stroke="#E2E8F0"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    stroke={strokeColor}
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 48}
                    strokeDashoffset={2 * Math.PI * 48 * (1 - matchPct / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-slate-900">{matchPct}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">/ 100</span>
                </div>
              </div>
              <span className="text-[11px] font-extrabold text-slate-500 uppercase mt-2">
                Target Job Fit Score
              </span>
            </div>

            {/* Fit Assessment & Sub-Score Progress Bars */}
            <div className="flex-1 flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between gap-2">
                <span className={clsx('px-3 py-1 text-xs font-black rounded-full border', gradeColor)}>
                  {matchResult?.fitGrade || 'Strong Fit Candidate'}
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">
                  {matchResult?.matchedKeywords?.length || 0} matched / {matchResult?.missingKeywordsDetailed?.length || 0} gaps
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {matchResult?.fitSummary ||
                  'Candidate displays strong architectural grounding. Implementing the tailored recommendations below will maximize ATS pass score.'}
              </p>

              {/* 4 Dimensional Bars */}
              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-500">Technical Skills</span>
                    <span className="text-slate-900">{matchResult?.subScores?.technicalSkills || 88}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#048BA2] rounded-full transition-all duration-700"
                      style={{ width: `${matchResult?.subScores?.technicalSkills || 88}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-500">Experience Depth</span>
                    <span className="text-slate-900">{matchResult?.subScores?.experienceDepth || 90}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                      style={{ width: `${matchResult?.subScores?.experienceDepth || 90}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-500">Domain Architecture</span>
                    <span className="text-slate-900">{matchResult?.subScores?.domainArchitecture || 94}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                      style={{ width: `${matchResult?.subScores?.domainArchitecture || 94}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-500">Keyword Density</span>
                    <span className="text-slate-900">{matchResult?.subScores?.keywordDensity || 82}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all duration-700"
                      style={{ width: `${matchResult?.subScores?.keywordDensity || 82}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tabbed Navigation: Tailoring Rewrites / Missing Keywords / Matched Skills / Tailored Snapshot */}
          <div className="flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('tailoring')}
              className={clsx(
                'px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer',
                activeTab === 'tailoring'
                  ? 'bg-[#048BA2] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              <Wand2 className="w-3.5 h-3.5" />
              AI Bullet Rewrites ({matchResult?.tailoringRecommendations?.length || 0})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('missing')}
              className={clsx(
                'px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer',
                activeTab === 'missing'
                  ? 'bg-[#048BA2] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              Missing Keywords ({matchResult?.missingKeywordsDetailed?.length || matchResult?.missingKeywords?.length || 0})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('matched')}
              className={clsx(
                'px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer',
                activeTab === 'matched'
                  ? 'bg-[#048BA2] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Matched Strengths ({matchResult?.matchedKeywords?.length || 0})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('snapshot')}
              className={clsx(
                'px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer',
                activeTab === 'snapshot'
                  ? 'bg-[#048BA2] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Tailored Summary
            </button>
          </div>

          {/* TAB 1: AI Bullet Rewrites (Context-Aware Transformations) */}
          {activeTab === 'tailoring' && (
            <div className="flex flex-col gap-4">
              {matchResult?.tailoringRecommendations && matchResult.tailoringRecommendations.length > 0 ? (
                matchResult.tailoringRecommendations.map((rec, idx) => (
                  <Card key={idx} className="p-5 bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-[#E6F5F8] text-[#048BA2] border border-[#048BA2]/25 text-[10px] font-black rounded-full uppercase">
                          {rec.targetSection}
                        </span>
                        {rec.roleOrProject && (
                          <span className="text-xs font-bold text-slate-900">{rec.roleOrProject}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {rec.keywordsAdded?.map((kw, kidx) => (
                          <span key={kidx} className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold rounded-md">
                            +{kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Original vs Tailored Comparison */}
                    <div className="flex flex-col gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Original Resume Snippet:</span>
                        <p className="text-xs text-slate-400 line-through decoration-rose-400">
                          {rec.originalSnippet}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1 pt-2 border-t border-slate-200">
                        <span className="text-[10px] font-bold text-[#048BA2] uppercase flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#048BA2]" /> AI Tailored Bullet (Ready to Paste):
                        </span>
                        <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                          {rec.tailoredRewrite}
                        </p>
                      </div>
                    </div>

                    {/* Rationale & Action Buttons */}
                    <div className="flex items-center justify-between gap-4 pt-1">
                      <span className="text-[11px] text-slate-500 italic">
                        💡 {rec.reason}
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => copyToClipboard(rec.tailoredRewrite, `bullet-${idx}`)}
                        leftIcon={copiedId === `bullet-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        className="shrink-0 text-xs rounded-xl bg-white hover:bg-slate-50"
                      >
                        {copiedId === `bullet-${idx}` ? 'Copied!' : 'Copy Bullet'}
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 bg-white border border-[#EAE3D5] rounded-3xl text-center flex flex-col items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  <h3 className="text-sm font-bold text-[#231F1D]">Candidate is Already Strongly Tailored</h3>
                  <p className="text-xs text-[#786F68] max-w-md">
                    The candidate resume covers all critical requirements of this job description.
                  </p>
                </Card>
              )}
            </div>
          )}

          {/* TAB 2: Missing Keywords & Skill Gaps */}
          {activeTab === 'missing' && (
            <Card className="p-6 bg-white border border-[#EAE3D5] rounded-3xl shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#231F1D] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" /> Detected Keyword & Requirement Gaps
                </h3>
                <span className="text-[11px] text-[#786F68]">Click any keyword to copy recommendation</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {matchResult?.missingKeywordsDetailed && matchResult.missingKeywordsDetailed.length > 0 ? (
                  matchResult.missingKeywordsDetailed.map((kw, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => copyToClipboard(`Verified proficiency in ${kw.name} in scalable production systems.`, `kw-${idx}`)}
                      className="px-3 py-1.5 bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs text-left"
                    >
                      <span>+ {kw.name}</span>
                      <span className="px-1.5 py-0.2 text-[9px] uppercase bg-amber-200/60 rounded text-amber-800 font-extrabold">
                        {kw.importance}
                      </span>
                      {copiedId === `kw-${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-amber-700 opacity-60" />}
                    </button>
                  ))
                ) : matchResult?.missingKeywords ? (
                  matchResult.missingKeywords.map((kw, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold rounded-xl">
                      + {kw}
                    </span>
                  ))
                ) : null}
              </div>

              {matchResult?.experienceGaps && matchResult.experienceGaps.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#EAE3D5] flex flex-col gap-2">
                  <span className="text-[11px] font-extrabold text-[#786F68] uppercase">
                    Experience & Seniority Gaps
                  </span>
                  {matchResult.experienceGaps.map((gap, gidx) => (
                    <div key={gidx} className="p-3 bg-[#FAF6F0] rounded-xl text-xs text-[#231F1D] flex items-start gap-2 border border-[#EAE3D5]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] mt-1.5 shrink-0" />
                      <span>{gap}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* TAB 3: Matched Core Strengths */}
          {activeTab === 'matched' && (
            <Card className="p-6 bg-white border border-[#EAE3D5] rounded-3xl shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#231F1D] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified Matching Skills & Proof
                </h3>
                <span className="text-[11px] text-[#786F68]">Grounding index from candidate resume</span>
              </div>

              <div className="flex flex-col gap-2.5">
                {matchResult?.matchedKeywords && matchResult.matchedKeywords.length > 0 ? (
                  matchResult.matchedKeywords.map((item, idx) => (
                    <div key={idx} className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-extrabold text-emerald-950">{item.name}</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase rounded-md">
                          {item.category.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-900/80 italic truncate max-w-sm">
                        {item.candidateContext}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-[#786F68]">No verified matches found.</span>
                )}
              </div>
            </Card>
          )}

          {/* TAB 4: Tailored Resume Snapshot */}
          {activeTab === 'snapshot' && (
            <Card className="p-6 bg-white border border-[#EAE3D5] rounded-3xl shadow-sm flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#231F1D] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C85A32]" /> Tailored Resume Summary & Profile
                </h3>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => copyToClipboard(matchResult?.tailoredResumeSnapshot?.suggestedSummary || '', 'summary')}
                  leftIcon={copiedId === 'summary' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  className="rounded-xl bg-white hover:bg-[#FDF4F0]"
                >
                  {copiedId === 'summary' ? 'Copied!' : 'Copy Summary'}
                </Button>
              </div>

              <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#EAE3D5]">
                <span className="text-[10px] font-bold text-[#786F68] uppercase block mb-1.5">
                  AI Tailored Executive Summary (Optimized for {PRESET_JOBS.find(p => p.id === selectedPresetId)?.company || 'Target Job'}):
                </span>
                <p className="text-xs text-[#231F1D] leading-relaxed font-serif italic">
                  "{matchResult?.tailoredResumeSnapshot?.suggestedSummary ||
                    `${candidateInfo.name} is an accomplished ${candidateInfo.title} with demonstrated track record scaling high-availability AI systems, handling multi-agent orchestration, and delivering verified business results.`}"
                </p>
              </div>

              {matchResult?.tailoredResumeSnapshot?.suggestedSkills && (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-extrabold text-[#786F68] uppercase">
                    Recommended Technical Skills Taxonomy:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.tailoredResumeSnapshot.suggestedSkills.map((sk, sidx) => (
                      <span key={sidx} className="px-2.5 py-1 bg-white border border-[#EAE3D5] text-[#231F1D] text-xs font-bold rounded-lg shadow-2xs">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
