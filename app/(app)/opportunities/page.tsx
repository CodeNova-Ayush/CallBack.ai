'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge, ProgressRing } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';

export default function OpportunitiesPage() {
  const [selectedPosting, setSelectedPosting] = useState<any>(null);
  const [isDiffModalOpen, setIsDiffModalOpen] = useState(false);

  const postings = [
    {
      id: 'job-1',
      title: 'Senior AI Application Engineer',
      company: 'Vercel Labs',
      location: 'San Francisco, CA (Hybrid)',
      fitScore: 96,
      postedDate: '1 day ago',
      description: 'Building developer workflows with Next.js 14, PgVector, and Anthropic Claude APIs.',
      tailoredSummary: 'Senior Full-Stack AI Engineer with 4+ years specializing in Next.js 14, PgVector, and Anthropic API orchestration. Proven track record reducing API latency by 45% on high-throughput platforms.',
      diffHighlights: [
        'Summary: Emphasized Next.js 14 & Anthropic Claude API experience explicitly.',
        'Skills Section: Moved PgVector & Vector Search to top priority.',
        'Bullets: Expanded RAG query latency metrics to match Vercel API standards.',
      ],
    },
    {
      id: 'job-2',
      title: 'Full-Stack Platform Engineer',
      company: 'Linear Inc.',
      location: 'Remote',
      fitScore: 92,
      postedDate: '3 days ago',
      description: 'Craft-obsessed engineering on real-time sync engines, React UIs, and high-performance Postgres backends.',
      tailoredSummary: 'Full-Stack Engineer with deep experience crafting high-performance React UIs, real-time sync architectures, and complex PostgreSQL query optimizations.',
      diffHighlights: [
        'Summary: Refocused on real-time React UI performance & SQL tuning.',
        'Skills Section: Highlighted PostgreSQL & TypeScript upfront.',
      ],
    },
  ];

  const handleGenerateTailored = (posting: any) => {
    setSelectedPosting(posting);
    setIsDiffModalOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm">Auto-Apply Engine v1.0</Badge>
            <span className="text-xs text-gray-500 font-medium">Alex Rivera</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Opportunities & Fit Scoring</h1>
        </div>
      </div>

      {/* Postings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {postings.map((post) => (
          <Card key={post.id} className="p-6 bg-white border border-gray-200/90 shadow-xs flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
                <span className="text-xs text-[#4F46E5] font-semibold flex items-center gap-1.5 mt-0.5">
                  <Building className="w-3.5 h-3.5" /> {post.company} • <MapPin className="w-3.5 h-3.5 text-gray-400" /> {post.location}
                </span>
              </div>
              <Badge variant="success">{post.fitScore}% Fit</Badge>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
              {post.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-[11px] text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Posted {post.postedDate}
              </span>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                onClick={() => handleGenerateTailored(post)}
              >
                Generate Tailored Resume Snapshot
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Side-by-Side Diff View Modal */}
      {selectedPosting && (
        <Modal
          isOpen={isDiffModalOpen}
          onClose={() => setIsDiffModalOpen(false)}
          title={`Tailored Resume Snapshot — ${selectedPosting.company}`}
          maxWidth="xl"
          footer={
            <Button variant="primary" size="md" onClick={() => setIsDiffModalOpen(false)}>
              Save Tailored Draft Snapshot
            </Button>
          }
        >
          <div className="flex flex-col gap-6">
            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl flex flex-col gap-2">
              <span className="text-xs font-bold text-[#4F46E5] flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> AI Tailoring Modifications Breakdown:
              </span>
              <ul className="list-disc list-inside text-xs text-indigo-950 flex flex-col gap-1">
                {selectedPosting.diffHighlights.map((dh: string, idx: number) => (
                  <li key={idx}>{dh}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase">Base Resume Summary</span>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Passionate Full-Stack AI Engineer with 4+ years of experience architecting high-throughput distributed systems, vector search pipelines, and intuitive React web applications.
                </p>
              </div>

              <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl flex flex-col gap-2">
                <span className="text-xs font-bold text-emerald-700 uppercase">Tailored Snapshot Summary</span>
                <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                  {selectedPosting.tailoredSummary}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
