'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ArrowRight,
  TrendingUp,
  Award,
  Check,
  Zap,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge, ProgressRing } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';

export default function AnalyzerPage(props: { params: Promise<{ resumeId: string }> }) {
  const params = use(props.params);
  const resumeId = params.resumeId || 'demo-resume-alex-1';

  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [appliedFixes, setAppliedFixes] = useState<number[]>([]);

  useEffect(() => {
    fetch(`/api/resumes/${resumeId}/analyze`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        setAnalysis(data.analysis);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Analysis fetch error:', err);
        setLoading(false);
      });
  }, [resumeId]);

  if (loading || !analysis) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <RefreshCw className="w-8 h-8 text-[#4F46E5] animate-spin" />
        <span className="text-sm font-semibold text-gray-700">Evaluating ATS parser compatibility & grammar...</span>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'ATS Score & Overview' },
    { id: 'rubric', label: 'Scoring Rubric Breakdown' },
    { id: 'grammar', label: 'Grammar & Formatting Fixes', count: analysis.grammarIssues.length },
  ];

  const handleApplyGrammarFix = (idx: number) => {
    setAppliedFixes([...appliedFixes, idx]);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm">ATS Engine v3.4</Badge>
            <span className="text-xs text-gray-500 font-medium">
              {analysis.candidateName || 'Candidate Profile'} {analysis.candidateTitle ? `— ${analysis.candidateTitle}` : ''}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">ATS Resume Analyzer & Audit</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/builder/${resumeId}`}>
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open in Resume Builder
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="underline" />

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Score Card */}
          <Card className="flex flex-col items-center justify-center p-8 bg-white border border-gray-200/90 shadow-xs text-center gap-4">
            <ProgressRing score={analysis.atsScore} size={150} strokeWidth={11} label="Overall ATS Compatibility" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-gray-900">Ranked Top 5% Candidates</span>
              <p className="text-xs text-gray-500 max-w-xs">
                Your resume uses standard section headers and quantified impact metrics that pass top enterprise ATS systems (Workday, Greenhouse, Lever).
              </p>
            </div>
          </Card>

          {/* Sub-Metrics & Flags */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-4 flex flex-col gap-1 bg-white">
                <span className="text-[11px] font-bold uppercase text-gray-400">Readability Score</span>
                <span className="text-2xl font-extrabold text-gray-900">{analysis.readabilityScore} / 100</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Easy reading grade</span>
              </Card>

              <Card className="p-4 flex flex-col gap-1 bg-white">
                <span className="text-[11px] font-bold uppercase text-gray-400">Strength Index</span>
                <span className="text-2xl font-extrabold text-indigo-600">{analysis.overallStrengthScore} / 100</span>
                <span className="text-[10px] text-indigo-600 font-semibold">High impact density</span>
              </Card>

              <Card className="p-4 flex flex-col gap-1 bg-white">
                <span className="text-[11px] font-bold uppercase text-gray-400">Section Health</span>
                <span className="text-2xl font-extrabold text-emerald-600">5 / 5 Core</span>
                <span className="text-[10px] text-emerald-600 font-semibold">All required present</span>
              </Card>
            </div>

            {/* Formatting & Warnings */}
            <Card className="p-6 bg-white flex flex-col gap-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Formatting Warnings & Missing Sections
              </h3>
              <div className="flex flex-col gap-2">
                {analysis.formattingIssues.map((issue: string, idx: number) => (
                  <div key={idx} className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-lg text-xs text-amber-900 flex items-center justify-between">
                    <span>{issue}</span>
                    <Badge variant="warning" size="sm">Minor</Badge>
                  </div>
                ))}
                {analysis.missingSections.map((sec: string, idx: number) => (
                  <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 flex items-center justify-between">
                    <span>Optional Section Missing: {sec}</span>
                    <Badge variant="neutral" size="sm">Optional</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'rubric' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(analysis.scoringRubricBreakdown).map(([key, value]: [string, any]) => (
            <Card key={key} className="p-6 bg-white flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold capitalize text-gray-900">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <Badge variant="indigo" size="sm">Score: {value.score}/100 ({value.weight})</Badge>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                {value.notes}
              </p>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'grammar' && (
        <div className="flex flex-col gap-4">
          <div className="text-xs text-gray-500">Review AI grammar & bullet point improvements:</div>
          {analysis.grammarIssues.map((issue: any, idx: number) => {
            const isApplied = appliedFixes.includes(idx);
            return (
              <Card key={idx} className="p-5 bg-white flex flex-col gap-3 border border-gray-200/90">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Grammar Suggestion #{idx + 1}</span>
                  {isApplied ? (
                    <Badge variant="success" icon={<Check className="w-3 h-3" />}>Applied to Builder</Badge>
                  ) : (
                    <Button variant="secondary" size="sm" onClick={() => handleApplyGrammarFix(idx)}>
                      Apply Fix
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-red-50/60 border border-red-100 rounded-lg text-red-950">
                    <span className="font-semibold block mb-1 text-red-700">Original Phrasing:</span>
                    "{issue.original}"
                  </div>
                  <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-lg text-emerald-950">
                    <span className="font-semibold block mb-1 text-emerald-700">Suggested Action Phrasing:</span>
                    "{issue.suggestion}"
                  </div>
                </div>

                <span className="text-[11px] text-gray-500 italic">Reason: {issue.reason}</span>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
