'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Bot,
  ShieldCheck,
  Target,
  GitGraph,
  Briefcase,
  Layout,
  RefreshCw,
  Zap,
  Check,
  ChevronRight,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge, ProgressRing } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

const SAMPLE_OLD_RESUMES = [
  {
    id: 'sample-fullstack',
    title: 'Senior Full-Stack & AI Engineer (Old Resume)',
    badge: 'Recommended',
    text: `John Snow
john.snow@demo.com | +1 (555) 019-2834 | San Francisco, CA
https://linkedin.com/in/johnsnowdev | https://github.com/johnsnow-ai

SUMMARY
Senior Software Engineer with 5+ years of experience building scalable web applications and AI platforms. Responsible for database optimization, team leadership, and frontend design.

EXPERIENCE
Senior Software Engineer — Acme Systems (2022 - Present)
- Responsible for leading tech team and building web features using React, Next.js, and TypeScript.
- Worked on database queries to make it faster with PostgreSQL and Prisma.
- Helped with design and frontend implementation using Tailwind CSS.

Software Engineer — Cloud Scale Labs (2020 - 2022)
- Built web analytics portal used by thousands of business managers.
- Fixed bugs and improved API endpoint performance.

EDUCATION
B.S. in Computer Science — State University (2016 - 2020), GPA: 3.8

SKILLS
React, Next.js, TypeScript, Node.js, Python, PostgreSQL, Prisma, Tailwind CSS, Docker, AWS, GraphQL, Git`,
  },
  {
    id: 'sample-frontend',
    title: 'Frontend Architect (Old Resume)',
    badge: 'Design Focus',
    text: `John Snow
john.snow@demo.com | +1 (555) 432-8765 | San Francisco, CA

PROFESSIONAL SUMMARY
Frontend engineer passionate about design systems, micro-frontend architecture, and web performance optimization.

WORK HISTORY
Lead Frontend Developer — WebWorks Inc (2021 - Present)
- Developed complex UI components using React and Redux.
- Worked on page speed and site loading performance.

Frontend Engineer — Studio Apps (2019 - 2021)
- Implemented user dashboards and responsive web screens.

SKILLS
JavaScript, TypeScript, React, HTML5, CSS3, Tailwind, Jest, Webpack, Figma`,
  },
];

export default function ImportOldResumePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [resumeTitle, setResumeTitle] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [appliedFixes, setAppliedFixes] = useState<number[]>([]);

  const handleSelectSample = (sample: typeof SAMPLE_OLD_RESUMES[0]) => {
    setResumeTitle(sample.title);
    setPastedText(sample.text);
    setActiveTab('paste');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!resumeTitle) setResumeTitle(file.name.replace(/\.[^/.]+$/, ''));
      
      // Read text content only for text-based files
      if (file.name.endsWith('.txt') || file.name.endsWith('.json') || file.name.endsWith('.md')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          setPastedText(text || '');
        };
        reader.readAsText(file);
      }
    }
  };

  const handleRunATSAudit = async () => {
    setIsProcessing(true);
    setProcessingStep(1);

    // Simulate animated step-by-step parsing
    setTimeout(() => setProcessingStep(2), 700);
    setTimeout(() => setProcessingStep(3), 1400);

    try {
      let res: Response;
      if (activeTab === 'upload' && selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        if (resumeTitle) formData.append('customTitle', resumeTitle);
        res = await fetch('/api/resumes/import', {
          method: 'POST',
          body: formData,
        });
      } else {
        const rawText = pastedText.trim() || SAMPLE_OLD_RESUMES[0].text;
        res = await fetch('/api/resumes/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rawText,
            customTitle: resumeTitle || undefined,
            fileName: selectedFile?.name,
          }),
        });
      }

      const data = await res.json();

      setTimeout(() => {
        setIsProcessing(false);
        if (data.success && data.resumeId) {
          setAnalysisResult(data);
          if (typeof window !== 'undefined') {
            localStorage.setItem('active_resume_id', data.resumeId);
            localStorage.setItem('active_resume_title', data.title);
            if (data.parsedSections) {
              localStorage.setItem('callback_ai_saved_resume_' + data.resumeId, JSON.stringify({
                personalInfo: data.parsedSections.personalInfo,
                experiences: data.parsedSections.experience,
                education: data.parsedSections.education,
                projects: data.parsedSections.projects,
                skills: data.parsedSections.skills,
                certifications: data.parsedSections.certifications,
              }));
              localStorage.setItem('active_resume_data', JSON.stringify(data.parsedSections));
              if (data.parsedSections.personalInfo?.fullName) {
                localStorage.setItem('active_candidate_name', data.parsedSections.personalInfo.fullName);
              }
              if (data.parsedSections.personalInfo?.title) {
                localStorage.setItem('active_candidate_title', data.parsedSections.personalInfo.title);
              }
              if (data.parsedSections.personalInfo?.email) {
                localStorage.setItem('active_candidate_email', data.parsedSections.personalInfo.email);
              }
              if (data.parsedSections.skills) {
                localStorage.setItem('active_candidate_skills', JSON.stringify(data.parsedSections.skills));
              }
            }
            window.dispatchEvent(new Event('active_resume_changed'));
            window.dispatchEvent(new Event('storage'));
          }
        } else {
          alert(data.error || 'Failed to analyze resume');
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="aurora" size="sm">Flagship Feature</Badge>
            <span className="text-xs text-slate-500 font-bold">ATS Engine v3.4 + RAG Agent Importer</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Import Old Resume & ATS Audit
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Upload or paste your existing resume to check its ATS compatibility score, receive AI grammar & impact suggestions, and unlock all flagship features instantly.
          </p>
        </div>

        <Link href="/dashboard">
          <Button variant="secondary" size="md">
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {!analysisResult && !isProcessing && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Upload / Paste Form */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="p-6 bg-white flex flex-col gap-6 border-slate-200">
              {/* Tab Selector */}
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 w-fit">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'upload' ? 'bg-[#048BA2] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Upload className="w-4 h-4" /> Upload File (PDF/DOCX/TXT)
                </button>
                <button
                  onClick={() => setActiveTab('paste')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'paste' ? 'bg-[#048BA2] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-4 h-4" /> Paste Raw Text
                </button>
              </div>

              <Input
                label="Resume Target Title (Optional)"
                placeholder="e.g. John Snow — Senior Full-Stack & AI Engineer"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />

              {activeTab === 'upload' ? (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-[#048BA2] rounded-2xl p-10 bg-slate-50/70 transition-colors text-center cursor-pointer relative group">
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-12 h-12 rounded-full bg-[#E6F5F8] text-[#048BA2] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    {selectedFile ? selectedFile.name : 'Drag & Drop your old resume file here'}
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Supports PDF, DOCX, or plain text TXT files up to 10MB
                  </span>
                  {selectedFile && (
                    <Badge variant="success" className="mt-3">File Loaded Ready to Audit</Badge>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-900">Paste Your Old Resume Content:</label>
                  <textarea
                    rows={12}
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder="Paste full text of your existing resume here..."
                    className="w-full p-4 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#048BA2]/20 focus:border-[#048BA2]"
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Bot className="w-5 h-5" />}
                  onClick={async () => {
                    if (activeTab === 'paste' && !pastedText.trim()) {
                      return alert('Please paste your resume text to talk with agent');
                    }
                    if (activeTab === 'upload' && !selectedFile) {
                      return alert('Please select a resume file (PDF, DOCX, TXT) from your computer');
                    }
                    setIsProcessing(true);
                    try {
                      let res: Response;
                      if (activeTab === 'upload' && selectedFile) {
                        const formData = new FormData();
                        formData.append('file', selectedFile);
                        if (resumeTitle) formData.append('customTitle', resumeTitle);
                        res = await fetch('/api/resumes/import', {
                          method: 'POST',
                          body: formData,
                        });
                      } else {
                        res = await fetch('/api/resumes/import', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ rawText: pastedText, customTitle: resumeTitle || undefined }),
                        });
                      }
                      const data = await res.json();
                      if (data.resumeId) router.push(`/agent/${data.resumeId}`);
                    } catch (e) {
                      setIsProcessing(false);
                    }
                  }}
                  className="flex-1"
                >
                  Import & Talk with Agent
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Sparkles className="w-5 h-5 text-[#048BA2]" />}
                  onClick={handleRunATSAudit}
                  className="flex-1"
                >
                  Run ATS Audit
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column: Pre-loaded Demo Resumes */}
          <div className="flex flex-col gap-5">
            <Card className="p-6 bg-slate-50/80 border border-slate-200 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#048BA2]" />
                <h3 className="text-base font-bold text-slate-900">1-Click Test Drive</h3>
              </div>
              <p className="text-xs text-slate-500">
                Don't have a file ready? Click any sample resume below to test the parser, ATS audit, and flagship feature engine instantly.
              </p>

              <div className="flex flex-col gap-3">
                {SAMPLE_OLD_RESUMES.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className="p-4 bg-white rounded-xl border border-slate-200 hover:border-[#048BA2] cursor-pointer transition-all flex flex-col gap-2 group shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-[#048BA2] transition-colors">
                        {sample.title}
                      </span>
                      <Badge variant="aurora" size="sm">{sample.badge}</Badge>
                    </div>
                    <span className="text-[11px] text-slate-500 line-clamp-2 italic font-mono">
                      "{sample.text.slice(0, 110)}..."
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Loading & Processing Animation */}
      {isProcessing && (
        <Card className="p-12 bg-white border border-slate-200 flex flex-col items-center justify-center text-center gap-6 min-h-[450px]">
          <div className="w-16 h-16 rounded-full bg-[#E6F5F8] text-[#048BA2] flex items-center justify-center animate-pulse">
            <RefreshCw className="w-8 h-8 animate-spin" />
          </div>

          <div className="flex flex-col gap-2 max-w-md">
            <h3 className="text-xl font-extrabold text-slate-900">Parsing Old Resume & Scoring ATS...</h3>
            <p className="text-xs text-slate-500">
              Our multi-stage scanner is extracting structured sections, calculating ATS keyword density, and seeding RAG Candidate Agent memory.
            </p>
          </div>

          {/* Steps list */}
          <div className="flex flex-col gap-3 text-left w-full max-w-md bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className={`flex items-center gap-3 text-xs ${processingStep >= 1 ? 'text-teal-700 font-bold' : 'text-slate-500'}`}>
              <CheckCircle2 className={`w-4 h-4 ${processingStep >= 1 ? 'text-teal-600' : 'text-slate-300'}`} />
              <span>1. Extracting contact info, work history & skills...</span>
            </div>
            <div className={`flex items-center gap-3 text-xs ${processingStep >= 2 ? 'text-teal-700 font-bold' : 'text-slate-500'}`}>
              <CheckCircle2 className={`w-4 h-4 ${processingStep >= 2 ? 'text-teal-600' : 'text-slate-300'}`} />
              <span>2. Scoring ATS compatibility & readability index...</span>
            </div>
            <div className={`flex items-center gap-3 text-xs ${processingStep >= 3 ? 'text-teal-700 font-bold' : 'text-slate-500'}`}>
              <CheckCircle2 className={`w-4 h-4 ${processingStep >= 3 ? 'text-teal-600' : 'text-slate-300'}`} />
              <span>3. Seeding RAG Living Agent & persistent Skill Graph...</span>
            </div>
          </div>
        </Card>
      )}

      {/* Analysis Results & Flagship Features Unlocked */}
      {analysisResult && !isProcessing && (
        <div className="flex flex-col gap-6">
          {/* Talk with Living Agent Top Callout */}
          <div className="bg-[#E6F5F8]/40 border-2 border-[#048BA2]/30 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#048BA2] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">Talk with This Candidate's Living Agent Now</h3>
                  <Badge variant="aurora" size="sm">Zero Hallucination</Badge>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  The LLM has parsed and loaded all work experience, latency metrics, and verified skills into an anti-hallucination conversational agent.
                </p>
              </div>
            </div>
            <Link href={analysisResult.flagshipUrls.agentChat}>
              <Button
                variant="primary"
                size="md"
                className="whitespace-nowrap shadow-md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Open Agent & Start Chatting
              </Button>
            </Link>
          </div>

          {/* Top Score Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="flex flex-col items-center justify-center p-8 bg-white border border-slate-200 text-center gap-4">
              <ProgressRing score={analysisResult.atsScore} size={150} strokeWidth={11} label="Overall ATS Compatibility" />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-900">Parsed & Audit Complete</span>
                <span className="text-[11px] text-slate-500">
                  Extracted {analysisResult.sectionsCount} sections and {analysisResult.skillsExtracted.length} technical skills.
                </span>
              </div>
            </Card>

            <div className="md:col-span-2 flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-4 flex flex-col gap-1 bg-white border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Readability Grade</span>
                  <span className="text-2xl font-extrabold text-slate-900">{analysisResult.readabilityScore} / 100</span>
                  <span className="text-[10px] text-teal-700 font-semibold">Easy reading grade</span>
                </Card>

                <Card className="p-4 flex flex-col gap-1 bg-white border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Overall Impact</span>
                  <span className="text-2xl font-extrabold text-[#048BA2]">{analysisResult.overallStrengthScore} / 100</span>
                  <span className="text-[10px] text-[#048BA2] font-semibold">High metric density</span>
                </Card>

                <Card className="p-4 flex flex-col gap-1 bg-white border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Skills Detected</span>
                  <span className="text-2xl font-extrabold text-slate-900">{analysisResult.skillsExtracted.length} Skills</span>
                  <span className="text-[10px] text-[#048BA2] font-semibold">Added to Skill Graph</span>
                </Card>
              </div>

              {/* Grammar & Action Verb Improvements */}
              <Card className="p-6 bg-white flex flex-col gap-4 border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#048BA2]" /> AI Grammar & Impact Enhancements
                  </h3>
                  <Badge variant="aurora">{analysisResult.grammarIssues.length} Improvements</Badge>
                </div>

                <div className="flex flex-col gap-3">
                  {analysisResult.grammarIssues.map((issue: any, idx: number) => {
                    const isApplied = appliedFixes.includes(idx);
                    return (
                      <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-600">Suggestion #{idx + 1}</span>
                          {isApplied ? (
                            <Badge variant="success" icon={<Check className="w-3 h-3" />}>Applied to Builder</Badge>
                          ) : (
                            <button
                              onClick={() => setAppliedFixes([...appliedFixes, idx])}
                              className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              Apply Fix <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-lg text-rose-950">
                            <span className="font-semibold block mb-0.5 text-rose-700">Original Phrasing:</span>
                            "{issue.original}"
                          </div>
                          <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-950">
                            <span className="font-semibold block mb-0.5 text-emerald-700">Suggested Action Phrasing:</span>
                            "{issue.suggestion}"
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-500 italic">Reason: {issue.reason}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>

          {/* FLAGSHIP FEATURES UNLOCKED LAUNCHPAD */}
          <div className="flex flex-col gap-4 border-t border-slate-200 pt-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Badge variant="aurora">All Systems Active</Badge>
                <h2 className="text-xl font-extrabold text-slate-900">Flagship Features Unlocked for This Resume</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Your uploaded old resume has been converted into a living digital candidate asset. Use all 6 flagship features below:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Feature 1: Builder */}
              <Card hoverEffect className="p-5 bg-white border border-slate-200 flex flex-col justify-between gap-4 group">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Layout className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    1. 3-Zone Resume Builder
                  </h3>
                  <p className="text-xs text-slate-500">
                    Edit your parsed sections in our drag-and-drop builder. Switch between Modern Executive, Classic ATS, Minimalist Tech, and Navy templates.
                  </p>
                </div>
                <Link href={analysisResult.flagshipUrls.builder}>
                  <Button variant="primary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Open Builder & Templates
                  </Button>
                </Link>
              </Card>

              {/* Feature 2: Candidate RAG Agent */}
              <Card hoverEffect className="p-5 bg-white border border-slate-200 flex flex-col justify-between gap-4 group">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    2. Living Candidate RAG Agent
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your old resume experience is now loaded into an AI recruiter chat agent with anti-hallucination source citations.
                  </p>
                </div>
                <Link href={analysisResult.flagshipUrls.agentChat}>
                  <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Chat with Candidate Agent
                  </Button>
                </Link>
              </Card>

              {/* Feature 3: Job Description Matcher */}
              <Card hoverEffect className="p-5 bg-white border border-slate-200 flex flex-col justify-between gap-4 group">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    3. JD Matcher & Gap Analyzer
                  </h3>
                  <p className="text-xs text-slate-500">
                    Match your newly imported resume against target job descriptions to identify missing keywords and skill requirements.
                  </p>
                </div>
                <Link href={analysisResult.flagshipUrls.jdMatcher}>
                  <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Run JD Matcher
                  </Button>
                </Link>
              </Card>

              {/* Feature 4: Trust Score & Claim Verification */}
              <Card hoverEffect className="p-5 bg-white border border-slate-200 flex flex-col justify-between gap-4 group">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    4. Claim Verification & Trust Score
                  </h3>
                  <p className="text-xs text-slate-500">
                    Verify technical claims and metrics extracted from your old resume against GitHub repos and code evidence.
                  </p>
                </div>
                <Link href={analysisResult.flagshipUrls.trustScore}>
                  <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    View Trust Verification
                  </Button>
                </Link>
              </Card>

              {/* Feature 5: Skill Graph */}
              <Card hoverEffect className="p-5 bg-white border border-slate-200 flex flex-col justify-between gap-4 group">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                    <GitGraph className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    5. Persistent Skill Graph
                  </h3>
                  <p className="text-xs text-slate-500">
                    Explore your automatically populated skill network containing {analysisResult.skillsExtracted.length} technical skills and proficiency signals.
                  </p>
                </div>
                <Link href={analysisResult.flagshipUrls.skillGraph}>
                  <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Open Skill Graph
                  </Button>
                </Link>
              </Card>

              {/* Feature 6: Opportunities & Apply */}
              <Card hoverEffect className="p-5 bg-white border border-slate-200 flex flex-col justify-between gap-4 group">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    6. Auto-Tailor Applications
                  </h3>
                  <p className="text-xs text-slate-500">
                    Generate custom-tailored job application drafts and resume snapshots for targeted roles.
                  </p>
                </div>
                <Link href={analysisResult.flagshipUrls.opportunities}>
                  <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Tailor Applications
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
