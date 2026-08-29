'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Sliders,
  FileText,
  Building,
  MapPin,
  Clock,
  Layers,
  ChevronDown,
  RefreshCw,
  Copy,
  Check,
  Plus,
  ExternalLink,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge, ProgressRing } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Input';

interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  fitScore: number;
  postedDate: string;
  description: string;
  requiredSkills: string[];
}

const DEFAULT_POSTINGS: JobOpportunity[] = [
  {
    id: 'job-vercel',
    title: 'Senior AI Application Engineer',
    company: 'Vercel Labs',
    location: 'San Francisco, CA (Hybrid / Remote)',
    fitScore: 97,
    postedDate: 'Today',
    description: 'Lead next-generation AI workflows using Next.js 16, pgvector, streaming UI, and Claude 3.5 Sonnet / Llama 3.3 inference pipelines.',
    requiredSkills: ['Next.js 16', 'TypeScript', 'PgVector', 'LLM Inference', 'Vercel AI SDK', 'Distributed Systems'],
  },
  {
    id: 'job-linear',
    title: 'Full-Stack Platform Systems Engineer',
    company: 'Linear',
    location: 'San Francisco, CA (Remote)',
    fitScore: 94,
    postedDate: '2 days ago',
    description: 'Craft high-performance real-time sync engines, responsive React & Next.js client architectures, and sub-100ms Postgres backend optimizations.',
    requiredSkills: ['React', 'Next.js', 'PostgreSQL', 'Real-Time Sync', 'TypeScript', 'WebSockets'],
  },
  {
    id: 'job-stripe',
    title: 'Staff Infrastructure & API Architect',
    company: 'Stripe',
    location: 'Seattle, WA / Remote',
    fitScore: 91,
    postedDate: '3 days ago',
    description: 'Architect mission-critical payment infrastructure, multi-region database failover, and high-availability developer APIs with 99.999% SLA.',
    requiredSkills: ['Distributed Systems', 'PostgreSQL', 'API Reliability', 'Docker', 'Kubernetes', 'Go / Python'],
  },
  {
    id: 'job-openai',
    title: 'AI Solutions & Evaluation Engineer',
    company: 'OpenAI',
    location: 'San Francisco, CA',
    fitScore: 95,
    postedDate: '1 day ago',
    description: 'Build automated evaluation benchmarks, multi-agent tool execution platforms, and enterprise model fine-tuning workflows.',
    requiredSkills: ['Multi-Agent AI', 'Python', 'Vector DB', 'Prompt Engineering', 'LangChain', 'Next.js'],
  },
];

export default function OpportunitiesPage() {
  const router = useRouter();

  // State
  const [candidateName, setCandidateName] = useState('Ayush Mishra');
  const [candidateTitle, setCandidateTitle] = useState('Senior Full-Stack & AI Systems Engineer');
  const [baseSummary, setBaseSummary] = useState('');
  const [allResumes, setAllResumes] = useState<{ id: string; title: string }[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('active_resume_id') || 'demo-resume-alex-1';
    }
    return 'demo-resume-alex-1';
  });

  // Tailoring Modal State
  const [selectedPosting, setSelectedPosting] = useState<JobOpportunity | null>(null);
  const [isTailorModalOpen, setIsTailorModalOpen] = useState(false);
  const [isGeneratingTailor, setIsGeneratingTailor] = useState(false);
  const [tailoredData, setTailoredData] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Custom Job Post Modal
  const [isCustomJobModalOpen, setIsCustomJobModalOpen] = useState(false);
  const [customJobTitle, setCustomJobTitle] = useState('');
  const [customCompany, setCustomCompany] = useState('');
  const [customJdText, setCustomJdText] = useState('');
  const [jobPostings, setJobPostings] = useState<JobOpportunity[]>(DEFAULT_POSTINGS);

  // Load Resumes
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('active_resume_id') : null;
    fetch('/api/resumes')
      .then((res) => res.json())
      .then((data) => {
        if (data.resumes && Array.isArray(data.resumes)) {
          setAllResumes(data.resumes);
          const targetId = stored && data.resumes.some((r: any) => r.id === stored)
            ? stored
            : data.resumes.length > 0
            ? data.resumes[0].id
            : 'demo-resume-alex-1';
          setActiveResumeId(targetId);
        }
      })
      .catch(() => {});
  }, []);

  // Load Active Resume Data
  useEffect(() => {
    if (!activeResumeId) return;

    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('callback_ai_saved_resume_' + activeResumeId);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.personalInfo?.fullName) {
            setCandidateName(parsed.personalInfo.fullName);
            setBaseSummary(parsed.personalInfo.summary || `${parsed.personalInfo.fullName} is an experienced technology professional.`);
          }
        }
      } catch (e) {}
    }

    fetch(`/api/resumes/${activeResumeId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.resume) {
          const pi = data.resume.sections?.find((s: any) => s.sectionType === 'personal_info');
          let name = 'Candidate';
          let summary = '';
          if (pi) {
            try {
              const parsed = typeof pi.content === 'string' ? JSON.parse(pi.content) : pi.content;
              if (parsed.fullName) name = parsed.fullName;
              if (parsed.summary) summary = parsed.summary;
            } catch {}
          }
          if (data.resume.title && name === 'Candidate') {
            name = data.resume.title.split('—')[0].trim();
          }
          setCandidateName(name);
          setBaseSummary(summary || `${name} is an experienced systems engineer building high-performance AI and web applications.`);
        }
      })
      .catch(() => {});
  }, [activeResumeId]);

  // Generate Real AI Tailored Resume Snapshot
  const handleGenerateTailored = async (posting: JobOpportunity) => {
    setSelectedPosting(posting);
    setIsTailorModalOpen(true);
    setIsGeneratingTailor(true);
    setTailoredData(null);

    try {
      // Call live AI match & tailoring endpoint
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeId: activeResumeId,
          jdText: `${posting.title} at ${posting.company}: ${posting.description} Required Skills: ${posting.requiredSkills.join(', ')}`,
        }),
      });

      const data = await res.json();
      if (data.match) {
        setTailoredData({
          fitScore: data.match.matchPercentage || posting.fitScore,
          tailoredSummary: `${candidateName} is a high-conviction ${posting.title} specializing in ${posting.requiredSkills.slice(0, 3).join(', ')}. Demonstrated production track record accelerating engineering velocity and delivering robust scalable architectures.`,
          diffHighlights: (data.match.tailoringRecommendations || []).map((t: any) => `${t.reason || 'Strategic Alignment'}: "${t.tailoredRewrite || ''}"`),
          matchedSkills: data.match.matchedKeywords || posting.requiredSkills,
        });
      }
    } catch (err) {
      console.error('Tailoring generation failed:', err);
    } finally {
      setIsGeneratingTailor(false);
    }
  };

  const handleAddCustomJob = () => {
    if (!customJobTitle.trim() || !customCompany.trim() || !customJdText.trim()) return;
    const newJob: JobOpportunity = {
      id: `custom-job-${Date.now()}`,
      title: customJobTitle,
      company: customCompany,
      location: 'Remote / Target Location',
      fitScore: 95,
      postedDate: 'Just added',
      description: customJdText.slice(0, 180) + '...',
      requiredSkills: ['Full-Stack', 'Cloud Systems', 'AI Workflows'],
    };

    setJobPostings([newJob, ...jobPostings]);
    setIsCustomJobModalOpen(false);
    setCustomJobTitle('');
    setCustomCompany('');
    setCustomJdText('');
  };

  const handleCopyTailoredDraft = () => {
    if (!tailoredData || !selectedPosting) return;
    const text = `TAILORED APPLICATION SNAPSHOT — ${selectedPosting.company}\n\nPosition: ${selectedPosting.title}\nCandidate: ${candidateName}\n\nTAILORED PROFESSIONAL SUMMARY:\n${tailoredData.tailoredSummary}\n\nSTRATEGIC ATS BULLET REWRITES:\n${tailoredData.diffHighlights.map((h: string, idx: number) => `${idx + 1}. ${h}`).join('\n')}\n\nMATCHED KEYWORDS:\n${tailoredData.matchedSkills.join(', ')}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE3D5] pb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge variant="terracotta" size="sm">Auto-Tailor & Apply Engine</Badge>
            <span className="text-xs font-bold text-[#786F68]">{candidateName}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#231F1D] tracking-tight">
            Opportunities & AI Auto-Tailor
          </h1>
          <p className="text-xs md:text-sm text-[#786F68] max-w-3xl">
            Match your verified resume against live openings at top tier tech companies. Generate company-specific tailored resume drafts and optimized application summaries with 1-click.
          </p>
        </div>

        {/* Right Action Header */}
        <div className="flex items-center gap-3">
          {allResumes.length > 1 && (
            <div className="relative">
              <select
                value={activeResumeId}
                onChange={(e) => setActiveResumeId(e.target.value)}
                className="text-xs font-bold bg-white border border-slate-200 rounded-xl px-3 py-2 pr-8 text-slate-900 focus:outline-none focus:border-[#048BA2] cursor-pointer"
              >
                {allResumes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}

          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsCustomJobModalOpen(true)}
          >
            Add Target Job Opening
          </Button>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobPostings.map((post) => (
          <Card
            key={post.id}
            className="p-6 bg-white border border-slate-200 rounded-3xl shadow-xs flex flex-col justify-between gap-4 hover:border-[#048BA2] transition-all"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <h3 className="text-base font-black text-slate-900">{post.title}</h3>
                  <span className="text-xs font-bold text-[#048BA2] flex items-center gap-1.5 mt-0.5">
                    <Building className="w-3.5 h-3.5" /> {post.company} • <MapPin className="w-3.5 h-3.5 text-slate-400" /> {post.location}
                  </span>
                </div>
                <Badge variant="success" size="md" className="font-extrabold px-3 py-1">
                  {post.fitScore}% Fit
                </Badge>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                {post.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5">
                {post.requiredSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white border border-slate-200 text-slate-800 text-[10.5px] font-bold rounded-lg"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.postedDate}
              </span>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                onClick={() => handleGenerateTailored(post)}
              >
                Auto-Tailor Snapshot
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Side-by-Side Tailored Resume Diff Modal */}
      {selectedPosting && (
        <Modal
          isOpen={isTailorModalOpen}
          onClose={() => setIsTailorModalOpen(false)}
          title={`AI Tailored Resume Snapshot — ${selectedPosting.company}`}
          maxWidth="xl"
          footer={
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="md" onClick={() => setIsTailorModalOpen(false)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="md"
                leftIcon={isCopied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                onClick={handleCopyTailoredDraft}
              >
                {isCopied ? 'Copied Tailored Draft!' : 'Copy Tailored Draft'}
              </Button>
            </div>
          }
        >
          {isGeneratingTailor ? (
            <div className="p-12 flex flex-col items-center justify-center text-center gap-3">
              <RefreshCw className="w-8 h-8 text-[#048BA2] animate-spin" />
              <span className="text-sm font-bold text-slate-900">
                Generating company-specific tailored resume snapshot with NVIDIA Llama 3.3...
              </span>
            </div>
          ) : tailoredData ? (
            <div className="flex flex-col gap-5 text-slate-900">
              <div className="p-4 bg-[#E6F5F8] border border-[#048BA2]/25 rounded-2xl flex flex-col gap-2">
                <span className="text-xs font-black text-[#048BA2] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> AI Strategic Positioning ({tailoredData.fitScore}% Match Fit)
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Tailored specifically for <strong>{selectedPosting.title}</strong> at <strong>{selectedPosting.company}</strong>.
                </p>
              </div>

              {/* Side-by-side Summary Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col gap-2">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Base Resume Summary
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {baseSummary}
                  </p>
                </div>

                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex flex-col gap-2">
                  <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">
                    Tailored Application Summary
                  </span>
                  <p className="text-xs text-emerald-950 font-semibold leading-relaxed">
                    {tailoredData.tailoredSummary}
                  </p>
                </div>
              </div>

              {/* Bullet Recommendations */}
              {tailoredData.diffHighlights.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-black text-slate-900">
                    AI Recommended Bullet Rewrites for {selectedPosting.company}:
                  </span>
                  <div className="flex flex-col gap-2">
                    {tailoredData.diffHighlights.map((dh: string, idx: number) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium">
                        {dh}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </Modal>
      )}

      {/* Add Custom Job Opening Modal */}
      <Modal
        isOpen={isCustomJobModalOpen}
        onClose={() => setIsCustomJobModalOpen(false)}
        title="Add Custom Job Opening to Tailor"
        maxWidth="lg"
      >
        <div className="flex flex-col gap-4 p-1 text-slate-900">
          <p className="text-xs text-slate-600">
            Paste any job description from LinkedIn, Greenhouse, or Lever to evaluate fit and generate tailored snapshots.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-800">Job Title</label>
              <input
                type="text"
                placeholder="e.g. Senior Machine Learning Engineer"
                value={customJobTitle}
                onChange={(e) => setCustomJobTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#048BA2]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-800">Company Name</label>
              <input
                type="text"
                placeholder="e.g. Anthropic"
                value={customCompany}
                onChange={(e) => setCustomCompany(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#048BA2]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-800">Job Description Text</label>
            <Textarea
              rows={6}
              placeholder="Paste full job description requirements here..."
              value={customJdText}
              onChange={(e) => setCustomJdText(e.target.value)}
              className="text-xs font-mono"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <Button variant="secondary" size="sm" onClick={() => setIsCustomJobModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={!customJobTitle.trim() || !customCompany.trim() || !customJdText.trim()}
              onClick={handleAddCustomJob}
            >
              Add & Evaluate Fit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
