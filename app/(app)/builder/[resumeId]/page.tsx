'use client';

import React, { useState, use } from 'react';
import {
  FileText,
  GripVertical,
  Plus,
  Trash2,
  Sparkles,
  Download,
  ZoomIn,
  ZoomOut,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  Layout,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Card, Badge } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { ResumeTemplateRenderer, TemplateId, ResumeData } from '@/components/builder/ResumeTemplates';

const DEMO_DATA: ResumeData = {
  personalInfo: {
    fullName: 'ALEX RIVERA',
    email: 'alex.rivera@neuralflow.ai',
    phone: '+1 (555) 439-8821',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexrivera-ai',
    github: 'github.com/alexrivera',
    summary:
      'Staff Software Engineer and Systems Architect with 6+ years of experience engineering high-throughput distributed infrastructure, low-latency LLM inference pipelines, and enterprise-grade full-stack platforms. Founder of SynthBase (YC W24, acquired) and core contributor to open-source agent frameworks. Proven track record scaling microservices to 10M+ daily active requests with 99.99% uptime, cutting p99 query latencies by 60%, and orchestrating multi-region cloud deployments on AWS and GCP. Passionate about autonomous agents, vector indexing, and developer tooling.',
  },
  experiences: [
    {
      id: 'exp-1',
      role: 'Founding Staff AI Engineer',
      company: 'NeuralFlow Systems (AI Agents & RAG Infra)',
      location: 'San Francisco, CA',
      startDate: 'Jun 2024',
      endDate: 'Present',
      bullets: [
        'Architected asynchronous distributed task-queue engine handling 120k peak req/sec at sub-45ms p95 latency.',
        'Engineered custom semantic cache & hybrid vector retrieval pipeline, reducing LLM API token spend by 48%.',
        'Designed multi-tenant access control and end-to-end telemetry streaming across Kubernetes clusters.',
        'Led technical strategy and mentored an engineering team of 8 full-stack and ML infrastructure developers.',
      ],
    },
    {
      id: 'exp-2',
      role: 'Senior Full-Stack Engineer',
      company: 'Stripe (Core Billing & Payment Routing)',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'May 2024',
      bullets: [
        'Led frontend and backend architecture for next-gen adaptive payment flow using React, TypeScript, and Go.',
        'Optimized PostgreSQL shard indexing strategies, cutting complex ledger reconciliation runtimes from 8.4s to 320ms.',
        'Instituted automated canary deployment workflows and integration testing suites, achieving zero-downtime releases.',
      ],
    },
    {
      id: 'exp-3',
      role: 'Full Stack Engineering Intern',
      company: 'Vercel (Developer Experience & Edge)',
      location: 'Remote',
      startDate: 'May 2021',
      endDate: 'Dec 2021',
      bullets: [
        'Built Next.js edge runtime middleware extensions and analytics dashboard for enterprise team tiers.',
        'Implemented incremental static regeneration (ISR) stress testing harnesses and automated regression monitors.',
        'Collaborated directly with framework core team to optimize Cold Start latency by 35%.',
      ],
    },
    {
      id: 'exp-4',
      role: 'Lead Architect & Hackathon Winner',
      company: 'ApexAgent – Global AI Hackathon Champion',
      location: 'San Francisco, CA',
      startDate: 'Oct 2023',
      endDate: 'Oct 2023',
      bullets: [
        'Spearheaded architecture of autonomous reasoning pipeline utilizing LangChain, Next.js 14, and PgVector.',
        'Won 1st Place Grand Prize among 1,200+ international engineering teams.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'M.S. in Computer Science (AI & Systems)',
      institution: 'Stanford University',
      location: 'Stanford, CA',
      startDate: '2020',
      endDate: '2022',
      gpa: '3.92 / 4.0',
    },
    {
      id: 'edu-2',
      degree: 'B.S. in Electrical Engineering & Computer Science (EECS)',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2016',
      endDate: '2020',
      gpa: '3.88 / 4.0',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'SynthBase — Multi-Agent Developer Infrastructure',
      techStack: 'Next.js 15, TypeScript, Python, PgVector, Claude 3.5 Sonnet',
      link: 'github.com/alexrivera/synthbase',
      bullets: [
        'Built autonomous agent evaluation workspace processing 500k monthly LLM runs with real-time telemetry.',
        'Acquired by enterprise AI analytics group in 2025; starred by 8.5k developers on GitHub.',
      ],
    },
  ],
  skills: [
    'TypeScript',
    'Python',
    'Go',
    'Rust',
    'C++',
    'JavaScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'PgVector',
    'Redis',
    'AWS',
    'GCP',
    'Docker',
    'Kubernetes',
    'Terraform',
    'Git',
    'LLM Orchestration',
    'Multi-Agent Systems',
    'RAG Pipelines',
  ],
};

const EMPTY_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  experiences: [],
  education: [],
  projects: [],
  skills: [],
};

export default function BuilderPage(props: { params: Promise<{ resumeId: string }> }) {
  const params = use(props.params);
  const resumeId = params.resumeId || 'demo-resume-alex-1';
  const isDemoResume = resumeId === 'demo-resume-alex-1';

  // Start with default data if demo resume
  const initialData = isDemoResume ? DEMO_DATA : EMPTY_DATA;

  const [activeSection, setActiveSection] = useState<string>('personal_info');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('classic_ats');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);

  // Resume State
  const [personalInfo, setPersonalInfo] = useState(initialData.personalInfo);
  const [experiences, setExperiences] = useState(initialData.experiences);
  const [education, setEducation] = useState(initialData.education);
  const [projects, setProjects] = useState(initialData.projects);
  const [skills, setSkills] = useState<string[]>(initialData.skills);
  const [newSkillInput, setNewSkillInput] = useState('');

  const sectionsList = [
    { id: 'personal_info', title: 'Personal Information', icon: User },
    { id: 'experience', title: 'Work Experience', icon: Briefcase, count: experiences.length },
    { id: 'projects', title: 'Projects & Work', icon: FolderGit2, count: projects.length },
    { id: 'education', title: 'Education', icon: GraduationCap, count: education.length },
    { id: 'skills', title: 'Skills & Tech Stack', icon: Wrench, count: skills.length },
  ];

  const handleClearData = () => {
    setPersonalInfo(EMPTY_DATA.personalInfo);
    setExperiences([]);
    setEducation([]);
    setProjects([]);
    setSkills([]);
  };

  const handleLoadDemo = () => {
    setPersonalInfo(DEMO_DATA.personalInfo);
    setExperiences(DEMO_DATA.experiences);
    setEducation(DEMO_DATA.education);
    setProjects(DEMO_DATA.projects);
    setSkills(DEMO_DATA.skills);
  };

  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    setSkills([...skills, newSkillInput.trim()]);
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Inline AI Bullet Enhancer
  const handleEnhanceBullet = async (expId: string, bulletIdx: number, originalText: string) => {
    setIsEnhancing(`${expId}-${bulletIdx}`);
    try {
      const res = await fetch('/api/ai/enhance-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalBullet: originalText }),
      });
      const data = await res.json();
      if (data.enhancedBullet) {
        setExperiences((prev) =>
          prev.map((e) => {
            if (e.id === expId) {
              const updatedBullets = [...e.bullets];
              updatedBullets[bulletIdx] = data.enhancedBullet;
              return { ...e, bullets: updatedBullets };
            }
            return e;
          })
        );
      }
    } catch (err) {
      console.error('Enhance failed:', err);
    } finally {
      setIsEnhancing(null);
    }
  };

  const handleDownloadLocalFile = (format: 'html' | 'txt' | 'json' = 'html') => {
    try {
      const candidateNameClean = personalInfo.fullName ? personalInfo.fullName.replace(/\s+/g, '_') : 'Resume';
      let fileContent = '';
      let mimeType = 'text/html;charset=utf-8';
      let extension = 'html';

      if (format === 'json') {
        fileContent = JSON.stringify(resumeData, null, 2);
        mimeType = 'application/json;charset=utf-8';
        extension = 'json';
      } else if (format === 'txt') {
        fileContent = `${personalInfo.fullName || 'Candidate Name'}
${[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' | ')}

SUMMARY:
${personalInfo.summary || ''}

WORK EXPERIENCE:
${experiences.map(e => `${e.role} at ${e.company} (${e.startDate} - ${e.endDate})\n${e.location}\n` + e.bullets.map(b => `  • ${b}`).join('\n')).join('\n\n')}

EDUCATION:
${education.map(ed => `${ed.degree} - ${ed.institution} (${ed.startDate} - ${ed.endDate}) ${ed.gpa ? `[GPA: ${ed.gpa}]` : ''}`).join('\n')}

PROJECTS:
${projects.map(p => `${p.title} (${p.techStack})\n` + p.bullets.map(b => `  • ${b}`).join('\n')).join('\n\n')}

SKILLS:
${skills.join(', ')}
`;
        mimeType = 'text/plain;charset=utf-8';
        extension = 'txt';
      } else {
        fileContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${personalInfo.fullName || 'Resume'} — Callback AI Export</title>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 40px; color: #111827; line-height: 1.6; }
    h1 { font-size: 26px; margin-bottom: 4px; color: #111827; text-transform: uppercase; }
    .contact { font-size: 13px; color: #4B5563; margin-bottom: 20px; border-bottom: 2px solid #111827; padding-bottom: 8px; }
    .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #111827; border-bottom: 1px solid #D1D5DB; margin-top: 20px; margin-bottom: 10px; padding-bottom: 4px; }
    .item-header { display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; }
    .item-sub { font-style: italic; font-size: 13px; color: #4B5563; margin-bottom: 6px; }
    ul { margin-top: 4px; padding-left: 20px; font-size: 13px; }
    li { margin-bottom: 4px; }
    .skills-list { font-size: 13px; }
  </style>
</head>
<body>
  <h1>${personalInfo.fullName || 'Candidate Name'}</h1>
  <div class="contact">
    ${[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' | ')}
  </div>
  ${personalInfo.summary ? `
    <div class="section-title">Professional Summary</div>
    <p style="font-size: 13px;">${personalInfo.summary}</p>
  ` : ''}
  ${experiences.length > 0 ? `
    <div class="section-title">Work Experience</div>
    ${experiences.map(e => `
      <div style="margin-bottom: 14px;">
        <div class="item-header"><span>${e.role} — ${e.company}</span><span>${e.startDate} – ${e.endDate}</span></div>
        <div class="item-sub">${e.location}</div>
        <ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
      </div>
    `).join('')}
  ` : ''}
  ${education.length > 0 ? `
    <div class="section-title">Education</div>
    ${education.map(ed => `
      <div style="margin-bottom: 10px;">
        <div class="item-header"><span>${ed.degree} — ${ed.institution}</span><span>${ed.startDate} – ${ed.endDate}</span></div>
        <div class="item-sub">${ed.location} ${ed.gpa ? `| GPA: ${ed.gpa}` : ''}</div>
      </div>
    `).join('')}
  ` : ''}
  ${projects.length > 0 ? `
    <div class="section-title">Projects</div>
    ${projects.map(p => `
      <div style="margin-bottom: 10px;">
        <div class="item-header"><span>${p.title}</span><span>${p.techStack}</span></div>
        <ul>${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
      </div>
    `).join('')}
  ` : ''}
  ${skills.length > 0 ? `
    <div class="section-title">Skills & Technologies</div>
    <div class="skills-list">${skills.join(' • ')}</div>
  ` : ''}
</body>
</html>`;
      }

      const fileName = `${candidateNameClean}_Resume.${extension}`;
      const blob = new Blob([fileContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download local file error:', err);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  const resumeData: ResumeData = {
    personalInfo,
    experiences,
    education,
    projects,
    skills,
  };

  const templatesGallery = [
    // 1-6: Executive & Fortune 500
    {
      id: 'classic_ats',
      name: 'Executive Two-Column Standard',
      tag: 'FORTUNE 500',
      ats: '99% ATS',
      desc: 'Clean two-column split with tabular dates, categorized skills, and verified achievements grid.',
      layout: 'two_column',
    },
    {
      id: 'modern_executive',
      name: 'Modern Executive Terracotta',
      tag: 'YC FOUNDER',
      ats: '98% ATS',
      desc: 'Warm terracotta accent border, executive summary backdrop, and structured leadership cards.',
      layout: 'terracotta_split',
    },
    {
      id: 'navy_sidebar',
      name: 'Midnight Slate Architecture',
      tag: 'STAFF / PRINCIPAL',
      ats: '98% ATS',
      desc: 'Deep slate navy headers, high-contrast subheadings, and dense system engineering layout.',
      layout: 'slate_two_column',
    },
    {
      id: 'navy_header',
      name: 'Horizon Deep Navy Horizon',
      tag: 'ENTERPRISE LEAD',
      ats: '97% ATS',
      desc: 'Top navy header banner with dual-column grid body and prominent technical credentials.',
      layout: 'top_banner',
    },
    {
      id: 'fortune500_single',
      name: 'Wall Street Single Column Standard',
      tag: 'WALL STREET',
      ats: '99% ATS',
      desc: 'Classic centered serif header with horizontal rules and maximum corporate parser compatibility.',
      layout: 'single_column',
    },
    {
      id: 'boardroom_serif',
      name: 'Boardroom Executive Serif',
      tag: 'BOARD & ADVISOR',
      ats: '98% ATS',
      desc: 'Refined serif typography with right-aligned tabular numerals and leadership highlights.',
      layout: 'single_column',
    },

    // 7-12: Tech & Systems Engineering
    {
      id: 'minimalist_tech',
      name: 'Developer Monospace Terminal',
      tag: 'TECH ARCHITECT',
      ats: '97% ATS',
      desc: 'Monospace terminal section tags, code syntax stack, and dense metrics formatting.',
      layout: 'monospace',
    },
    {
      id: 'soft_green_pill',
      name: 'Emerald Systems Engineering',
      tag: 'AI / CLOUD INFRA',
      ats: '97% ATS',
      desc: 'Nordic emerald headers, clean divider borders, and categorized domain competencies.',
      layout: 'emerald_split',
    },
    {
      id: 'cyber_terminal',
      name: 'Cyber Matrix Console',
      tag: 'SECURITY / DEV',
      ats: '96% ATS',
      desc: 'Deep dark slate console styling with bright emerald syntax highlights and terminal tags.',
      layout: 'monospace',
    },
    {
      id: 'cloud_architect',
      name: 'AWS & Cloud Architect Standard',
      tag: 'CLOUD / DEVOPS',
      ats: '98% ATS',
      desc: 'Sky blue accent geometry with structured infrastructure competencies and cloud metrics.',
      layout: 'two_column',
    },
    {
      id: 'rust_systems',
      name: 'Rust & Low-Latency Core',
      tag: 'SYSTEMS / RUST',
      ats: '97% ATS',
      desc: 'Copper orange accent borders with dense monospace code tags and performance metrics.',
      layout: 'left_accent',
    },
    {
      id: 'ai_researcher',
      name: 'DeepMind & OpenAI Research Paper',
      tag: 'AI / RESEARCH',
      ats: '98% ATS',
      desc: 'Scholarly preprint typography with abstract summary box and publication pedigree.',
      layout: 'two_column',
    },

    // 13-18: YC Startups & High Growth
    {
      id: 'yellow_creative',
      name: 'Amber Growth & Product Architect',
      tag: 'PRODUCT / GROWTH',
      ats: '96% ATS',
      desc: 'Warm amber section dividers and structured dual-column matrix for product innovators.',
      layout: 'amber_split',
    },
    {
      id: 'yc_founder_pitch',
      name: 'YC Founder Fast-Track',
      tag: 'STARTUP FOUNDER',
      ats: '98% ATS',
      desc: 'Punchy orange accents, prominent fundraising and traction milestones, and high-signal metrics.',
      layout: 'left_accent',
    },
    {
      id: 'stealth_scale',
      name: 'Silicon Valley Stealth Seed',
      tag: 'EARLY STAGE',
      ats: '97% ATS',
      desc: 'Deep violet accent banners with clean domain badges and rapid shipping highlights.',
      layout: 'two_column',
    },
    {
      id: 'fintech_lead',
      name: 'Stripe & Ramp Fintech Protocol',
      tag: 'FINTECH',
      ats: '98% ATS',
      desc: 'Indigo top banner with tabular transaction metrics, ledger reconciliation, and high reliability.',
      layout: 'top_banner',
    },
    {
      id: 'crypto_web3',
      name: 'Decentralized Protocol Engineer',
      tag: 'CRYPTO / WEB3',
      ats: '96% ATS',
      desc: 'Electric indigo divider lines with smart contract security and consensus mechanisms.',
      layout: 'two_column',
    },
    {
      id: 'saas_operator',
      name: 'B2B SaaS Growth & Revenue Lead',
      tag: 'B2B SAAS',
      ats: '97% ATS',
      desc: 'Royal sapphire blue cards with ARR expansion, retention, and enterprise sales highlights.',
      layout: 'two_column',
    },

    // 19-24: Editorial & Strategy
    {
      id: 'right_sidebar',
      name: 'Burgundy Leadership Standard',
      tag: 'VP & DIRECTOR',
      ats: '96% ATS',
      desc: 'Deep burgundy executive headers, pedigree split, and high-impact accomplishment bullets.',
      layout: 'burgundy_split',
    },
    {
      id: 'mckinsey_consulting',
      name: 'Global Strategy & Management',
      tag: 'MCKINSEY / BCG',
      ats: '99% ATS',
      desc: 'Rigorous single-column case structure with quantitative business impacts and C-suite advisory.',
      layout: 'single_column',
    },
    {
      id: 'swiss_grid',
      name: 'Helvetica Swiss Bauhaus Grid',
      tag: 'SWISS DESIGN',
      ats: '98% ATS',
      desc: 'Ultra-clean black & red geometric alignment inspired by international typographic style.',
      layout: 'two_column',
    },
    {
      id: 'oxford_academic',
      name: 'Cambridge & Oxford Fellow',
      tag: 'ACADEMIC',
      ats: '99% ATS',
      desc: 'Timeless scholarly typography with honorable distinctions, credentials, and fellowships.',
      layout: 'single_column',
    },
    {
      id: 'tokyo_minimal',
      name: 'Tokyo Minimalist Zen',
      tag: 'MINIMALIST',
      ats: '98% ATS',
      desc: 'Subtle hairline dividers, generous white space balance, and muted charcoal hierarchy.',
      layout: 'two_column',
    },
    {
      id: 'nordic_clean',
      name: 'Scandinavian Frost Clean',
      tag: 'NORDIC TECH',
      ats: '97% ATS',
      desc: 'Frost blue accents with clean border dividers and functional human-centric layout.',
      layout: 'two_column',
    },

    // 25-30: Specialized & Creative
    {
      id: 'neo_brutalist',
      name: 'Neo-Brutalist Engineering',
      tag: 'CREATIVE TECH',
      ats: '95% ATS',
      desc: 'Bold black border boxes with punchy drop shadows and high-contrast yellow headers.',
      layout: 'neo_brutalist',
    },
    {
      id: 'coral_modern',
      name: 'Coral Sunset Product Designer',
      tag: 'DESIGN LEAD',
      ats: '96% ATS',
      desc: 'Warm rose coral accents with modern card backdrops and design system highlights.',
      layout: 'left_accent',
    },
    {
      id: 'teal_innovator',
      name: 'Deep Teal Biotech & Hardware',
      tag: 'BIO / HARDWARE',
      ats: '97% ATS',
      desc: 'Rich teal headers with dual-column precision engineering and patent accomplishments.',
      layout: 'two_column',
    },
    {
      id: 'graphite_compact',
      name: 'Dense 1-Page High-Density',
      tag: '10+ YRS EXP',
      ats: '99% ATS',
      desc: 'Maximum information density engineered to fit comprehensive 10-year careers onto 1 page.',
      layout: 'compact',
    },
    {
      id: 'split_duo',
      name: 'Balanced Symmetrical Duo',
      tag: 'FULL STACK',
      ats: '96% ATS',
      desc: 'Clean cobalt blue accents with structured balance between history and technical skills.',
      layout: 'two_column',
    },
    {
      id: 'prestige_gold',
      name: 'Executive VP & Chief Officer Gold',
      tag: 'C-SUITE EXEC',
      ats: '97% ATS',
      desc: 'Dark obsidian top banner with refined warm gold accents for executive candidates.',
      layout: 'top_banner',
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#FAF6F0] overflow-hidden select-none">
      {/* Top Builder Toolbar */}
      <header className="h-16 bg-white border-b border-[#EAE3D5] px-6 flex items-center justify-between shrink-0 no-print">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-sm text-[#231F1D] hidden sm:inline">
            {personalInfo.fullName ? `${personalInfo.fullName} — Resume` : 'New Blank Resume'}
          </span>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Layout className="w-3.5 h-3.5 text-[#C85A32]" />}
            onClick={() => setIsTemplateModalOpen(true)}
          >
            Change Template ({selectedTemplate})
          </Button>

          <Button
            variant="tertiary"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-gray-500" />}
            onClick={handleClearData}
            title="Clear all fields to start completely fresh"
          >
            Start Fresh
          </Button>

          {!isDemoResume && (
            <Button
              variant="tertiary"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />}
              onClick={handleLoadDemo}
            >
              Load Demo Data
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#FAF6F0] p-1 rounded-full border border-[#EAE3D5]">
            <button
              onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
              className="p-1 hover:bg-white rounded-full text-[#786F68]"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-bold text-[#231F1D] px-1">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
              className="p-1 hover:bg-white rounded-full text-[#786F68]"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <Button variant="secondary" size="sm" onClick={() => handleDownloadLocalFile('txt')} leftIcon={<FileText className="w-3.5 h-3.5 text-[#C85A32]" />}>
            Download .TXT
          </Button>

          <Button variant="primary" size="sm" onClick={handleExportPDF} leftIcon={<Download className="w-4 h-4" />}>
            Export ATS PDF
          </Button>
        </div>
      </header>

      {/* 3-Zone Full Viewport Layout */}
      <div className="flex-1 flex min-h-0">
        {/* Zone 1: Left Section List Navigation */}
        <aside className="w-64 bg-[#FAF6F0] border-r border-[#EAE3D5] flex flex-col p-3 gap-1 overflow-y-auto shrink-0 select-none no-print">
          <span className="px-3 py-2 text-[11px] font-bold text-[#786F68] uppercase tracking-wider">
            Resume Sections
          </span>
          {sectionsList.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  isActive ? 'bg-[#C85A32] text-white shadow-xs' : 'text-[#4A423C] hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <GripVertical className={`w-3.5 h-3.5 ${isActive ? 'text-white/70' : 'text-gray-300'}`} />
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#786F68]'}`} />
                  <span>{sec.title}</span>
                </div>
                {typeof sec.count === 'number' && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-white text-gray-700'}`}>
                    {sec.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Zone 2: Center Active Section Form */}
        <main className="flex-1 overflow-y-auto p-6 bg-white border-r border-[#EAE3D5] flex flex-col gap-6 no-print">
          {activeSection === 'personal_info' && (
            <div className="flex flex-col gap-5 max-w-2xl">
              <h2 className="text-lg font-extrabold text-[#231F1D] border-b border-[#EAE3D5] pb-2">Personal Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="John Doe" label="Full Name" value={personalInfo.fullName} onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })} />
                <Input placeholder="john@example.com" label="Email Address" value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} />
                <Input placeholder="+1 (555) 000-0000" label="Phone Number" value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} />
                <Input placeholder="City, State" label="Location" value={personalInfo.location} onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })} />
                <Input placeholder="linkedin.com/in/username" label="LinkedIn URL" value={personalInfo.linkedin} onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })} />
                <Input placeholder="github.com/username" label="GitHub URL" value={personalInfo.github} onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })} />
              </div>
              <Textarea
                placeholder="Briefly describe your career background and key achievements..."
                label="Professional Summary"
                rows={4}
                value={personalInfo.summary}
                onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
              />
            </div>
          )}

          {activeSection === 'experience' && (
            <div className="flex flex-col gap-6 max-w-2xl">
              <div className="flex items-center justify-between border-b border-[#EAE3D5] pb-2">
                <h2 className="text-lg font-extrabold text-[#231F1D]">Work Experience</h2>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                  onClick={() =>
                    setExperiences([
                      ...experiences,
                      {
                        id: `exp-${Date.now()}`,
                        role: '',
                        company: '',
                        location: '',
                        startDate: '',
                        endDate: 'Present',
                        bullets: [''],
                      },
                    ])
                  }
                >
                  Add Experience
                </Button>
              </div>

              {experiences.length === 0 && (
                <div className="p-8 text-center bg-[#FAF6F0] border border-dashed border-[#EAE3D5] rounded-2xl flex flex-col items-center gap-2">
                  <span className="text-xs text-[#786F68]">No work experience entries added yet.</span>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                    onClick={() =>
                      setExperiences([
                        {
                          id: `exp-${Date.now()}`,
                          role: 'Software Engineer',
                          company: 'Acme Corp',
                          location: 'San Francisco, CA',
                          startDate: '2022-01',
                          endDate: 'Present',
                          bullets: ['Built scalable full-stack web applications serving 50k monthly active users.'],
                        },
                      ])
                    }
                  >
                    Add First Experience
                  </Button>
                </div>
              )}

              {experiences.map((exp) => (
                <Card key={exp.id} className="flex flex-col gap-4 border border-[#EAE3D5] p-5 rounded-2xl bg-[#FAF6F0]/40 relative">
                  <button
                    onClick={() => setExperiences(experiences.filter((x) => x.id !== exp.id))}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                    title="Remove Entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-3 pr-6">
                    <Input
                      placeholder="e.g. Software Engineer"
                      label="Job Title / Role"
                      value={exp.role}
                      onChange={(e) => {
                        const val = e.target.value;
                        setExperiences(experiences.map((x) => (x.id === exp.id ? { ...x, role: val } : x)));
                      }}
                    />
                    <Input
                      placeholder="e.g. Acme Corp"
                      label="Company Name"
                      value={exp.company}
                      onChange={(e) => {
                        const val = e.target.value;
                        setExperiences(experiences.map((x) => (x.id === exp.id ? { ...x, company: val } : x)));
                      }}
                    />
                    <Input
                      placeholder="e.g. 2022-01"
                      label="Start Date"
                      value={exp.startDate}
                      onChange={(e) => {
                        const val = e.target.value;
                        setExperiences(experiences.map((x) => (x.id === exp.id ? { ...x, startDate: val } : x)));
                      }}
                    />
                    <Input
                      placeholder="e.g. Present"
                      label="End Date"
                      value={exp.endDate}
                      onChange={(e) => {
                        const val = e.target.value;
                        setExperiences(experiences.map((x) => (x.id === exp.id ? { ...x, endDate: val } : x)));
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#231F1D]">Action Bullets & Achievements</label>
                    {exp.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2">
                        <Input
                          placeholder="Accomplished X by implementing Y, resulting in Z..."
                          value={b}
                          className="bg-white"
                          onChange={(e) => {
                            const val = e.target.value;
                            const updated = [...exp.bullets];
                            updated[bIdx] = val;
                            setExperiences(experiences.map((x) => (x.id === exp.id ? { ...x, bullets: updated } : x)));
                          }}
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          isLoading={isEnhancing === `${exp.id}-${bIdx}`}
                          leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />}
                          onClick={() => handleEnhanceBullet(exp.id, bIdx, b)}
                          title="Enhance bullet with AI metrics"
                        >
                          Enhance
                        </Button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const updated = [...exp.bullets, ''];
                        setExperiences(experiences.map((x) => (x.id === exp.id ? { ...x, bullets: updated } : x)));
                      }}
                      className="text-xs font-bold text-[#C85A32] hover:underline self-start mt-1"
                    >
                      + Add Bullet Line
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeSection === 'projects' && (
            <div className="flex flex-col gap-6 max-w-2xl">
              <div className="flex items-center justify-between border-b border-[#EAE3D5] pb-2">
                <h2 className="text-lg font-extrabold text-[#231F1D]">Projects</h2>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                  onClick={() =>
                    setProjects([
                      ...projects,
                      {
                        id: `proj-${Date.now()}`,
                        title: 'New Project',
                        techStack: 'React, Node.js',
                        link: 'github.com/user/repo',
                        bullets: ['Built application serving users.'],
                      },
                    ])
                  }
                >
                  Add Project
                </Button>
              </div>

              {projects.map((proj) => (
                <Card key={proj.id} className="flex flex-col gap-3 p-4 bg-[#FAF6F0]/40">
                  <Input label="Project Title" value={proj.title} onChange={(e) => setProjects(projects.map((p) => (p.id === proj.id ? { ...p, title: e.target.value } : p)))} />
                  <Input label="Tech Stack" value={proj.techStack} onChange={(e) => setProjects(projects.map((p) => (p.id === proj.id ? { ...p, techStack: e.target.value } : p)))} />
                  <Input label="Project Link" value={proj.link} onChange={(e) => setProjects(projects.map((p) => (p.id === proj.id ? { ...p, link: e.target.value } : p)))} />
                </Card>
              ))}
            </div>
          )}

          {activeSection === 'education' && (
            <div className="flex flex-col gap-6 max-w-2xl">
              <div className="flex items-center justify-between border-b border-[#EAE3D5] pb-2">
                <h2 className="text-lg font-extrabold text-[#231F1D]">Education</h2>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                  onClick={() =>
                    setEducation([
                      ...education,
                      {
                        id: `edu-${Date.now()}`,
                        degree: 'Degree / Certificate',
                        institution: 'University Name',
                        location: 'City, State',
                        startDate: '2020',
                        endDate: '2024',
                        gpa: '',
                      },
                    ])
                  }
                >
                  Add Education
                </Button>
              </div>

              {education.map((edu) => (
                <Card key={edu.id} className="flex flex-col gap-3 p-4 bg-[#FAF6F0]/40">
                  <Input label="Degree" value={edu.degree} onChange={(e) => setEducation(education.map((ed) => (ed.id === edu.id ? { ...ed, degree: e.target.value } : ed)))} />
                  <Input label="Institution" value={edu.institution} onChange={(e) => setEducation(education.map((ed) => (ed.id === edu.id ? { ...ed, institution: e.target.value } : ed)))} />
                </Card>
              ))}
            </div>
          )}

          {activeSection === 'skills' && (
            <div className="flex flex-col gap-5 max-w-2xl">
              <h2 className="text-lg font-extrabold text-[#231F1D] border-b border-[#EAE3D5] pb-2">Skills & Competencies</h2>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="e.g. React, Python, Product Strategy..."
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button variant="primary" size="sm" onClick={handleAddSkill}>
                  Add Skill
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-[#FDF4F0] border border-[#F6DCD1] text-[#C85A32] text-xs font-bold rounded-full flex items-center gap-2"
                  >
                    {sk}
                    <button onClick={() => handleRemoveSkill(sk)} className="text-red-400 hover:text-red-600 font-normal">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Zone 3: Right Live Printable Preview */}
        <section className="flex-1 bg-[#FAF6F0] flex flex-col overflow-hidden">
          {/* Quick Template Switcher Ribbon Bar */}
          <div className="bg-white border-b border-[#EAE3D5] px-4 py-2 flex items-center justify-between gap-3 shrink-0 shadow-2xs no-print">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-[10.5px] font-black text-gray-500 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
                <Layout className="w-3.5 h-3.5 text-[#C85A32]" /> Templates:
              </span>
              {[
                { id: 'classic_ats', label: 'Classic Single-Column' },
                { id: 'modern_executive', label: 'Modern Executive' },
                { id: 'minimalist_tech', label: 'Tech Monospace' },
                { id: 'navy_sidebar', label: 'Navy Two-Column' },
                { id: 'split_duo', label: 'Dual-Column Grid' },
                { id: 'yc_founder_pitch', label: 'YC Pitch' },
              ].map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id as TemplateId)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all shrink-0 ${
                    selectedTemplate === tpl.id
                      ? 'bg-[#C85A32] text-white border-[#C85A32] shadow-xs'
                      : 'bg-[#FAF6F0] text-gray-700 border-[#EAE3D5] hover:border-[#C85A32]/40 hover:bg-white'
                  }`}
                >
                  {tpl.label}
                </button>
              ))}
              <button
                onClick={() => setIsTemplateModalOpen(true)}
                className="px-2.5 py-1 text-[11px] font-bold text-[#C85A32] bg-[#FDF4F0] border border-[#F6DCD1] hover:bg-[#F6DCD1] rounded-lg transition-all shrink-0 flex items-center gap-1"
              >
                Browse All 40+ Templates ▾
              </button>
            </div>
          </div>

          {/* Canvas Scroll Area */}
          <div className="flex-1 overflow-y-auto p-8 flex justify-center items-start">
            <ResumeTemplateRenderer
              templateId={selectedTemplate}
              data={resumeData}
              zoomLevel={zoomLevel}
            />
          </div>
        </section>
      </div>

      {/* Interactive Resume Templates Gallery Modal */}
      <Modal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        title="Select Professional Resume Template Design"
        maxWidth="xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[75vh] overflow-y-auto p-1">
          {templatesGallery.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => {
                setSelectedTemplate(tpl.id as TemplateId);
                setIsTemplateModalOpen(false);
              }}
              className={`group relative bg-white rounded-2xl border p-4 flex flex-col justify-between gap-3.5 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-xl ${
                selectedTemplate === tpl.id
                  ? 'border-[#C85A32] ring-2 ring-[#C85A32]/30 shadow-md'
                  : 'border-[#EAE3D5] hover:border-[#C85A32]/60'
              }`}
            >
              {/* Header Badges */}
              <div className="flex justify-between items-center gap-1">
                <span className="text-[9px] font-black uppercase text-[#C85A32] bg-[#FDF4F0] border border-[#F6DCD1] px-2 py-0.5 rounded-full">
                  ★ {tpl.tag}
                </span>
                <span className="text-[9px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                  {tpl.ats}
                </span>
              </div>

              {/* Graphical Layout Mini Preview Thumbnail */}
              <div className="h-32 bg-[#FAF6F0] rounded-xl border border-[#EAE3D5] p-2.5 flex flex-col gap-1.5 overflow-hidden relative shadow-2xs group-hover:border-[#C85A32]/40 transition-colors">
                {tpl.id === 'classic_ats' && (
                  <div className="flex flex-col gap-1 h-full">
                    {/* Centered Top Header */}
                    <div className="flex flex-col items-center gap-0.5 pb-1 border-b border-gray-900">
                      <div className="w-1/2 h-1.5 bg-gray-900 rounded-full" />
                      <div className="w-3/4 h-0.5 bg-gray-400 rounded-full" />
                    </div>
                    {/* Summary */}
                    <div className="w-full h-0.5 bg-gray-300 rounded mt-0.5" />
                    {/* Two-Column Split Body */}
                    <div className="grid grid-cols-12 gap-1 mt-0.5 flex-1">
                      <div className="col-span-7 flex flex-col gap-1 border-r border-gray-200 pr-1">
                        <div className="w-2/3 h-0.5 bg-gray-800 rounded" />
                        <div className="w-full h-0.5 bg-gray-300 rounded" />
                        <div className="w-4/5 h-0.5 bg-gray-300 rounded" />
                        <div className="w-full h-0.5 bg-gray-300 rounded" />
                      </div>
                      <div className="col-span-5 flex flex-col gap-1">
                        <div className="w-full h-0.5 bg-gray-800 rounded" />
                        <div className="w-full h-0.5 bg-gray-300 rounded" />
                        <div className="w-3/4 h-0.5 bg-gray-300 rounded" />
                      </div>
                    </div>
                    {/* Bottom Certifications Rule */}
                    <div className="w-full border-t border-gray-300 pt-0.5 flex justify-between">
                      <div className="w-2/5 h-0.5 bg-gray-400 rounded" />
                      <div className="w-2/5 h-0.5 bg-gray-400 rounded" />
                    </div>
                  </div>
                )}

                {tpl.id === 'modern_executive' && (
                  <div className="flex flex-col gap-1.5 h-full">
                    <div className="w-full bg-[#FDF4F0] border-l-2 border-[#C85A32] p-1 rounded-r flex flex-col gap-0.5">
                      <div className="w-1/3 h-1 bg-[#C85A32] rounded" />
                      <div className="w-1/2 h-0.5 bg-gray-400 rounded" />
                    </div>
                    <div className="w-full h-1 bg-gray-300 rounded" />
                    <div className="w-4/5 h-1 bg-gray-300 rounded" />
                    <div className="w-2/3 h-1 bg-gray-300 rounded" />
                  </div>
                )}

                {tpl.id === 'navy_sidebar' && (
                  <div className="grid grid-cols-12 h-full gap-1 -m-2.5">
                    <div className="col-span-4 bg-[#0F172A] p-1.5 flex flex-col gap-1">
                      <div className="w-full h-1 bg-sky-400 rounded" />
                      <div className="w-2/3 h-0.5 bg-slate-400 rounded" />
                      <div className="w-full h-0.5 bg-slate-600 rounded mt-1" />
                      <div className="w-full h-0.5 bg-slate-600 rounded" />
                    </div>
                    <div className="col-span-8 p-1.5 flex flex-col gap-1">
                      <div className="w-1/2 h-1 bg-gray-800 rounded" />
                      <div className="w-full h-0.5 bg-gray-300 rounded" />
                      <div className="w-4/5 h-0.5 bg-gray-300 rounded" />
                      <div className="w-full h-0.5 bg-gray-300 rounded" />
                    </div>
                  </div>
                )}

                {tpl.id === 'navy_header' && (
                  <div className="flex flex-col h-full -m-2.5">
                    <div className="bg-[#0B1E36] p-2 flex flex-col items-center gap-0.5 text-center">
                      <div className="w-1/3 h-1 bg-white rounded" />
                      <div className="w-1/2 h-0.5 bg-sky-300 rounded" />
                    </div>
                    <div className="p-2 flex flex-col gap-1">
                      <div className="w-1/3 h-1 bg-gray-700 rounded" />
                      <div className="w-full h-0.5 bg-gray-300 rounded" />
                      <div className="w-4/5 h-0.5 bg-gray-300 rounded" />
                    </div>
                  </div>
                )}

                {tpl.id === 'minimalist_tech' && (
                  <div className="flex flex-col gap-1 h-full font-mono bg-zinc-900 -m-2.5 p-2 text-[6px] text-zinc-300">
                    <div className="text-emerald-400 font-bold">// DEV_EXEC</div>
                    <div className="w-3/4 h-0.5 bg-zinc-700 rounded" />
                    <div className="w-full h-0.5 bg-zinc-700 rounded" />
                    <div className="w-2/3 h-0.5 bg-zinc-700 rounded" />
                  </div>
                )}

                {tpl.id === 'soft_green_pill' && (
                  <div className="flex flex-col gap-1 h-full">
                    <div className="flex justify-between items-center pb-1 border-b border-emerald-200">
                      <div className="w-1/3 h-1 bg-gray-800 rounded" />
                      <div className="w-1/4 h-1 bg-emerald-200 rounded-full" />
                    </div>
                    <div className="w-full h-0.5 bg-emerald-100 rounded" />
                    <div className="w-5/6 h-0.5 bg-gray-300 rounded" />
                    <div className="w-4/5 h-0.5 bg-gray-300 rounded" />
                  </div>
                )}

                {tpl.id === 'right_sidebar' && (
                  <div className="grid grid-cols-12 h-full gap-1 -m-2.5">
                    <div className="col-span-8 p-1.5 flex flex-col gap-1">
                      <div className="w-1/2 h-1 bg-gray-800 rounded" />
                      <div className="w-full h-0.5 bg-gray-300 rounded" />
                      <div className="w-4/5 h-0.5 bg-gray-300 rounded" />
                    </div>
                    <div className="col-span-4 bg-[#0F2537] p-1.5 flex flex-col gap-1">
                      <div className="w-full h-1 bg-sky-400 rounded" />
                      <div className="w-full h-0.5 bg-slate-600 rounded" />
                    </div>
                  </div>
                )}

                {tpl.id === 'yellow_creative' && (
                  <div className="grid grid-cols-12 h-full gap-1 -m-2.5">
                    <div className="col-span-4 bg-[#FAF8ED] p-1.5 flex flex-col items-center gap-1 border-r border-[#EBE5CE]">
                      <div className="w-4 h-4 rounded-full bg-amber-400" />
                      <div className="w-full h-0.5 bg-amber-800 rounded" />
                    </div>
                    <div className="col-span-8 p-1.5 flex flex-col gap-1">
                      <div className="w-1/2 h-1 bg-gray-800 rounded" />
                      <div className="w-full h-0.5 bg-gray-300 rounded" />
                      <div className="w-4/5 h-0.5 bg-gray-300 rounded" />
                    </div>
                  </div>
                )}
              </div>

              {/* Text Meta */}
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-[#231F1D] flex items-center justify-between">
                  {tpl.name}
                  {selectedTemplate === tpl.id && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </span>
                <span className="text-[10px] text-[#786F68] leading-tight line-clamp-2">{tpl.desc}</span>
              </div>

              {/* Action Button */}
              <div
                className={`w-full py-1.5 text-xs font-bold rounded-xl text-center shadow-xs transition-all ${
                  selectedTemplate === tpl.id
                    ? 'bg-[#C85A32] text-white'
                    : 'bg-[#FAF6F0] text-[#231F1D] group-hover:bg-[#C85A32] group-hover:text-white'
                }`}
              >
                {selectedTemplate === tpl.id ? 'Active Template' : 'Use Template'}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
