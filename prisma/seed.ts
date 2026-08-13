import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing tables
  await prisma.applicationDraft.deleteMany();
  await prisma.jobPosting.deleteMany();
  await prisma.agentConversation.deleteMany();
  await prisma.embeddingChunk.deleteMany();
  await prisma.verificationClaim.deleteMany();
  await prisma.analysisResult.deleteMany();
  await prisma.matchResult.deleteMany();
  await prisma.jobDescription.deleteMany();
  await prisma.skillGraph.deleteMany();
  await prisma.resumeSection.deleteMany();
  await prisma.resume.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Users
  const alexCandidate = await prisma.user.create({
    data: {
      id: 'demo-user-alex',
      email: 'ayush.mishra@demo.com',
      name: 'Ayush Mishra',
      passwordHash: 'demo_hashed_pass_123',
      role: 'candidate',
    },
  });

  const priyaCandidate = await prisma.user.create({
    data: {
      id: 'demo-user-priya',
      email: 'priya.sharma@demo.com',
      name: 'Priya Sharma',
      passwordHash: 'demo_hashed_pass_456',
      role: 'candidate',
    },
  });

  const sarahRecruiter = await prisma.user.create({
    data: {
      id: 'demo-user-sarah',
      email: 'sarah.jenkins@techcorp.com',
      name: 'Sarah Jenkins (TechCorp Recruiter)',
      passwordHash: 'demo_hashed_pass_789',
      role: 'recruiter',
    },
  });

  console.log('✅ Created Demo Users (Candidate & Recruiter)');

  // 2. Create Resumes for Ayush Mishra
  const alexResume = await prisma.resume.create({
    data: {
      id: 'demo-resume-alex-1',
      userId: alexCandidate.id,
      title: 'Ayush Mishra — Senior Full-Stack & AI Engineer',
      isActive: true,
    },
  });

  // Sections for Ayush
  const alexSections = [
    {
      sectionType: 'personal_info',
      order: 1,
      content: JSON.stringify({
        fullName: 'Ayush Mishra',
        email: 'ayush.mishra@demo.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/ayushmishradev',
        github: 'github.com/ayushmishra-ai',
        website: 'ayushmishra.dev',
        summary: 'Passionate Full-Stack AI Engineer with 4+ years of experience architecting high-throughput distributed systems, vector search pipelines, and intuitive React web applications. Proven track record reducing API latency by 45% and driving 3M+ active user growth.',
      }),
    },
    {
      sectionType: 'experience',
      order: 2,
      content: JSON.stringify([
        {
          id: 'exp-1',
          role: 'Senior Full-Stack AI Engineer',
          company: 'Aether Cloud Tech',
          location: 'San Francisco, CA',
          startDate: '2023-01',
          endDate: 'Present',
          isCurrent: true,
          description: 'Led the core AI platform team building LLM orchestration and retrieval pipelines.',
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
          isCurrent: false,
          description: 'Developed real-time analytics dashboard and event streaming infrastructure.',
          bullets: [
            'Built responsive React + TypeScript analytics portal used by 45k enterprise business managers.',
            'Optimized PostgreSQL query index strategies, cutting complex aggregation runtimes from 4.2s to 210ms.',
            'Integrated Stripe billing and subscription webhooks processing $2.4M annually with 99.99% uptime.',
          ],
        },
      ]),
    },
    {
      sectionType: 'projects',
      order: 3,
      content: JSON.stringify([
        {
          id: 'proj-1',
          title: 'NeuroDraft — Agentic Document Copilot',
          link: 'github.com/alexmorgan-ai/neurodraft',
          techStack: 'Next.js, Python FastAPI, PgVector, Anthropic API',
          startDate: '2023-09',
          endDate: '2023-11',
          bullets: [
            'Built multi-agent document analysis workspace featuring real-time collaborative editing and voice feedback.',
            'Starred by 1.2k developers on GitHub; deployed live to 10k monthly active users.',
          ],
        },
        {
          id: 'proj-2',
          title: 'HyperCache — Memory-Efficient Vector Store',
          link: 'github.com/alexmorgan-ai/hypercache',
          techStack: 'Rust, TypeScript, Node.js',
          startDate: '2022-03',
          endDate: '2022-05',
          bullets: [
            'Developed high-speed in-memory vector index delivering sub-10ms nearest neighbor queries for 1M embeddings.',
          ],
        },
      ]),
    },
    {
      sectionType: 'education',
      order: 4,
      content: JSON.stringify([
        {
          id: 'edu-1',
          degree: 'B.S. in Computer Science',
          institution: 'University of California, Berkeley',
          location: 'Berkeley, CA',
          startDate: '2017-08',
          endDate: '2021-05',
          gpa: '3.88 / 4.0',
          highlights: 'Dean’s Honors List (4 terms), President of Artificial Intelligence Student Society.',
        },
      ]),
    },
    {
      sectionType: 'skills',
      order: 5,
      content: JSON.stringify({
        categories: [
          { name: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Rust', 'SQL', 'HTML5/CSS3'] },
          { name: 'Frameworks & Libraries', items: ['Next.js', 'React', 'Node.js', 'FastAPI', 'Tailwind CSS', 'Prisma', 'Express'] },
          { name: 'AI & Data Stores', items: ['Vector Search (PgVector)', 'Anthropic Claude API', 'OpenAI API', 'PostgreSQL', 'Redis', 'Pinecone'] },
          { name: 'DevOps & Tools', items: ['Docker', 'AWS (ECS, S3)', 'Git', 'Vercel', 'CI/CD Pipelines'] },
        ],
      }),
    },
    {
      sectionType: 'certifications',
      order: 6,
      content: JSON.stringify([
        { id: 'cert-1', name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', issueDate: '2023-04' },
        { id: 'cert-2', name: 'Deep Learning Specialization', issuer: 'Coursera / DeepLearning.AI', issueDate: '2022-08' },
      ]),
    },
    {
      sectionType: 'achievements',
      order: 7,
      content: JSON.stringify([
        'Winner (1st Place out of 120 teams) - CalHacks AI Innovation Challenge 2023.',
        'Author of open-source Rust vector library downloaded 80k+ times on Crates.io.',
      ]),
    },
  ];

  for (const s of alexSections) {
    await prisma.resumeSection.create({
      data: {
        resumeId: alexResume.id,
        sectionType: s.sectionType,
        order: s.order,
        content: s.content,
      },
    });
  }

  console.log('✅ Created Ayush Mishra Resume & Sections');

  // 3. Populate SkillGraph for Alex
  const skillsForAlex = [
    { name: 'Next.js', signal: 0.95, evidence: [{ text: 'Built Aether Cloud RAG query pipeline & React portal' }] },
    { name: 'TypeScript', signal: 0.94, evidence: [{ text: 'Core language across Aether Cloud and Pulse Digital' }] },
    { name: 'Python', signal: 0.90, evidence: [{ text: 'FastAPI backends and LLM orchestration scripts' }] },
    { name: 'PgVector & Vector Search', signal: 0.92, evidence: [{ text: 'Implemented RAG and vector similarity search in production' }] },
    { name: 'PostgreSQL', signal: 0.88, evidence: [{ text: 'Optimized complex query execution down to 210ms' }] },
    { name: 'LLM Orchestration (Claude/OpenAI)', signal: 0.93, evidence: [{ text: 'Grounding evaluation framework & prompt engineering' }] },
    { name: 'Rust', signal: 0.78, evidence: [{ text: 'HyperCache vector index open-source project' }] },
  ];

  for (const sk of skillsForAlex) {
    await prisma.skillGraph.create({
      data: {
        userId: alexCandidate.id,
        skillName: sk.name,
        proficiencySignal: sk.signal,
        evidenceJson: JSON.stringify(sk.evidence),
      },
    });
  }

  console.log('✅ Created Persistent Skill Graph');

  // 4. Initial ATS Analysis Result for Alex
  await prisma.analysisResult.create({
    data: {
      resumeId: alexResume.id,
      atsScore: 92,
      formattingIssuesJson: JSON.stringify([
        'Minor: Contact links rely on shorthand text without full http:// protocol.',
      ]),
      missingSectionsJson: JSON.stringify(['Interests (Optional)']),
      readabilityScore: 88,
      grammarIssuesJson: JSON.stringify([
        {
          original: 'Led the core AI platform team building LLM orchestration',
          suggestion: 'Led the core AI platform team in building high-performance LLM orchestration',
          reason: 'Stronger action clarity and precision',
        },
      ]),
      overallStrengthScore: 94,
      scoringRubricBreakdownJson: JSON.stringify({
        impactQuantification: { score: 95, weight: '30%', notes: 'Exceptional action verbs tied to metrics (45% latency, 150k DAU, $2.4M).' },
        atsStructure: { score: 92, weight: '25%', notes: 'Clean single-column structure with standard section headers.' },
        relevanceAndSkills: { score: 94, weight: '25%', notes: 'High density of modern in-demand technologies.' },
        grammarAndTone: { score: 90, weight: '20%', notes: 'Clear active voice throughout.' },
      }),
    },
  });

  // 5. Initial Verification Claims for Alex
  const claims = [
    {
      claimText: 'Architected scalable RAG query pipeline using Next.js 14, PgVector, and Claude Sonnet handling 150k daily active requests',
      status: 'verified',
      evidenceSource: 'GitHub: alexmorgan-ai/neurodraft & public benchmark commits',
      confidenceNote: 'Codebase repository confirms PgVector integration and API routes matching description.',
      specificityScore: 96,
    },
    {
      claimText: 'Starred by 1.2k developers on GitHub; deployed live to 10k monthly active users',
      status: 'verified',
      evidenceSource: 'GitHub API verification',
      confidenceNote: 'Repository metrics verified on public GitHub API.',
      specificityScore: 92,
    },
    {
      claimText: 'B.S. in Computer Science - UC Berkeley (GPA 3.88)',
      status: 'verified',
      evidenceSource: 'UC Berkeley Registrar Verification Signal',
      confidenceNote: 'Degree, term dates, and honors match standard university format.',
      specificityScore: 98,
    },
    {
      claimText: 'AWS Certified Solutions Architect – Associate',
      status: 'verified',
      evidenceSource: 'AWS Credly Badge Verification ID #98234-AWS',
      confidenceNote: 'Active certification record confirmed.',
      specificityScore: 95,
    },
    {
      claimText: 'Mentored 5 junior developers and instituted automated CI/CD code quality checks',
      status: 'unverifiable',
      evidenceSource: 'Internal organizational claim',
      confidenceNote: 'Absence of external public metrics (common for internal team leadership claims).',
      specificityScore: 78,
    },
  ];

  for (const c of claims) {
    await prisma.verificationClaim.create({
      data: {
        resumeId: alexResume.id,
        claimText: c.claimText,
        status: c.status,
        evidenceSource: c.evidenceSource,
        confidenceNote: c.confidenceNote,
        specificityScore: c.specificityScore,
      },
    });
  }

  console.log('✅ Created Verification Claims & Trust Score Data');

  // 6. Pre-seeded Job Postings for Opportunities (Auto-Apply Feature)
  const postings = [
    {
      id: 'job-posting-1',
      title: 'Senior AI Application Engineer',
      company: 'Vercel Labs',
      location: 'San Francisco, CA (Hybrid)',
      rawDescription: 'We are seeking a Senior AI Application Engineer to build next-generation developer workflows with Next.js, PgVector, and Anthropic APIs. Requirements: 3+ years experience with Next.js, vector databases, TypeScript, and high-throughput API design.',
      parsedRequirementsJson: JSON.stringify({
        requiredSkills: ['Next.js', 'TypeScript', 'Vector Search (PgVector)', 'LLM Orchestration'],
        preferredSkills: ['Rust', 'Docker', 'AWS'],
        minYearsExperience: 3,
      }),
      postedDate: '1 day ago',
    },
    {
      id: 'job-posting-2',
      title: 'Full-Stack Platform Engineer',
      company: 'Linear Inc.',
      location: 'Remote',
      rawDescription: 'Linear is looking for a craft-obsessed Full-Stack Engineer. You will work on real-time sync engines, sleek React UIs, and high-performance Postgres backends. Experience with React, Node.js, and latency optimization is required.',
      parsedRequirementsJson: JSON.stringify({
        requiredSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Performance Optimization'],
        preferredSkills: ['GraphQL', 'WebSockets'],
        minYearsExperience: 2,
      }),
      postedDate: '3 days ago',
    },
    {
      id: 'job-posting-3',
      title: 'Staff AI Solutions Architect',
      company: 'Scale AI',
      location: 'San Francisco, CA',
      rawDescription: 'Lead technical design for enterprise LLM evaluation and data pipeline integrations. Requires strong Python, vector database systems, and client-facing engineering leadership.',
      parsedRequirementsJson: JSON.stringify({
        requiredSkills: ['Python', 'LLM Evaluation', 'Vector Databases', 'System Architecture'],
        preferredSkills: ['Enterprise Sales Support', 'PyTorch'],
        minYearsExperience: 5,
      }),
      postedDate: 'Just now',
    },
  ];

  for (const p of postings) {
    await prisma.jobPosting.create({
      data: p,
    });
  }

  console.log('✅ Created Job Postings for Opportunities');

  // 7. Seed Job Description for JD Matching
  const sampleJD = await prisma.jobDescription.create({
    data: {
      id: 'demo-jd-1',
      userId: alexCandidate.id,
      title: 'Senior AI Engineer — Vercel Labs',
      rawText: `Role: Senior AI Engineer at Vercel Labs
Requirements:
- 3+ years of professional full-stack development experience using Next.js, React, and TypeScript.
- Hands-on expertise building production RAG applications with PgVector or vector databases.
- Experience with LLM prompt engineering, evaluation frameworks, and latency optimization.
- Familiarity with Cloud infrastructure (AWS/Docker) and CI/CD pipelines.
- Bachelor's degree in Computer Science or equivalent experience.`,
      parsedRequirementsJson: JSON.stringify({
        title: 'Senior AI Engineer',
        company: 'Vercel Labs',
        requiredSkills: ['Next.js', 'TypeScript', 'React', 'PgVector', 'RAG', 'LLM Prompting'],
        preferredSkills: ['AWS', 'Docker', 'CI/CD'],
        keywords: ['Next.js', 'TypeScript', 'PgVector', 'RAG', 'Claude', 'Latency Optimization', 'CI/CD'],
      }),
    },
  });

  await prisma.matchResult.create({
    data: {
      resumeId: alexResume.id,
      jobDescriptionId: sampleJD.id,
      overallMatchPercentage: 94,
      missingKeywordsJson: JSON.stringify(['Docker (in Experience header)', 'AWS Lambda']),
      skillGapsJson: JSON.stringify(['AWS Lambda microservices']),
      experienceGapsJson: JSON.stringify(['No major explicit gaps; experience aligns closely with requirements.']),
      recommendationsJson: JSON.stringify([
        'Highlight your AWS Certified Solutions Architect badge more prominently near the skills section.',
        'Explicitly mention latency optimization metrics in the summary statement.',
      ]),
    },
  });

  console.log('✅ Seeded Job Description & Match Result');
  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
