'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Plus,
  Upload,
  Sparkles,
  Bot,
  ShieldCheck,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Clock,
  Layout,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { TemplateId } from '@/components/builder/ResumeTemplates';

export default function DashboardPage() {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('modern_executive');

  const [resumes, setResumes] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/resumes')
      .then((res) => res.json())
      .then((data) => {
        if (data.resumes && data.resumes.length > 0) {
          setResumes(data.resumes);
        } else {
          setResumes([
            {
              id: 'demo-resume-alex-1',
              title: 'Alex Rivera — Staff AI Engineer & Systems Architect',
              updatedAt: 'Recently updated',
              atsScore: 99,
              trustScore: 98,
              isActive: true,
              template: 'Executive Two-Column',
            },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  const handleCreateResume = () => {
    if (!newResumeTitle.trim()) return;
    const newId = `resume-${Date.now()}`;
    const newRes = {
      id: newId,
      title: newResumeTitle,
      updatedAt: 'Just now',
      atsScore: 90,
      trustScore: 85,
      isActive: false,
      template: selectedTemplate,
    };
    setResumes([newRes, ...resumes]);
    setIsCreateModalOpen(false);
    setNewResumeTitle('');
    router.push(`/builder/${newId}`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE3D5] pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Candidate Dashboard</h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Manage your ATS resumes, select templates, living candidate agent, trust claims, and job applications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/import-resume">
            <Button variant="secondary" size="md" leftIcon={<Upload className="w-4 h-4 text-[#048BA2]" />}>
              Upload Old Resume (ATS Audit)
            </Button>
          </Link>
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create New Resume
          </Button>
        </div>
      </div>

      {/* Analytics Summary Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="flex items-center justify-between p-5 bg-white border border-slate-200 shadow-2xs">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Resumes</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1">{resumes.length} Saved</span>
            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> Ready for ATS applications
            </span>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#E6F5F8] text-[#048BA2] flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-5 bg-white border border-slate-200 shadow-2xs">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average ATS Score</span>
            <span className="text-2xl font-extrabold text-emerald-700 mt-1">94 / 100</span>
            <span className="text-[11px] text-slate-500 font-semibold mt-1">Top 5% candidate tier</span>
          </div>
          <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-5 bg-white border border-slate-200 shadow-2xs">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Claim Trust Score</span>
            <span className="text-2xl font-extrabold text-[#048BA2] mt-1">96% Verified</span>
            <span className="text-[11px] text-slate-500 font-semibold mt-1">4 verified claims on GitHub</span>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#E6F5F8] text-[#048BA2] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-5 bg-white border border-slate-200 shadow-2xs">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Templates</span>
            <span className="text-2xl font-extrabold text-[#048BA2] mt-1">32+ Designs</span>
            <span className="text-[11px] text-[#048BA2] font-semibold mt-1">100% ATS Printable</span>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#E6F5F8] text-[#048BA2] flex items-center justify-center font-bold">
            <Layout className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Upload Old Resume Banner */}
      <Card className="p-6 bg-white border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#E6F5F8] text-[#048BA2] flex items-center justify-center shrink-0 border border-[#048BA2]/30">
            <Upload className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-slate-900">Have an existing or old resume?</span>
              <Badge variant="aurora" size="sm">Instant ATS Audit</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
              Upload your PDF/DOCX or paste raw text to check your ATS compatibility score, get AI action verb enhancements, and automatically populate your Living Candidate RAG Agent & Skill Graph.
            </p>
          </div>
        </div>

        <Link href="/import-resume">
          <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Upload Old Resume
          </Button>
        </Link>
      </Card>

      {/* Saved Resumes List */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">Your Resumes & Candidate Agents</h2>
          <span className="text-xs font-semibold text-slate-500">Sorted by last updated</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumes.map((res) => (
            <Card key={res.id} hoverEffect className="flex flex-col justify-between p-6 bg-white border border-slate-200 shadow-xs relative group">
              {res.isActive && (
                <div className="absolute top-4 right-4">
                  <Badge variant="aurora" size="sm">Active Primary</Badge>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E6F5F8] text-[#048BA2] flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#048BA2] transition-colors">
                      {res.title}
                    </h3>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> Updated {res.updatedAt} • <span className="font-semibold text-[#048BA2]">{res.template}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 mt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-500">ATS Score</span>
                    <span className="text-lg font-extrabold text-emerald-700">{res.atsScore} / 100</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Trust Verification</span>
                    <span className="text-lg font-extrabold text-[#048BA2]">{res.trustScore}% Verified</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for this Resume */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Link href={`/builder/${res.id}`}>
                    <Button variant="primary" size="sm">Edit Builder</Button>
                  </Link>
                  <Link href={`/analyzer/${res.id}`}>
                    <Button variant="secondary" size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#048BA2]" />}>
                      ATS Audit
                    </Button>
                  </Link>
                </div>

                <Link href={`/agent/${res.id}`}>
                  <Button variant="tertiary" size="sm" leftIcon={<Bot className="w-3.5 h-3.5 text-[#048BA2]" />}>
                    Chat Agent
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Create New Resume Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Resume"
        maxWidth="lg"
        footer={
          <Button variant="primary" size="md" onClick={handleCreateResume} disabled={!newResumeTitle.trim()}>
            Start Building Resume
          </Button>
        }
      >
        <div className="flex flex-col gap-5">
          <Input
            label="Resume Title / Position Target"
            placeholder="e.g. John Snow — Senior AI Engineer"
            value={newResumeTitle}
            onChange={(e) => setNewResumeTitle(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-900">Select Starting Resume Design Template:</label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setSelectedTemplate('modern_executive')}
                className={`p-3 bg-slate-50 rounded-xl border cursor-pointer transition-all flex flex-col gap-1 ${
                  selectedTemplate === 'modern_executive' ? 'border-[#048BA2] ring-2 ring-[#048BA2]/20 bg-[#E6F5F8]' : 'border-slate-200'
                }`}
              >
                <span className="text-xs font-bold text-slate-900">Modern Executive</span>
                <span className="text-[11px] text-slate-500">Cyan accent bar, structured card entries.</span>
              </div>

              <div
                onClick={() => setSelectedTemplate('classic_ats')}
                className={`p-3 bg-slate-50 rounded-xl border cursor-pointer transition-all flex flex-col gap-1 ${
                  selectedTemplate === 'classic_ats' ? 'border-[#048BA2] ring-2 ring-[#048BA2]/20 bg-[#E6F5F8]' : 'border-slate-200'
                }`}
              >
                <span className="text-xs font-bold text-slate-900">Classic ATS Standard</span>
                <span className="text-[11px] text-slate-500">Traditional single-column layout with clean headers.</span>
              </div>

              <div
                onClick={() => setSelectedTemplate('minimalist_tech')}
                className={`p-3 bg-slate-50 rounded-xl border cursor-pointer transition-all flex flex-col gap-1 ${
                  selectedTemplate === 'minimalist_tech' ? 'border-[#048BA2] ring-2 ring-[#048BA2]/20 bg-[#E6F5F8]' : 'border-slate-200'
                }`}
              >
                <span className="text-xs font-bold text-slate-900">Minimalist Tech</span>
                <span className="text-[11px] text-slate-500">Monospace compact headers, ideal for devs.</span>
              </div>

              <div
                onClick={() => setSelectedTemplate('navy_sidebar')}
                className={`p-3 bg-slate-50 rounded-xl border cursor-pointer transition-all flex flex-col gap-1 ${
                  selectedTemplate === 'navy_sidebar' ? 'border-[#048BA2] ring-2 ring-[#048BA2]/20 bg-[#E6F5F8]' : 'border-slate-200'
                }`}
              >
                <span className="text-xs font-bold text-slate-900">Midnight Navy Sidebar</span>
                <span className="text-[11px] text-slate-500">Dark blue left sidebar for contacts & skills.</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
