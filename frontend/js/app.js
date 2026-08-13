/* ==========================================================================
   Callback AI — Frontend Core JavaScript Logic Engine
   Author: Ayush Mishra
   ========================================================================== */

// Global Application State
const AppState = {
  activeResumeId: 'demo-resume-ayush-1',
  selectedTemplate: 'modern_executive',
  zoomLevel: 100,
  candidateData: {
    personalInfo: {
      fullName: 'Ayush Mishra',
      email: 'ayush.mishra@demo.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/ayushmishradev',
      github: 'github.com/ayushmishra-ai',
      summary: 'Passionate Full-Stack AI Engineer with 4+ years of experience architecting high-throughput distributed systems, vector search pipelines, and intuitive React web applications. Proven track record reducing API latency by 45% and driving 3M+ active user growth.'
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
          'Mentored 5 junior developers and instituted automated CI/CD code quality checks, improving deployment velocity by 40%.'
        ]
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
          'Optimized PostgreSQL query index strategies, cutting complex aggregation runtimes from 4.2s to 210ms.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        institution: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        startDate: '2017-08',
        endDate: '2021-05',
        gpa: '3.88 / 4.0'
      }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'NeuroDraft — Agentic Document Copilot',
        techStack: 'Next.js, Python FastAPI, PgVector, Anthropic API',
        link: 'github.com/ayushmishra-ai/neurodraft',
        bullets: [
          'Built multi-agent document analysis workspace featuring real-time collaborative editing and voice feedback.',
          'Starred by 1.2k developers on GitHub; deployed live to 10k monthly active users.'
        ]
      }
    ],
    skills: ['TypeScript', 'React', 'Next.js', 'Python', 'Rust', 'PgVector', 'PostgreSQL', 'Tailwind CSS', 'AWS', 'Docker', 'Prisma', 'Claude API']
  }
};

// Reset State to Empty Canvas
function clearCandidateData() {
  AppState.candidateData = {
    personalInfo: { fullName: '', email: '', phone: '', location: '', linkedin: '', github: '', summary: '' },
    experiences: [],
    education: [],
    projects: [],
    skills: []
  };
  renderAll();
}

// Live Resume Template Render Engine
function renderResumeHTML(data, templateId) {
  const p = data.personalInfo;
  const exps = data.experiences;
  const edus = data.education;
  const projs = data.projects;
  const sks = data.skills;

  const hasData = p.fullName || p.email || exps.length > 0 || sks.length > 0;
  if (!hasData) {
    return `
      <div style="padding: 4rem; text-align: center; color: #786F68; font-size: 0.9rem;">
        <h3 style="font-weight: 800; color: #231F1D; margin-bottom: 0.5rem;">Your Resume Canvas is Empty</h3>
        <p>Type your career details on the left form panel to live-render your resume.</p>
      </div>
    `;
  }

  // 1. Modern Executive (Terracotta Theme)
  if (templateId === 'modern_executive') {
    return `
      <div style="font-family: Inter, sans-serif; display: flex; flex-direction: column; gap: 1.25rem;">
        <div style="padding: 1.25rem; background: #FAF6F0; border-left: 4px solid #C85A32; border-radius: 0 0.75rem 0.75rem 0;">
          <h1 style="font-size: 1.5rem; font-weight: 800; color: #231F1D;">${p.fullName || 'YOUR NAME'}</h1>
          <div style="font-size: 0.75rem; color: #786F68; font-weight: 600; margin-top: 0.25rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
            ${p.location ? `<span>${p.location}</span>` : ''}
            ${p.email ? `<span>• ${p.email}</span>` : ''}
            ${p.phone ? `<span>• ${p.phone}</span>` : ''}
            ${p.linkedin ? `<span style="color: #C85A32;">• ${p.linkedin}</span>` : ''}
          </div>
          ${p.summary ? `<p style="font-size: 0.75rem; color: #4A423C; margin-top: 0.5rem; font-style: italic;">${p.summary}</p>` : ''}
        </div>

        ${exps.length > 0 ? `
          <div>
            <h3 style="font-size: 0.75rem; font-weight: 800; color: #C85A32; text-transform: uppercase; border-bottom: 1px solid #F6DCD1; padding-bottom: 0.25rem; margin-bottom: 0.75rem;">Professional Experience</h3>
            ${exps.map(e => `
              <div style="background: #FAF6F0; padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 0.5rem; border: 1px solid #EAE3D5;">
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 800; color: #231F1D;">
                  <span><span style="color: #C85A32;">${e.role}</span> at ${e.company}</span>
                  <span style="color: #786F68; font-weight: 600;">${e.startDate} – ${e.endDate}</span>
                </div>
                <ul style="font-size: 0.75rem; margin-top: 0.35rem; padding-left: 1.25rem; color: #231F1D;">
                  ${e.bullets.map(b => `<li style="margin-bottom: 0.25rem;">${b}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${sks.length > 0 ? `
          <div>
            <h3 style="font-size: 0.75rem; font-weight: 800; color: #C85A32; text-transform: uppercase; border-bottom: 1px solid #F6DCD1; padding-bottom: 0.25rem; margin-bottom: 0.5rem;">Core Competencies</h3>
            <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
              ${sks.map(s => `<span style="padding: 0.25rem 0.65rem; background: #FDF4F0; border: 1px solid #F6DCD1; color: #C85A32; font-size: 0.7rem; font-weight: 700; border-radius: 9999px;">${s}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  // 2. Classic ATS Standard
  if (templateId === 'classic_ats') {
    return `
      <div style="font-family: Georgia, serif; display: flex; flex-direction: column; gap: 1.25rem;">
        <div style="text-align: center; border-bottom: 2px solid #231F1D; padding-bottom: 0.75rem;">
          <h1 style="font-size: 1.5rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">${p.fullName || 'YOUR NAME'}</h1>
          <div style="font-size: 0.75rem; color: #4A423C; margin-top: 0.25rem;">
            ${p.location} • ${p.phone} • ${p.email} • ${p.linkedin}
          </div>
        </div>

        ${p.summary ? `
          <div>
            <h3 style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 0.25rem;">Summary</h3>
            <p style="font-size: 0.75rem; color: #222; margin-top: 0.35rem; text-align: justify;">${p.summary}</p>
          </div>
        ` : ''}

        ${exps.length > 0 ? `
          <div>
            <h3 style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 0.25rem; margin-bottom: 0.5rem;">Work Experience</h3>
            ${exps.map(e => `
              <div style="margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 800;">
                  <span>${e.role} — <span style="font-weight: 600;">${e.company}</span></span>
                  <span style="font-weight: 400; color: #666;">${e.startDate} – ${e.endDate}</span>
                </div>
                <ul style="font-size: 0.75rem; margin-top: 0.25rem; padding-left: 1.25rem;">
                  ${e.bullets.map(b => `<li>${b}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  // Fallback Modern
  return renderResumeHTML(data, 'modern_executive');
}

// RAG Agent Question Answer Engine
function askAgent(question) {
  const q = question.toLowerCase();
  const name = AppState.candidateData.personalInfo.fullName || 'Ayush Mishra';

  if (q.includes('latency') || q.includes('achievement') || q.includes('biggest')) {
    return {
      reply: `${name}'s biggest technical achievement was architecting a high-throughput RAG query pipeline at Aether Cloud using Next.js 14, PgVector, and Claude 3.5 Sonnet. This pipeline handled 150k daily active requests while reducing p95 API response latency by 45% (down to 180ms).`,
      source: 'Experience #1 — Aether Cloud Tech'
    };
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('technology')) {
    return {
      reply: `${name} has extensive expertise in TypeScript, React, Next.js, Python, PostgreSQL, and PgVector vector search pipelines, with supplementary proficiency in Rust and AWS Cloud infrastructure.`,
      source: 'Skills & Technical Entity Graph'
    };
  }

  return {
    reply: `${name} is a Senior Full-Stack AI Engineer with 4+ years of experience scaling systems to 150k DAU, reducing latency by 45%, and building grounded candidate agents.`,
    source: 'Verified Personal Record'
  };
}

// UI Re-render trigger
function renderAll() {
  const previewBox = document.getElementById('resume-preview-target');
  if (previewBox) {
    previewBox.innerHTML = renderResumeHTML(AppState.candidateData, AppState.selectedTemplate);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
});
