'use client';

import React, { useState, use } from 'react';
import {
  Target,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Search,
  FileText,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Card, Badge, ProgressRing } from '@/components/ui/Card';

export default function JDMatchPage(props: { params: Promise<{ resumeId: string }> }) {
  const params = use(props.params);
  const resumeId = params.resumeId || 'demo-resume-alex-1';

  const [jdText, setJdText] = useState(`Role: Senior AI Engineer at Vercel Labs
Requirements:
- 3+ years of professional full-stack development experience using Next.js, React, and TypeScript.
- Hands-on expertise building production RAG applications with PgVector or vector databases.
- Experience with LLM prompt engineering, evaluation frameworks, and latency optimization.
- Familiarity with Cloud infrastructure (AWS/Docker) and CI/CD pipelines.`);

  const [matchResult, setMatchResult] = useState<any>({
    matchPercentage: 94,
    missingKeywords: ['Docker (in Experience header)', 'AWS Lambda'],
    skillGaps: ['AWS Lambda microservices'],
    experienceGaps: ['No explicit multi-cloud migration experience stated.'],
    recommendations: [
      'Mention Docker containerization experience directly inside the Aether Cloud project bullets.',
      'Add a dedicated sub-bullet emphasizing your AWS Certified Solutions Architect credential.',
      'Quantify API throughput in the summary section to align with senior job postings.',
    ],
    parsedRequirements: {
      requiredSkills: ['NEXT.JS', 'TYPESCRIPT', 'REACT', 'PGVECTOR', 'RAG', 'LLM PROMPTING'],
      preferredSkills: ['AWS', 'DOCKER', 'CI/CD'],
      minYearsExperience: 3,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleRunMatch = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId, jdText }),
      });
      const data = await res.json();
      if (data.match) setMatchResult(data.match);
    } catch (err) {
      console.error('Match error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Job Description Matcher</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Compare Ayush Mishra's resume against target position requirements to surface keyword & skill gaps.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Job Description Input */}
        <Card className="p-6 bg-white flex flex-col gap-4 border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#4F46E5]" /> Paste Target Job Description
            </h2>
            <Badge variant="indigo" size="sm">Vercel Labs — Sr AI Engineer</Badge>
          </div>

          <Textarea
            rows={12}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste target job posting or requirements here..."
          />

          <Button
            variant="primary"
            size="md"
            isLoading={isLoading}
            onClick={handleRunMatch}
            leftIcon={<Target className="w-4 h-4" />}
          >
            Calculate Match Percentage
          </Button>
        </Card>

        {/* Right Column: Match Output Results */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 bg-white flex items-center justify-around border border-gray-200/90 shadow-xs">
            <ProgressRing score={matchResult.matchPercentage} size={130} label="Target Job Fit Score" />
            <div className="flex flex-col gap-2 max-w-xs">
              <Badge variant="success" className="w-fit">Strong Fit Candidate</Badge>
              <span className="text-xs text-gray-600 leading-relaxed">
                Matches 6 out of 6 core required skills including Next.js, PgVector, and Claude Sonnet RAG orchestration.
              </span>
            </div>
          </Card>

          {/* Missing Keywords & Gaps */}
          <Card className="p-6 bg-white flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" /> Missing Keywords & Skill Gaps
            </h3>
            <div className="flex flex-wrap gap-2">
              {matchResult.missingKeywords.map((kw: string, idx: number) => (
                <span key={idx} className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded-lg">
                  + {kw}
                </span>
              ))}
            </div>
          </Card>

          {/* Action Recommendations */}
          <Card className="p-6 bg-white flex flex-col gap-3">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4F46E5]" /> Actionable Tailoring Recommendations
            </h3>
            <div className="flex flex-col gap-2">
              {matchResult.recommendations.map((rec: string, idx: number) => (
                <div key={idx} className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-lg text-xs text-indigo-950 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
