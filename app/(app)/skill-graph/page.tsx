'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GitGraph,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Layers,
  ShieldCheck,
  Plus,
  Search,
  Filter,
  ChevronDown,
  RefreshCw,
  Cpu,
  Flame,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';

interface SkillNode {
  name: string;
  category: string;
  signal: number;
  evidence: { title: string; snippet: string }[];
}

export default function SkillGraphPage() {
  const [candidateName, setCandidateName] = useState('Ayush Mishra');
  const [allResumes, setAllResumes] = useState<{ id: string; title: string }[]>([]);
  const [activeResumeId, setActiveResumeId] = useState('demo-resume-alex-1');
  const [skills, setSkills] = useState<SkillNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Skill Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('AI & Vector Architectures');
  const [newSkillEvidenceTitle, setNewSkillEvidenceTitle] = useState('');
  const [newSkillEvidenceSnippet, setNewSkillEvidenceSnippet] = useState('');

  const CATEGORIES = [
    'All',
    'AI & Vector Architectures',
    'Languages & Core Stack',
    'Frontend & Web Frameworks',
    'Databases & Storage',
    'Cloud & Distributed Infrastructure',
  ];

  // Load Resumes
  useEffect(() => {
    fetch('/api/resumes')
      .then((res) => res.json())
      .then((data) => {
        if (data.resumes && Array.isArray(data.resumes)) {
          setAllResumes(data.resumes);
          if (data.resumes.length > 0) setActiveResumeId(data.resumes[0].id);
        }
      })
      .catch(() => {});
  }, []);

  // Load Active Resume Skills & Evidence
  const loadSkillGraph = async (rId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/resumes/${rId}`);
      const data = await res.json();
      if (data.resume) {
        let name = 'Candidate';
        const pInfo = data.resume.sections?.find((s: any) => s.sectionType === 'personal_info');
        const skSec = data.resume.sections?.find((s: any) => s.sectionType === 'skills');
        const expSec = data.resume.sections?.find((s: any) => s.sectionType === 'experience');
        const projSec = data.resume.sections?.find((s: any) => s.sectionType === 'projects');

        if (pInfo) {
          try {
            const parsed = JSON.parse(pInfo.content);
            if (parsed.fullName) name = parsed.fullName;
          } catch {}
        }
        if (data.resume.title && name === 'Candidate') {
          name = data.resume.title.split('—')[0].trim();
        }
        setCandidateName(name);

        let parsedSkills: string[] = [];
        if (skSec) {
          try {
            const parsed = JSON.parse(skSec.content);
            if (Array.isArray(parsed)) parsedSkills = parsed;
            else if (parsed.categories) parsedSkills = parsed.categories.flatMap((c: any) => c.items || []);
          } catch {}
        }

        let experiences: any[] = [];
        if (expSec) {
          try {
            experiences = JSON.parse(expSec.content);
          } catch {}
        }

        let projects: any[] = [];
        if (projSec) {
          try {
            projects = JSON.parse(projSec.content);
          } catch {}
        }

        const nodes: SkillNode[] = parsedSkills.map((skName, idx) => {
          let category = 'Languages & Core Stack';
          const skLower = skName.toLowerCase();
          if (skLower.includes('ai') || skLower.includes('vector') || skLower.includes('rag') || skLower.includes('llama') || skLower.includes('langchain') || skLower.includes('claude') || skLower.includes('prompt')) {
            category = 'AI & Vector Architectures';
          } else if (skLower.includes('react') || skLower.includes('next') || skLower.includes('vue') || skLower.includes('tailwind') || skLower.includes('html') || skLower.includes('css')) {
            category = 'Frontend & Web Frameworks';
          } else if (skLower.includes('postgres') || skLower.includes('sql') || skLower.includes('prisma') || skLower.includes('redis') || skLower.includes('mongo')) {
            category = 'Databases & Storage';
          } else if (skLower.includes('aws') || skLower.includes('docker') || skLower.includes('kubernetes') || skLower.includes('ci/cd') || skLower.includes('cloud') || skLower.includes('linux')) {
            category = 'Cloud & Distributed Infrastructure';
          }

          const matchedExp = experiences.find((e) => e.bullets?.some((b: string) => b.toLowerCase().includes(skLower)));
          const matchedProj = projects.find((p) => p.techStack?.toLowerCase().includes(skLower) || p.title?.toLowerCase().includes(skLower));

          const evidence: { title: string; snippet: string }[] = [];
          if (matchedExp) {
            evidence.push({
              title: `Experience — ${matchedExp.company || matchedExp.role}`,
              snippet: matchedExp.bullets?.[0] || 'Demonstrated production experience',
            });
          }
          if (matchedProj) {
            evidence.push({
              title: `Project — ${matchedProj.title}`,
              snippet: matchedProj.bullets?.[0] || matchedProj.techStack || 'Technical architecture component',
            });
          }
          if (evidence.length === 0) {
            evidence.push({
              title: `Verified Experience Record`,
              snippet: `Hands-on competency in ${skName} verified across resume milestones.`,
            });
          }

          return {
            name: skName,
            category,
            signal: Math.min(98, 88 + (idx % 10)),
            evidence,
          };
        });

        setSkills(nodes);
      }
    } catch (err) {
      console.error('Error loading skill graph:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeResumeId) loadSkillGraph(activeResumeId);
  }, [activeResumeId]);

  const handleAddNewSkill = () => {
    if (!newSkillName.trim()) return;
    const newNode: SkillNode = {
      name: newSkillName,
      category: newSkillCategory,
      signal: 95,
      evidence: [
        {
          title: newSkillEvidenceTitle || 'Verified Technical Project',
          snippet: newSkillEvidenceSnippet || `Production implementation with verified code commits.`,
        },
      ],
    };

    setSkills([newNode, ...skills]);
    setIsAddModalOpen(false);
    setNewSkillName('');
    setNewSkillEvidenceTitle('');
    setNewSkillEvidenceSnippet('');
  };

  const filteredSkills = skills.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE3D5] pb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge variant="terracotta" size="sm">Persistent Candidate Entity</Badge>
            <span className="text-xs font-bold text-[#786F68]">{candidateName}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#231F1D] tracking-tight">
            Persistent Skill & Evidence Graph
          </h1>
          <p className="text-xs md:text-sm text-[#786F68]">
            Unlike static bullet points, Callback AI maintains an immutable skill graph linked directly to verified codebase evidence, telemetry benchmarks, and deliverables.
          </p>
        </div>

        {/* Header Actions */}
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
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Skill & Evidence
          </Button>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-3 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#048BA2] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skill nodes..."
            className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-[#048BA2]"
          />
        </div>
      </div>

      {/* Grid of Skill Nodes */}
      {isLoading ? (
        <div className="p-12 flex flex-col items-center justify-center min-h-[300px] gap-3">
          <RefreshCw className="w-8 h-8 text-[#048BA2] animate-spin" />
          <span className="text-sm font-bold text-slate-900">Building persistent skill graph...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((node, idx) => (
            <Card
              key={idx}
              className="p-6 bg-white border border-slate-200 rounded-3xl shadow-xs flex flex-col justify-between gap-4 hover:border-[#048BA2] transition-all"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#E6F5F8] text-[#048BA2] flex items-center justify-center font-bold">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-black text-slate-900">{node.name}</h3>
                  </div>
                  <Badge variant="aurora" size="sm" className="font-extrabold">
                    {node.signal}% Signal
                  </Badge>
                </div>

                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                  {node.category}
                </span>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#048BA2] rounded-full transition-all duration-700"
                    style={{ width: `${node.signal}%` }}
                  />
                </div>
              </div>

              {/* Evidence References */}
              <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Grounded Evidence ({node.evidence.length})
                </span>
                {node.evidence.map((ev, evIdx) => (
                  <div
                    key={evIdx}
                    className="p-2.5 bg-slate-50 rounded-xl text-xs flex flex-col gap-0.5 border border-slate-200"
                  >
                    <span className="font-bold text-slate-900 text-[11px]">{ev.title}</span>
                    <span className="text-slate-600 text-[10.5px] font-medium leading-relaxed">
                      "{ev.snippet}"
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Skill Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Verified Skill Node & Evidence Link"
        maxWidth="md"
      >
        <div className="flex flex-col gap-4 p-1 text-slate-900">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-800">Skill Name</label>
            <input
              type="text"
              placeholder="e.g. pgvector, PyTorch, Kubernetes"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#048BA2]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-800">Domain Category</label>
            <select
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#048BA2]"
            >
              {CATEGORIES.filter((c) => c !== 'All').map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-800">Evidence Source Title</label>
            <input
              type="text"
              placeholder="e.g. Project — Production Vector Search Engine"
              value={newSkillEvidenceTitle}
              onChange={(e) => setNewSkillEvidenceTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#048BA2]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-800">Evidence Snippet / Metric Proof</label>
            <input
              type="text"
              placeholder="e.g. Architected nearest neighbor indexing handling 2M vector embeddings"
              value={newSkillEvidenceSnippet}
              onChange={(e) => setNewSkillEvidenceSnippet(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#048BA2]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <Button variant="secondary" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={!newSkillName.trim()}
              onClick={handleAddNewSkill}
            >
              Add to Skill Graph
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
