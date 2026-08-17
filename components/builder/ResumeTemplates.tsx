import React from 'react';
import { clsx } from 'clsx';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  CheckCircle2,
  ExternalLink,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  Terminal,
  Award,
  Sparkles,
} from 'lucide-react';

export type TemplateId =
  | 'classic_ats'
  | 'modern_executive'
  | 'navy_sidebar'
  | 'navy_header'
  | 'minimalist_tech'
  | 'soft_green_pill'
  | 'right_sidebar'
  | 'yellow_creative'
  | 'fortune500_single'
  | 'boardroom_serif'
  | 'yc_founder_pitch'
  | 'stealth_scale'
  | 'fintech_lead'
  | 'crypto_web3'
  | 'saas_operator'
  | 'mckinsey_consulting'
  | 'swiss_grid'
  | 'oxford_academic'
  | 'tokyo_minimal'
  | 'nordic_clean'
  | 'neo_brutalist'
  | 'coral_modern'
  | 'teal_innovator'
  | 'graphite_compact'
  | 'split_duo'
  | 'prestige_gold'
  | 'cloud_architect'
  | 'rust_systems'
  | 'ai_researcher';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website?: string;
    summary: string;
  };
  experiences: {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    bullets: string[];
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    location?: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }[];
  projects: {
    id: string;
    title: string;
    techStack?: string;
    link?: string;
    bullets: string[];
  }[];
  skills: string[];
  certifications?: string[];
}

interface ResumeTemplateProps {
  templateId: TemplateId;
  data: ResumeData;
  zoomLevel?: number;
}

// Universal High-Caliber Mock Persona for Demo Preview
const MOCK_PERSONA = {
  fullName: 'ALEX RIVERA',
  title: 'Staff AI Engineer | Distributed Systems & Multi-Agent Architect | Ex-Stripe & YC Alum',
  email: 'alex.rivera@neuralflow.ai',
  phone: '+1 (555) 439-8821',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/alexrivera-ai',
  github: 'github.com/alexrivera',
  summary:
    'Staff Software Engineer and Systems Architect with 6+ years of experience engineering high-throughput distributed infrastructure, low-latency LLM inference pipelines, and enterprise-grade full-stack platforms. Founder of SynthBase (YC W24, acquired) and core contributor to open-source agent frameworks. Proven track record scaling microservices to 10M+ daily active requests with 99.99% uptime, cutting p99 query latencies by 60%, and orchestrating multi-region cloud deployments on AWS and GCP.',
  experiences: [
    {
      id: 'exp-1',
      role: 'Founding Staff AI Engineer',
      company: 'NeuralFlow Systems',
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
  skills: [
    'TypeScript', 'Python', 'Go', 'Rust', 'C++', 'SQL',
    'React', 'Next.js', 'Node.js', 'PostgreSQL', 'PgVector', 'Redis',
    'AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Git',
    'LLM Swarms', 'RAG Pipelines', 'LangChain', 'Prompt Engineering'
  ],
  certifications: [
    '1st Place Grand Prize Winner at Global AI Autonomous Agent Hackathon (1,200+ teams).',
    'AWS Certified Solutions Architect – Professional & CKA Kubernetes Administrator.',
    'Y Combinator W24 Founder Batch Alumni (SynthBase — acquired 2025).',
    'GitHub Open Source Creator with 8,500+ stars across developer tooling repositories.',
    'Maintained 99.999% SLA uptime across distributed payment & inference clusters.'
  ],
};

export const ResumeTemplateRenderer: React.FC<ResumeTemplateProps> = ({
  templateId,
  data,
  zoomLevel = 100,
}) => {
  const { personalInfo, experiences = [], education = [], projects = [], skills = [] } = data;

  const isBlank =
    !personalInfo.fullName &&
    !personalInfo.email &&
    experiences.length === 0 &&
    education.length === 0 &&
    projects.length === 0 &&
    skills.length === 0;

  // Use candidate data if provided; otherwise fallback to clean mock persona
  const fullName = personalInfo.fullName || (isBlank ? MOCK_PERSONA.fullName : '');
  const email = personalInfo.email || (isBlank ? MOCK_PERSONA.email : '');
  const phone = personalInfo.phone || (isBlank ? MOCK_PERSONA.phone : '');
  const location = personalInfo.location || (isBlank ? MOCK_PERSONA.location : '');
  const linkedin = personalInfo.linkedin || (isBlank ? MOCK_PERSONA.linkedin : '');
  const summary = personalInfo.summary || (isBlank ? MOCK_PERSONA.summary : '');
  const expList = experiences.length > 0 ? experiences : (isBlank ? MOCK_PERSONA.experiences : []);
  const eduList = education.length > 0 ? education : (isBlank ? MOCK_PERSONA.education : []);
  const skillList = skills.length > 0 ? skills : (isBlank ? MOCK_PERSONA.skills : []);
  const certList = data.certifications && data.certifications.length > 0 ? data.certifications : (isBlank ? MOCK_PERSONA.certifications : []);

  return (
    <div
      id="resume-print-sheet"
      className="bg-white text-[#1E293B] shadow-2xl rounded-xs print:shadow-none transition-transform origin-top select-text box-border font-sans"
      style={{
        width: '210mm',
        minHeight: '297mm',
        maxWidth: '210mm',
        padding: '12mm 14mm',
        transform: `scale(${zoomLevel / 100})`,
      }}
    >
      {/* =========================================================================
          1. CLASSIC ATS 2-COLUMN DICTO TEMPLATE (Default)
         ========================================================================= */}
      {templateId === 'classic_ats' && (
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex flex-col">
            <h1 className="text-[24px] font-black uppercase text-[#0B132B] tracking-tight leading-none">
              {fullName || 'YOUR NAME'}
            </h1>
            {/* Header Subtitle */}
            <p className="text-[11px] font-semibold text-[#334155] mt-1 leading-snug">
              {expList.length > 0
                ? `${expList[0].role} | Systems & Software Engineer`
                : MOCK_PERSONA.title}
            </p>
            <div className="text-[10px] text-[#475569] flex flex-wrap items-center gap-1.5 mt-1 font-medium">
              {phone && <span>{phone}</span>}
              {phone && email && <span>|</span>}
              {email && <span className="text-[#1D4ED8] underline">{email}</span>}
              {email && linkedin && <span>|</span>}
              {linkedin && <span className="text-[#1D4ED8] underline">{linkedin}</span>}
              {location && <span>|</span>}
              {location && <span>{location}</span>}
            </div>
            <div className="border-b-[1.5px] border-[#0B132B] mt-2" />
          </div>

          {/* Professional Summary */}
          {summary && (
            <div className="flex flex-col">
              <h2 className="text-[11px] font-black uppercase text-[#0B132B] border-b-[1.5px] border-[#0B132B] pb-0.5 tracking-wider">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-[10px] text-[#1E293B] leading-relaxed text-justify mt-1.5">
                {summary}
              </p>
            </div>
          )}

          {/* Two-Column Split Body */}
          <div className="grid grid-cols-12 gap-5 mt-1">
            {/* LEFT COLUMN: Work Experience */}
            <div className="col-span-7 flex flex-col gap-3">
              {expList.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <h2 className="text-[11px] font-black uppercase text-[#0B132B] border-b-[1.5px] border-[#0B132B] pb-0.5 tracking-wider">
                    WORK EXPERIENCE
                  </h2>

                  <div className="flex flex-col gap-2.5">
                    {expList.map((exp) => (
                      <div key={exp.id} className="flex flex-col gap-0.5">
                        <div className="flex justify-between items-baseline">
                          <span className="font-extrabold text-[11px] text-[#0B132B]">{exp.role}</span>
                          <span className="text-[9.5px] text-[#64748B] font-medium">
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[10.5px]">
                          <span className="font-bold text-[#1D4ED8]">{exp.company}</span>
                          {exp.location && <span className="text-[#64748B]">| {exp.location}</span>}
                        </div>

                        {exp.bullets && exp.bullets.length > 0 && (
                          <ul className="list-disc list-outside ml-3.5 text-[9.5px] text-[#1E293B] flex flex-col gap-0.5 mt-0.5">
                            {exp.bullets.map((b, idx) => (
                              <li key={idx} className="leading-snug">
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Education & Skills */}
            <div className="col-span-5 flex flex-col gap-3">
              {/* Education */}
              {eduList.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-[11px] font-black uppercase text-[#0B132B] border-b-[1.5px] border-[#0B132B] pb-0.5 tracking-wider">
                    EDUCATION
                  </h2>

                  <div className="flex flex-col gap-2 mt-0.5">
                    {eduList.map((edu) => (
                      <div key={edu.id} className="flex flex-col text-[10px]">
                        <span className="font-extrabold text-[#0B132B] leading-tight">{edu.institution}</span>
                        <span className="text-[#334155] leading-snug">{edu.degree}</span>
                        <span className="text-[#64748B] text-[9px] mt-0.5">
                          {edu.startDate} – {edu.endDate} {edu.gpa ? `| GPA: ${edu.gpa}` : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skillList.length > 0 && (
                <div className="flex flex-col gap-1.5 mt-1">
                  <h2 className="text-[11px] font-black uppercase text-[#0B132B] border-b-[1.5px] border-[#0B132B] pb-0.5 tracking-wider">
                    SKILLS & TECH STACK
                  </h2>

                  <div className="flex flex-col gap-1.5 text-[9.5px] mt-0.5">
                    {skillList.length <= 8 ? (
                      <div className="flex flex-wrap gap-1">
                        {skillList.map((sk, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-800 font-medium">
                            {sk}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div>
                          <span className="font-extrabold text-[#0B132B] block">Core Technologies</span>
                          <span className="text-[#334155]">{skillList.slice(0, 8).join(', ')}</span>
                        </div>
                        {skillList.length > 8 && (
                          <div>
                            <span className="font-extrabold text-[#0B132B] block">Frameworks & Tools</span>
                            <span className="text-[#334155]">{skillList.slice(8, 16).join(', ')}</span>
                          </div>
                        )}
                        {skillList.length > 16 && (
                          <div>
                            <span className="font-extrabold text-[#0B132B] block">Infrastructure & Architecture</span>
                            <span className="text-[#334155]">{skillList.slice(16).join(', ')}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Certifications & Achievements */}
          {certList.length > 0 && (
            <div className="flex flex-col mt-2">
              <h2 className="text-[11px] font-black uppercase text-[#0B132B] border-b-[1.5px] border-[#0B132B] pb-0.5 tracking-wider">
                CERTIFICATIONS & ACHIEVEMENTS
              </h2>

              <div className="grid grid-cols-2 gap-4 text-[9.5px] mt-1.5">
                <ul className="list-disc list-outside ml-3.5 flex flex-col gap-0.5 text-[#1E293B]">
                  {certList.slice(0, Math.ceil(certList.length / 2)).map((c, idx) => (
                    <li key={idx} className="leading-snug">
                      {c}
                    </li>
                  ))}
                </ul>
                <ul className="list-disc list-outside ml-3.5 flex flex-col gap-0.5 text-[#1E293B]">
                  {certList.slice(Math.ceil(certList.length / 2)).map((c, idx) => (
                    <li key={idx} className="leading-snug">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          2. MODERN EXECUTIVE (Terracotta Left Accent)
         ========================================================================= */}
      {templateId === 'modern_executive' && (
        <div className="flex flex-col gap-4 border-l-4 border-[#C85A32] pl-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">{fullName || 'YOUR NAME'}</h1>
            <div className="text-xs text-[#C85A32] font-semibold flex flex-wrap gap-2 mt-1">
              {email && <span>{email}</span>}
              {phone && <span>• {phone}</span>}
              {location && <span>• {location}</span>}
            </div>
          </div>
          {summary && (
            <div className="bg-[#FAF6F0] border-l-2 border-[#C85A32] p-3 rounded-r">
              <p className="text-xs text-gray-800 leading-relaxed italic">{summary}</p>
            </div>
          )}
          {expList.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-black text-[#C85A32] uppercase tracking-wider border-b border-[#EAE3D5] pb-1">
                Work Experience
              </h3>
              {expList.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-0.5">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>{exp.role} @ {exp.company}</span>
                    <span className="text-gray-500 text-[11px]">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-gray-700">
                    {exp.bullets?.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          3. MINIMALIST TECH (Terminal Monospace)
         ========================================================================= */}
      {templateId === 'minimalist_tech' && (
        <div className="flex flex-col gap-4 font-mono">
          <div className="border-b-2 border-black pb-3">
            <h1 className="text-2xl font-black uppercase text-black tracking-tight">{fullName || 'YOUR NAME'}</h1>
            <div className="text-xs text-gray-700 flex flex-wrap gap-3 font-semibold mt-1">
              {email && <span>{email}</span>}
              {phone && <span>• {phone}</span>}
            </div>
          </div>
          {summary && (
            <div className="p-3 bg-gray-100 rounded text-xs leading-relaxed text-black">
              // {summary}
            </div>
          )}
          {expList.length > 0 && (
            <div className="flex flex-col gap-3 font-sans">
              <h3 className="text-xs font-black uppercase text-black tracking-widest border-b border-black pb-0.5 font-mono">
                01 // EXPERIENCE
              </h3>
              {expList.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-0.5 text-xs">
                  <div className="flex justify-between font-bold text-black font-mono">
                    <span>{exp.role} @ {exp.company}</span>
                    <span className="text-gray-600">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-800">
                    {exp.bullets?.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          4. NAVY SIDEBAR (Two-Column Dark Navy)
         ========================================================================= */}
      {templateId === 'navy_sidebar' && (
        <div className="grid grid-cols-12 gap-6 h-full min-h-[900px] -m-8">
          <div className="col-span-4 bg-[#0B1E36] text-white p-6 flex flex-col gap-5 text-xs">
            <div>
              <h1 className="text-xl font-black text-white leading-tight">{fullName || 'YOUR NAME'}</h1>
              <span className="text-sky-300 font-medium text-[10.5px]">{location}</span>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-sky-900 pt-3">
              <span className="font-bold uppercase text-[10px] text-sky-400">Contact</span>
              <span className="text-gray-300 break-all">{email}</span>
              <span className="text-gray-300">{phone}</span>
            </div>
            {eduList.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-sky-900 pt-3">
                <span className="font-bold uppercase text-[10px] text-sky-400">Education</span>
                {eduList.map((edu) => (
                  <div key={edu.id} className="flex flex-col text-[10.5px]">
                    <span className="font-bold text-white">{edu.institution}</span>
                    <span className="text-gray-300">{edu.degree}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-span-8 p-6 pl-2 flex flex-col gap-4 text-xs">
            {summary && (
              <div>
                <h3 className="font-black text-[#0B1E36] uppercase text-[11px] border-b border-gray-200 pb-0.5">
                  Summary
                </h3>
                <p className="text-gray-800 leading-relaxed mt-1">{summary}</p>
              </div>
            )}
            {expList.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="font-black text-[#0B1E36] uppercase text-[11px] border-b border-gray-200 pb-0.5">
                  Experience
                </h3>
                {expList.map((exp) => (
                  <div key={exp.id} className="flex flex-col gap-0.5">
                    <div className="flex justify-between font-bold text-gray-900">
                      <span>{exp.role} — <span className="text-[#0B1E36]">{exp.company}</span></span>
                      <span className="text-gray-500 font-normal text-[10.5px]">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-700">
                      {exp.bullets?.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
