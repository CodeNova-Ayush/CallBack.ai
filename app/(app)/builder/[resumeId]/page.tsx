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
    fullName: 'Ayush Mishra',
    email: 'ayush.mishra@demo.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/ayushmishradev',
    github: 'github.com/ayushmishra-ai',
    summary:
      'Passionate Full-Stack AI Engineer with 4+ years of experience architecting high-throughput distributed systems, vector search pipelines, and intuitive React web applications. Proven track record reducing API latency by 45% and driving 3M+ active user growth.',
  },
  experiences: [
    {
      id: 'exp-1',
      role: 'Senior Full-Stack AI Engineer',
      company: 'Aether Cloud Tech',
      location: 'San Francisco, CA',
      startDate: '2023-01',
      endDate: 'Present',
      bullets: [
        'Architected scalable RAG query pipeline using Next.js 14, PgVector, and Claude 3.5 Sonnet, handling 150k daily active requests at 180ms p95 latency.',
        'Engineered custom prompt evaluation framework that boosted grounding precision by 32% and cut model hallucination rate below 0.4%.',
        'Mentored 5 junior developers and instituted automated CI/CD code quality checks, improving deployment velocity by 40%.',
      ],
    },
    {
      id: 'exp-2',
      role: 'Software Engineer',
      company: 'Pulse Digital Analytics',
      location: 'San Jose, CA',
      startDate: '2021-06',
      endDate: '2022-12',
      bullets: [
        'Built responsive React + TypeScript analytics portal used by 45k enterprise business managers.',
        'Optimized PostgreSQL query index strategies, cutting complex aggregation runtimes from 4.2s to 210ms.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2017-08',
      endDate: '2021-05',
      gpa: '3.88 / 4.0',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'NeuroDraft — Agentic Document Copilot',
      techStack: 'Next.js, Python FastAPI, PgVector, Anthropic API',
      link: 'github.com/ayushmishra-ai/neurodraft',
      bullets: [
        'Built multi-agent document analysis workspace featuring real-time collaborative editing and voice feedback.',
        'Starred by 1.2k developers on GitHub; deployed live to 10k monthly active users.',
      ],
    },
  ],
  skills: [
    'TypeScript',
    'React',
    'Next.js',
    'Python',
    'Rust',
    'PgVector',
    'PostgreSQL',
    'Tailwind CSS',
    'AWS',
    'Docker',
    'Prisma',
    'Claude API',
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

  // Start with empty data if not explicitly the Ayush Mishra demo resume
  const initialData = isDemoResume ? DEMO_DATA : EMPTY_DATA;

  const [activeSection, setActiveSection] = useState<string>('personal_info');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('modern_executive');
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
    { id: 'classic_ats', name: 'Helen Willis / Executive Serif', tag: 'RECOMMENDED', desc: 'Fortune 500 ATS standard single-column serif template' },
    { id: 'navy_sidebar', name: 'Theo Ramos / Midnight Navy Sidebar', tag: 'RECOMMENDED', desc: 'Dark blue left sidebar for contacts & skills' },
    { id: 'soft_green_pill', name: 'Alisha Hill / Soft Green Pill', tag: 'RECOMMENDED', desc: 'Modern soft green pill tags and clean layout' },
    { id: 'modern_executive', name: 'Maria Dean / Terracotta Banner', tag: 'RECOMMENDED', desc: 'Left terracotta accent border with executive header' },
    { id: 'right_sidebar', name: 'Ethan Cole / Dark Navy Right Column', tag: 'POPULAR', desc: 'Right navy sidebar column for skills & education' },
    { id: 'navy_header', name: 'Maria Dean / Deep Navy Top Header', tag: 'POPULAR', desc: 'Deep navy blue top header banner' },
    { id: 'minimalist_tech', name: 'David Miller / Minimal Tech', tag: 'CLEAN', desc: 'Compact monospace header for developers' },
    { id: 'yellow_creative', name: 'Samantha Lewis / Creative Amber', tag: 'CREATIVE', desc: 'Soft amber profile circle badge & pill tags' },
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
        <section className="flex-1 bg-[#FAF6F0] overflow-y-auto p-8 flex justify-center items-start">
          <ResumeTemplateRenderer
            templateId={selectedTemplate}
            data={resumeData}
            zoomLevel={zoomLevel}
          />
        </section>
      </div>

      {/* Interactive Resume Templates Gallery Modal */}
      <Modal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        title="Select Professional Resume Template Design"
        maxWidth="xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[70vh] overflow-y-auto p-1">
          {templatesGallery.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => {
                setSelectedTemplate(tpl.id as TemplateId);
                setIsTemplateModalOpen(false);
              }}
              className={`group relative bg-[#FAF6F0] rounded-2xl border p-4 flex flex-col justify-between gap-3 transition-all cursor-pointer hover:shadow-xl ${
                selectedTemplate === tpl.id ? 'border-[#C85A32] ring-2 ring-[#C85A32]/30' : 'border-[#EAE3D5] hover:border-[#C85A32]'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-[#C85A32] bg-white border border-[#F6DCD1] px-2 py-0.5 rounded-full">
                  ★ {tpl.tag}
                </span>
                {selectedTemplate === tpl.id && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-[#231F1D]">{tpl.name}</span>
                <span className="text-[11px] text-[#786F68]">{tpl.desc}</span>
              </div>

              {/* Blue Start Button Overlay on Hover matching user screenshot */}
              <div className="mt-2 w-full py-2 bg-[#2563EB] text-white text-xs font-bold rounded-xl text-center shadow-md opacity-90 group-hover:opacity-100 group-hover:bg-[#1D4ED8] transition-all">
                Start with this template
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
