'use client';

import React, { useState, useEffect, use } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  Save,
  Loader2,
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
  const [isExportPreviewModalOpen, setIsExportPreviewModalOpen] = useState<boolean>(false);
  const [templateCategory, setTemplateCategory] = useState<string>('All');
  const [templateSearchQuery, setTemplateSearchQuery] = useState<string>('');
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<string>('Just now');

  // Resume State
  const [personalInfo, setPersonalInfo] = useState(initialData.personalInfo);
  const [experiences, setExperiences] = useState(initialData.experiences);
  const [education, setEducation] = useState(initialData.education);
  const [projects, setProjects] = useState(initialData.projects);
  const [skills, setSkills] = useState<string[]>(initialData.skills);
  const [newSkillInput, setNewSkillInput] = useState('');

  // 1. Load from Browser Local Storage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('callback_ai_saved_resume_' + resumeId);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.personalInfo) setPersonalInfo(parsed.personalInfo);
          if (parsed.experiences && parsed.experiences.length > 0) setExperiences(parsed.experiences);
          if (parsed.education && parsed.education.length > 0) setEducation(parsed.education);
          if (parsed.projects && parsed.projects.length > 0) setProjects(parsed.projects);
          if (parsed.skills && parsed.skills.length > 0) setSkills(parsed.skills);
          if (parsed.selectedTemplate) setSelectedTemplate(parsed.selectedTemplate);
          setLastSavedTime('Loaded from Local Storage');
        }
      } catch (e) {
        console.error('Error loading resume from local storage:', e);
      }
    }
  }, [resumeId]);

  // 2. Auto-save to Browser Local Storage on edits
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        try {
          const payload = {
            personalInfo,
            experiences,
            education,
            projects,
            skills,
            selectedTemplate,
            updatedAt: new Date().toISOString(),
          };
          localStorage.setItem('callback_ai_saved_resume_' + resumeId, JSON.stringify(payload));
          setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        } catch (e) {
          console.error('Error saving to local storage:', e);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [personalInfo, experiences, education, projects, skills, selectedTemplate, resumeId]);

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

  const [previewModalZoom, setPreviewModalZoom] = useState<number>(65);

  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    setDownloadSuccessMsg(null);

    const cleanName = personalInfo.fullName
      ? personalInfo.fullName.replace(/[^a-zA-Z0-9_\s-]/g, '').trim().replace(/\s+/g, '_')
      : 'Candidate';
    const fileName = `${cleanName}_Resume_ATS.pdf`;

    // 1. Force save to Local Storage immediately
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          'callback_ai_saved_resume_' + resumeId,
          JSON.stringify({
            personalInfo,
            experiences,
            education,
            projects,
            skills,
            selectedTemplate,
            updatedAt: new Date().toISOString(),
          })
        );
        setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (e) {
        console.error('Failed to save to local storage:', e);
      }
    }

    const printElement = document.getElementById('resume-print-sheet');
    if (!printElement) {
      window.print();
      setIsExportingPDF(false);
      return;
    }

    // 2. Try High-Fidelity Server-Side PDF Export (Puppeteer A4 Vector)
    try {
      const res = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: printElement.outerHTML,
          title: cleanName,
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        setDownloadSuccessMsg(`✓ Successfully downloaded ${fileName} to your device!`);
        setTimeout(() => setDownloadSuccessMsg(null), 5000);
        setIsExportingPDF(false);
        return;
      }
    } catch (serverErr) {
      console.warn('Server PDF generation failed, falling back to client-side canvas:', serverErr);
    }

    // 3. Client-Side jsPDF Fallback
    try {
      const originalTransform = printElement.style.transform;
      printElement.style.transform = 'none';

      const canvas = await html2canvas(printElement, {
        scale: 2.2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: printElement.scrollWidth,
        windowHeight: printElement.scrollHeight,
      });

      printElement.style.transform = originalTransform;

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, Math.min(pdfHeight, 297));
      
      pdf.save(fileName);

      setDownloadSuccessMsg(`✓ Successfully downloaded ${fileName} to your device!`);
      setTimeout(() => setDownloadSuccessMsg(null), 5000);
    } catch (err) {
      console.warn('Direct PDF export canvas failed, fallback to native browser print:', err);
      const originalTitle = document.title;
      document.title = `${cleanName}_Resume_ATS`;
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    } finally {
      setIsExportingPDF(false);
    }
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
      name: 'Executive Leader Standard',
      tag: 'FORTUNE 500',
      category: 'Executive & Finance',
      ats: '99% ATS',
      desc: 'Clean two-column split with tabular dates, categorized skills, and verified achievements grid.',
      previewImg: '/images/templates/tpl-1.png',
    },
    {
      id: 'modern_executive',
      name: 'Agile Tech Architect',
      tag: 'YC FOUNDER',
      category: 'Startups & YC',
      ats: '98% ATS',
      desc: 'Warm terracotta accent border, executive summary backdrop, and structured leadership cards.',
      previewImg: '/images/templates/tpl-2.png',
    },
    {
      id: 'navy_sidebar',
      name: 'ATS Match Check Standard',
      tag: 'STAFF / PRINCIPAL',
      category: 'Tech & AI',
      ats: '99% ATS',
      desc: 'Deep slate navy headers, high-contrast subheadings, and dense system engineering layout.',
      previewImg: '/images/templates/tpl-3.png',
    },
    {
      id: 'navy_header',
      name: 'Product & Project Leader',
      tag: 'ENTERPRISE LEAD',
      category: 'Product & Design',
      ats: '97% ATS',
      desc: 'Top navy header banner with dual-column grid body and prominent technical credentials.',
      previewImg: '/images/templates/tpl-4.png',
    },
    {
      id: 'fortune500_single',
      name: 'Scarlett Anderson — CPA & Audit',
      tag: 'FINANCE / CPA',
      category: 'Executive & Finance',
      ats: '99% ATS',
      desc: 'Classic centered serif header with horizontal rules and maximum corporate parser compatibility.',
      previewImg: '/images/templates/enhancv-extra-1.png',
    },
    {
      id: 'boardroom_serif',
      name: 'Isaac Hall — Global Director',
      tag: 'BOARD & ADVISOR',
      category: 'Executive & Finance',
      ats: '98% ATS',
      desc: 'Refined serif typography with right-aligned tabular numerals and leadership highlights.',
      previewImg: '/images/templates/enhancv-extra-2.png',
    },

    // 7-12: Tech & Systems Engineering
    {
      id: 'minimalist_tech',
      name: 'Elise Carter — Backend & ML',
      tag: 'TECH ARCHITECT',
      category: 'Tech & AI',
      ats: '98% ATS',
      desc: 'Monospace terminal section tags, visual skills matrix chart, and dense metrics formatting.',
      previewImg: '/images/templates/enhancv-extra-3.png',
    },
    {
      id: 'soft_green_pill',
      name: 'Carrie Jones — Product Lead',
      tag: 'PRODUCT / STRATEGY',
      category: 'Product & Design',
      ats: '97% ATS',
      desc: 'Nordic emerald headers, clean divider borders, and categorized domain competencies.',
      previewImg: '/images/templates/enhancv-extra-4.png',
    },
    {
      id: 'cyber_terminal',
      name: 'Maeve Delaney — Strategic Sourcing',
      tag: 'OPERATIONS',
      category: 'Executive & Finance',
      ats: '97% ATS',
      desc: 'Deep dark slate console styling with bright emerald syntax highlights and terminal tags.',
      previewImg: '/images/templates/enhancv-extra-5.png',
    },
    {
      id: 'cloud_architect',
      name: 'Ellen Johnson — Growth Marketing',
      tag: 'MARKETING / TECH',
      category: 'Startups & YC',
      ats: '98% ATS',
      desc: 'Sky blue accent geometry with structured infrastructure competencies and cloud metrics.',
      previewImg: '/images/templates/enhancv-extra-6.png',
    },
    {
      id: 'rust_systems',
      name: 'Grace Jackson — Data Scientist',
      tag: 'DATA / AI',
      category: 'Tech & AI',
      ats: '99% ATS',
      desc: 'Copper orange accent borders with dense monospace code tags and performance metrics.',
      previewImg: '/images/templates/enhancv-extra-7.png',
    },
    {
      id: 'ai_researcher',
      name: 'Austin Adams — Business Dev Lead',
      tag: 'ENTERPRISE B2B',
      category: 'Executive & Finance',
      ats: '98% ATS',
      desc: 'Scholarly preprint typography with abstract summary box and publication pedigree.',
      previewImg: '/images/templates/enhancv-extra-8.png',
    },

    // 13-18: YC Startups & High Growth
    {
      id: 'yellow_creative',
      name: 'David Miller — Staff ML Engineer',
      tag: 'AI / SYSTEMS',
      category: 'Tech & AI',
      ats: '99% ATS',
      desc: 'Warm amber section dividers and structured dual-column matrix for product innovators.',
      previewImg: '/images/templates/enhancv-extra-9.png',
    },
    {
      id: 'yc_founder_pitch',
      name: 'Elena Rostova — VP of Marketing',
      tag: 'STARTUP FOUNDER',
      category: 'Startups & YC',
      ats: '98% ATS',
      desc: 'Punchy orange accents, prominent fundraising and traction milestones, and high-signal metrics.',
      previewImg: '/images/templates/enhancv-extra-10.png',
    },
    {
      id: 'stealth_scale',
      name: 'Marcus Vance — Cloud Architect',
      tag: 'CLOUD / DEVOPS',
      category: 'Tech & AI',
      ats: '98% ATS',
      desc: 'Deep violet accent banners with clean domain badges and rapid shipping highlights.',
      previewImg: '/images/templates/enhancv-extra-11.png',
    },
    {
      id: 'fintech_lead',
      name: 'Sophia Chen — Biotech Director',
      tag: 'BIOTECH / CLINICAL',
      category: 'Executive & Finance',
      ats: '98% ATS',
      desc: 'Indigo top banner with tabular transaction metrics, ledger reconciliation, and high reliability.',
      previewImg: '/images/templates/enhancv-extra-12.png',
    },
    {
      id: 'crypto_web3',
      name: 'Liam O’Connor — Cybersecurity',
      tag: 'SECURITY / SOC',
      category: 'Tech & AI',
      ats: '97% ATS',
      desc: 'Electric indigo divider lines with smart contract security and consensus mechanisms.',
      previewImg: '/images/templates/enhancv-extra-13.png',
    },
    {
      id: 'saas_operator',
      name: 'Rachel Green — Head of UX & Design',
      tag: 'UX / PRODUCT',
      category: 'Product & Design',
      ats: '97% ATS',
      desc: 'Royal sapphire blue cards with ARR expansion, retention, and enterprise sales highlights.',
      previewImg: '/images/templates/enhancv-extra-14.png',
    },

    // 19-24: Editorial & Strategy
    {
      id: 'right_sidebar',
      name: 'Alexander Wright — Quant Research',
      tag: 'QUANT / HEDGE FUND',
      category: 'Executive & Finance',
      ats: '99% ATS',
      desc: 'Deep burgundy executive headers, pedigree split, and high-impact accomplishment bullets.',
      previewImg: '/images/templates/enhancv-extra-15.png',
    },
    {
      id: 'mckinsey_consulting',
      name: 'Claire Dupont — Corporate Counsel',
      tag: 'LEGAL & STRATEGY',
      category: 'Academic & Strategy',
      ats: '99% ATS',
      desc: 'Rigorous single-column case structure with quantitative business impacts and C-suite advisory.',
      previewImg: '/images/templates/enhancv-extra-16.png',
    },
    {
      id: 'swiss_grid',
      name: 'Helvetica Swiss Bauhaus Grid',
      tag: 'SWISS DESIGN',
      category: 'Product & Design',
      ats: '98% ATS',
      desc: 'Ultra-clean black & red geometric alignment inspired by international typographic style.',
      previewImg: '/images/templates/enhancv-1.png',
    },
    {
      id: 'oxford_academic',
      name: 'Cambridge & Oxford Fellow',
      tag: 'ACADEMIC',
      category: 'Academic & Strategy',
      ats: '99% ATS',
      desc: 'Timeless scholarly typography with honorable distinctions, credentials, and fellowships.',
      previewImg: '/images/templates/enhancv-2.png',
    },
    {
      id: 'tokyo_minimal',
      name: 'Tokyo Minimalist Zen',
      tag: 'MINIMALIST',
      category: 'Product & Design',
      ats: '98% ATS',
      desc: 'Subtle hairline dividers, generous white space balance, and muted charcoal hierarchy.',
      previewImg: '/images/templates/enhancv-3.png',
    },
    {
      id: 'nordic_clean',
      name: 'Scandinavian Frost Clean',
      tag: 'NORDIC TECH',
      category: 'Tech & AI',
      ats: '97% ATS',
      desc: 'Frost blue accents with clean border dividers and functional human-centric layout.',
      previewImg: '/images/templates/enhancv-4.png',
    },

    // 25-32: Specialized & High Demand Roles
    {
      id: 'neo_brutalist',
      name: 'Neo-Brutalist Engineering',
      tag: 'CREATIVE TECH',
      category: 'Product & Design',
      ats: '95% ATS',
      desc: 'Bold black border boxes with punchy drop shadows and high-contrast yellow headers.',
      previewImg: '/images/templates/enhancv-5.png',
    },
    {
      id: 'coral_modern',
      name: 'Coral Sunset Product Designer',
      tag: 'DESIGN LEAD',
      category: 'Product & Design',
      ats: '96% ATS',
      desc: 'Warm rose coral accents with modern card backdrops and design system highlights.',
      previewImg: '/images/templates/enhancv-6.png',
    },
    {
      id: 'teal_innovator',
      name: 'Deep Teal Biotech & Hardware',
      tag: 'BIO / HARDWARE',
      category: 'Tech & AI',
      ats: '97% ATS',
      desc: 'Rich teal headers with dual-column precision engineering and patent accomplishments.',
      previewImg: '/images/templates/enhancv-7.png',
    },
    {
      id: 'graphite_compact',
      name: 'Dense 1-Page High-Density',
      tag: '10+ YRS EXP',
      category: 'Executive & Finance',
      ats: '99% ATS',
      desc: 'Maximum information density engineered to fit comprehensive 10-year careers onto 1 page.',
      previewImg: '/images/templates/enhancv-8.png',
    },
    {
      id: 'split_duo',
      name: 'Balanced Symmetrical Duo',
      tag: 'FULL STACK',
      category: 'Tech & AI',
      ats: '96% ATS',
      desc: 'Clean cobalt blue accents with structured balance between history and technical skills.',
      previewImg: '/images/templates/template-1.png',
    },
    {
      id: 'prestige_gold',
      name: 'Executive VP & Chief Officer Gold',
      tag: 'C-SUITE EXEC',
      category: 'Executive & Finance',
      ats: '97% ATS',
      desc: 'Dark obsidian top banner with refined warm gold accents for executive candidates.',
      previewImg: '/images/templates/template-2.png',
    },
    {
      id: 'ai_ml_lead',
      name: 'PyTorch ML & Autonomous Swarms',
      tag: 'AI / LLM LEAD',
      category: 'Tech & AI',
      ats: '99% ATS',
      desc: 'Advanced machine learning systems with distributed training throughput metrics.',
      previewImg: '/images/templates/template-3.png',
    },
    {
      id: 'quantum_research',
      name: 'Quantum & Hardware Researcher',
      tag: 'QUANTUM R&D',
      category: 'Academic & Strategy',
      ats: '98% ATS',
      desc: 'Specialized layout for hardware engineers, quantum algorithms, and experimental physics.',
      previewImg: '/images/templates/tpl-3.png',
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-100/60 overflow-hidden select-none">
      {/* Top Builder Toolbar */}
      <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between shrink-0 no-print">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-sm text-slate-900 hidden sm:inline">
            {personalInfo.fullName ? `${personalInfo.fullName} — Resume` : 'New Blank Resume'}
          </span>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Layout className="w-3.5 h-3.5 text-indigo-600" />}
            onClick={() => setIsTemplateModalOpen(true)}
          >
            Change Template ({selectedTemplate})
          </Button>

          <Button
            variant="tertiary"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-slate-500" />}
            onClick={handleClearData}
            title="Clear all fields to start completely fresh"
          >
            Start Fresh
          </Button>

          {!isDemoResume && (
            <Button
              variant="tertiary"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
              onClick={handleLoadDemo}
            >
              Load Demo Data
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Local Storage Auto-Save Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-full border border-slate-200 text-[10.5px] font-bold text-slate-600">
            <Save className="w-3 h-3 text-teal-600" />
            <span>Auto-saved locally ({lastSavedTime})</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
              className="p-1 hover:bg-white rounded-full text-slate-600 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-bold text-slate-900 px-1">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
              className="p-1 hover:bg-white rounded-full text-slate-600 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleDownloadLocalFile('json')}
            leftIcon={<Save className="w-3.5 h-3.5 text-indigo-600" />}
            title="Save raw JSON resume file to your device"
          >
            Save .JSON
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsExportPreviewModalOpen(true)}
            leftIcon={<Download className="w-4 h-4 text-white" />}
          >
            Preview & Export PDF
          </Button>
        </div>
      </header>

      {/* Floating Download Success Toast */}
      {downloadSuccessMsg && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-teal-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-bold">{downloadSuccessMsg}</span>
            <span className="text-[10px] text-slate-300">File is saved in your device Downloads folder & Local Storage</span>
          </div>
          <button onClick={() => setDownloadSuccessMsg(null)} className="ml-2 text-slate-400 hover:text-white text-xs">✕</button>
        </div>
      )}

      {/* 3-Zone Full Viewport Layout */}
      <div className="flex-1 flex min-h-0">
        {/* Zone 1: Left Section List Navigation */}
        <aside className="w-64 bg-slate-50/80 border-r border-slate-200 flex flex-col p-3 gap-1 overflow-y-auto shrink-0 select-none no-print">
          <span className="px-3 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Resume Sections
          </span>
          {sectionsList.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive ? 'bg-gradient-to-r from-[#008CA0] via-[#2E75C4] to-[#5039F6] text-white shadow-xs' : 'text-slate-700 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <GripVertical className={`w-3.5 h-3.5 ${isActive ? 'text-white/70' : 'text-slate-400'}`} />
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{sec.title}</span>
                </div>
                {typeof sec.count === 'number' && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
                    {sec.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Zone 2: Center Active Section Form */}
        <main className="flex-1 overflow-y-auto p-6 bg-white border-r border-slate-200 flex flex-col gap-6 no-print">
          {activeSection === 'personal_info' && (
            <div className="flex flex-col gap-5 max-w-2xl">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-200 pb-2">Personal Details</h2>
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
                          leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#048BA2]" />}
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
                      className="text-xs font-bold text-[#048BA2] hover:underline self-start mt-1 cursor-pointer"
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
                    className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-full flex items-center gap-2"
                  >
                    {sk}
                    <button onClick={() => handleRemoveSkill(sk)} className="text-indigo-400 hover:text-indigo-700 font-normal cursor-pointer">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Zone 3: Right Live Printable Preview */}
        <section className="flex-1 bg-slate-100/60 flex flex-col overflow-hidden">
          {/* Quick Template Switcher Ribbon Bar */}
          <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between gap-3 shrink-0 shadow-2xs no-print">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-[10.5px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
                <Layout className="w-3.5 h-3.5 text-indigo-600" /> Templates:
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
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all shrink-0 cursor-pointer ${
                    selectedTemplate === tpl.id
                      ? 'bg-[#048BA2] text-white border-[#048BA2] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#048BA2] hover:bg-white'
                  }`}
                >
                  {tpl.label}
                </button>
              ))}
              <button
                onClick={() => setIsTemplateModalOpen(true)}
                className="px-2.5 py-1 text-[11px] font-bold text-[#048BA2] bg-[#E6F5F8] border border-[#048BA2]/30 hover:bg-[#E6F5F8]/80 rounded-lg transition-all shrink-0 flex items-center gap-1 cursor-pointer"
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

      {/* Interactive 30+ Resume Templates Gallery Modal with Real Photos & Search */}
      <Modal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        title="Select Professional Resume Template Design"
        maxWidth="xl"
      >
        <div className="flex flex-col gap-4 max-h-[80vh] overflow-hidden p-1">
          {/* Header Controls: Categories & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border-b border-slate-200 pb-3 shrink-0">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {[
                { id: 'All', label: 'All Templates (32)' },
                { id: 'Executive & Finance', label: 'Executive & Finance' },
                { id: 'Tech & AI', label: 'Tech & AI' },
                { id: 'Product & Design', label: 'Product & Design' },
                { id: 'Startups & YC', label: 'Startups & YC' },
                { id: 'Academic & Strategy', label: 'Academic & Strategy' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setTemplateCategory(cat.id)}
                  className={`px-3 py-1 text-xs font-bold rounded-xl border transition-all shrink-0 cursor-pointer ${
                    templateCategory === cat.id
                      ? 'bg-[#048BA2] text-white border-[#048BA2] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#048BA2] hover:bg-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative shrink-0 sm:w-64">
              <input
                type="text"
                value={templateSearchQuery}
                onChange={(e) => setTemplateSearchQuery(e.target.value)}
                placeholder="Search by role or style..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#048BA2] focus:bg-white"
              />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
              {templateSearchQuery && (
                <button
                  onClick={() => setTemplateSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* 32+ Real Photographic Template Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto pr-1 flex-1">
            {templatesGallery
              .filter((tpl) => {
                const matchesCat = templateCategory === 'All' || tpl.category === templateCategory;
                const matchesSearch =
                  !templateSearchQuery ||
                  tpl.name.toLowerCase().includes(templateSearchQuery.toLowerCase()) ||
                  tpl.tag.toLowerCase().includes(templateSearchQuery.toLowerCase()) ||
                  tpl.desc.toLowerCase().includes(templateSearchQuery.toLowerCase());
                return matchesCat && matchesSearch;
              })
              .map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => {
                    setSelectedTemplate(tpl.id as TemplateId);
                    setIsTemplateModalOpen(false);
                  }}
                  className={`group relative bg-white rounded-2xl border p-3 flex flex-col justify-between gap-3 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-xl ${
                    selectedTemplate === tpl.id
                      ? 'border-[#048BA2] ring-2 ring-[#048BA2]/40 shadow-md'
                      : 'border-slate-200 hover:border-[#048BA2]'
                  }`}
                >
                  {/* Header Badges */}
                  <div className="flex justify-between items-center gap-1">
                    <span className="text-[9px] font-black uppercase text-[#048BA2] bg-[#E6F5F8] border border-[#048BA2]/30 px-2 py-0.5 rounded-full truncate max-w-[120px]">
                      ★ {tpl.tag}
                    </span>
                    <span className="text-[9px] font-extrabold text-teal-800 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded-full shrink-0">
                      {tpl.ats}
                    </span>
                  </div>

                  {/* REAL PHOTOGRAPHIC TEMPLATE PREVIEW */}
                  <div className="h-44 w-full bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative shadow-2xs group-hover:shadow-md transition-all">
                    <img
                      src={tpl.previewImg}
                      alt={tpl.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 backdrop-blur-[2px]">
                      <span className="px-3 py-1.5 bg-[#048BA2] text-white text-[11px] font-black rounded-lg shadow-md">
                        Select Template
                      </span>
                    </div>
                  </div>

                  {/* Text Meta */}
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-xs font-bold text-slate-900 flex items-center justify-between">
                      <span className="truncate">{tpl.name}</span>
                      {selectedTemplate === tpl.id && (
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 ml-1" />
                      )}
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight line-clamp-2">{tpl.desc}</span>
                  </div>

                  {/* Action Button */}
                  <div
                    className={`w-full py-1.5 text-xs font-bold rounded-xl text-center shadow-xs transition-all ${
                      selectedTemplate === tpl.id
                        ? 'bg-[#048BA2] text-white'
                        : 'bg-slate-100 text-slate-800 group-hover:bg-[#048BA2] group-hover:text-white'
                    }`}
                  >
                    {selectedTemplate === tpl.id ? 'Active Template' : 'Use Template'}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Modal>

      {/* Interactive PDF Export & Vector Print Preview Modal */}
      <Modal
        isOpen={isExportPreviewModalOpen}
        onClose={() => setIsExportPreviewModalOpen(false)}
        title="Resume Export & Print Preview"
        maxWidth="4xl"
      >
        <div className="flex flex-col gap-4 max-h-[85vh] overflow-hidden p-1">
          {/* Top Control Bar */}
          <div className="bg-[#E6F5F8]/60 border border-[#048BA2]/20 rounded-2xl p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 shrink-0 shadow-2xs">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-900">
                  {personalInfo.fullName ? personalInfo.fullName.trim().replace(/\s+/g, '_') : 'Candidate'}_Resume_ATS.pdf
                </span>
                <span className="text-[9px] font-black uppercase text-teal-800 bg-teal-100 border border-teal-300 px-2 py-0.5 rounded-full">
                  100% ATS Vector
                </span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Standard A4 (210 × 297 mm) • Native crisp typography • Saved in Downloads & Local Storage
              </span>
            </div>

            {/* Modal Controls & Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {/* Preview Scale Zoom Bar */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 mr-1">
                {[
                  { label: '50%', value: 50 },
                  { label: '65% (Fit)', value: 65 },
                  { label: '80%', value: 80 },
                  { label: '100%', value: 100 },
                ].map((z) => (
                  <button
                    key={z.value}
                    onClick={() => setPreviewModalZoom(z.value)}
                    className={`px-2 py-0.5 text-[10.5px] font-bold rounded-lg transition-all cursor-pointer ${
                      previewModalZoom === z.value
                        ? 'bg-[#048BA2] text-white shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {z.label}
                  </button>
                ))}
              </div>

              {/* 1. Direct PDF File Download (Primary) */}
              <Button
                variant="primary"
                size="sm"
                disabled={isExportingPDF}
                onClick={handleExportPDF}
                leftIcon={
                  isExportingPDF ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <Download className="w-4 h-4 text-white" />
                  )
                }
                className="shadow-md"
              >
                {isExportingPDF ? 'Downloading PDF...' : 'Download PDF File'}
              </Button>

              {/* 2. Native Print / Vector PDF Option */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const cleanName = personalInfo.fullName
                    ? personalInfo.fullName.replace(/[^a-zA-Z0-9_\s-]/g, '').trim().replace(/\s+/g, '_')
                    : 'Candidate';
                  const originalTitle = document.title;
                  document.title = `${cleanName}_Resume_ATS`;
                  window.print();
                  setTimeout(() => {
                    document.title = originalTitle;
                  }, 1000);
                }}
                leftIcon={<FileText className="w-3.5 h-3.5 text-indigo-600" />}
              >
                Print / Save
              </Button>

              {/* 3. JSON Backup */}
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => handleDownloadLocalFile('json')}
                leftIcon={<Save className="w-3.5 h-3.5 text-slate-600" />}
                title="Save .JSON file"
              >
                Save .JSON
              </Button>
            </div>
          </div>

          {/* Full Centered A4 Scaled Preview Container */}
          <div className="flex-1 overflow-y-auto bg-slate-200/70 rounded-2xl p-4 sm:p-8 flex justify-center items-start border border-slate-200 min-h-[500px]">
            <div className="shadow-2xl rounded-sm overflow-hidden bg-white">
              <ResumeTemplateRenderer
                templateId={selectedTemplate}
                data={resumeData}
                zoomLevel={previewModalZoom}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
