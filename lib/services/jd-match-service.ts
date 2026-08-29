/**
 * ============================================================================
 * 🎯 SEMANTIC JOB DESCRIPTION (JD) MATCHING ENGINE
 * ============================================================================
 * 
 * CORE PURPOSE:
 * Analyzes target Job Descriptions, extracts required skills/qualifications,
 * compares against candidate resume sections, and provides tailoring suggestions.
 * 
 * ALGORITHM:
 * 1. Keyword Tokenization: Extracts skills across Languages, Frameworks, Cloud, ML.
 * 2. Multi-Tier Scoring: Computes Technical Skills (40%), Experience Depth (35%), Domain/Role fit (25%).
 * 3. Gap Analysis: Identifies critical missing keywords & generates XYZ-tailored bullet suggestions.
 */

import { db } from '@/lib/db';
import { getResumeWithSections } from '@/lib/services/resume-service';
import { executeMultiProviderLLM } from '@/lib/services/llm-provider';

export interface MatchedKeywordItem {
  name: string;
  category: 'core_skill' | 'framework' | 'cloud_devops' | 'architecture' | 'ai_data' | 'tool';
  candidateContext: string;
}

export interface MissingKeywordItem {
  name: string;
  category: 'core_skill' | 'framework' | 'cloud_devops' | 'architecture' | 'ai_data' | 'tool';
  importance: 'critical' | 'high' | 'medium';
  recommendation: string;
}

export interface TailoringRecommendationItem {
  targetSection: string;
  roleOrProject?: string;
  originalSnippet: string;
  tailoredRewrite: string;
  reason: string;
  keywordsAdded: string[];
}

export interface MatchResultOutput {
  matchPercentage: number;
  subScores: {
    technicalSkills: number;
    experienceDepth: number;
    domainArchitecture: number;
    keywordDensity: number;
  };
  fitGrade: 'Exceptional Fit' | 'Strong Fit' | 'Moderate Fit' | 'Needs Tailoring';
  fitSummary: string;
  matchedKeywords: MatchedKeywordItem[];
  missingKeywords: string[]; // For backwards-compatibility
  missingKeywordsDetailed: MissingKeywordItem[];
  skillGaps: string[];
  experienceGaps: string[];
  recommendations: string[];
  tailoringRecommendations: TailoringRecommendationItem[];
  parsedRequirements: {
    title: string;
    requiredSkills: string[];
    preferredSkills: string[];
    minYearsExperience: number;
    coreDomain: string;
  };
  tailoredResumeSnapshot?: {
    suggestedSummary: string;
    suggestedSkills: string[];
    tailoredBullets: { role: string; company: string; originalBullet: string; tailoredBullet: string }[];
  };
}

// Comprehensive taxonomy of tech skills, frameworks, tools, architectures & synonyms
const TECH_TAXONOMY: { name: string; category: MatchedKeywordItem['category']; aliases: string[] }[] = [
  { name: 'Next.js', category: 'framework', aliases: ['nextjs', 'next.js', 'next 14', 'next 15', 'next 16', 'app router'] },
  { name: 'React', category: 'framework', aliases: ['react', 'react.js', 'reactjs', 'react 19', 'react hooks'] },
  { name: 'TypeScript', category: 'core_skill', aliases: ['typescript', 'ts'] },
  { name: 'JavaScript', category: 'core_skill', aliases: ['javascript', 'js', 'es6', 'ecmascript'] },
  { name: 'Python', category: 'core_skill', aliases: ['python', 'python3', 'py'] },
  { name: 'Node.js', category: 'framework', aliases: ['nodejs', 'node.js', 'node'] },
  { name: 'PostgreSQL', category: 'core_skill', aliases: ['postgresql', 'postgres', 'psql'] },
  { name: 'PgVector', category: 'ai_data', aliases: ['pgvector', 'vector embeddings', 'vector database', 'pg_vector'] },
  { name: 'RAG Architecture', category: 'ai_data', aliases: ['rag', 'retrieval-augmented generation', 'retrieval augmented generation', 'rag pipeline'] },
  { name: 'LLM Prompting & Eval', category: 'ai_data', aliases: ['llm', 'prompt engineering', 'large language models', 'openai api', 'claude api', 'langchain', 'llamaindex'] },
  { name: 'Docker', category: 'cloud_devops', aliases: ['docker', 'containerization', 'dockerfile', 'docker compose'] },
  { name: 'Kubernetes', category: 'cloud_devops', aliases: ['kubernetes', 'k8s', 'k8s clusters', 'helm'] },
  { name: 'AWS Cloud', category: 'cloud_devops', aliases: ['aws', 'amazon web services', 's3', 'ec2', 'lambda', 'sqs', 'sns', 'ecs'] },
  { name: 'GCP', category: 'cloud_devops', aliases: ['gcp', 'google cloud platform', 'google cloud', 'bigquery', 'cloud run'] },
  { name: 'CI/CD Pipelines', category: 'cloud_devops', aliases: ['ci/cd', 'github actions', 'gitlab ci', 'jenkins', 'argo cd'] },
  { name: 'GraphQL', category: 'architecture', aliases: ['graphql', 'apollo graphql', 'relay'] },
  { name: 'RESTful APIs', category: 'architecture', aliases: ['rest', 'rest api', 'restful', 'rest apis', 'openapi'] },
  { name: 'Tailwind CSS', category: 'framework', aliases: ['tailwind', 'tailwindcss', 'tailwind css'] },
  { name: 'Redis', category: 'ai_data', aliases: ['redis', 'caching', 'redis pub/sub'] },
  { name: 'Kafka', category: 'architecture', aliases: ['kafka', 'apache kafka', 'event streaming', 'event-driven'] },
  { name: 'Microservices', category: 'architecture', aliases: ['microservices', 'distributed systems', 'service-oriented'] },
  { name: 'Prisma ORM', category: 'framework', aliases: ['prisma', 'prisma orm', 'drizzle', 'typeorm'] },
  { name: 'FastAPI', category: 'framework', aliases: ['fastapi', 'fast api', 'pydantic'] },
  { name: 'MongoDB', category: 'core_skill', aliases: ['mongodb', 'mongo', 'nosql', 'document db'] },
  { name: 'Terraform', category: 'cloud_devops', aliases: ['terraform', 'iac', 'infrastructure as code'] },
  { name: 'Vector DBs', category: 'ai_data', aliases: ['pinecone', 'weaviate', 'chromadb', 'qdrant', 'milvus'] },
  { name: 'Testing & TDD', category: 'tool', aliases: ['jest', 'vitest', 'cypress', 'playwright', 'tdd', 'unit testing'] },
  { name: 'System Design', category: 'architecture', aliases: ['system design', 'high throughput', 'low latency', 'scalability', 'fault tolerance'] },
];

export async function matchResumeWithJD(
  resumeId: string,
  jdText: string,
  clientContext?: {
    personalInfo?: any;
    experiences?: any[];
    experience?: any[];
    projects?: any[];
    skills?: string[];
  }
): Promise<MatchResultOutput> {
  // Extract parsed structured content
  let resume: any = null;
  let candidateName = 'Candidate';
  let candidateRole = 'Software Engineer';
  let parsedExperiences: any[] = [];
  let parsedProjects: any[] = [];
  let parsedSkills: string[] = [];
  let parsedSummary = '';

  if (clientContext) {
    if (clientContext.personalInfo?.fullName) candidateName = clientContext.personalInfo.fullName;
    if (clientContext.personalInfo?.title) candidateRole = clientContext.personalInfo.title;
    if (clientContext.personalInfo?.summary) parsedSummary = clientContext.personalInfo.summary;
    if (Array.isArray(clientContext.experiences)) parsedExperiences = clientContext.experiences;
    else if (Array.isArray(clientContext.experience)) parsedExperiences = clientContext.experience;
    if (Array.isArray(clientContext.projects)) parsedProjects = clientContext.projects;
    if (Array.isArray(clientContext.skills)) parsedSkills = clientContext.skills;
  }

  if (!parsedExperiences.length && !parsedSkills.length) {
    // 1. Fetch Candidate's Resume & Sections reliably (DB + in-memory cache)
    resume = await getResumeWithSections(resumeId);

    if (resume?.sections) {
      for (const sec of resume.sections) {
        try {
          const parsed = typeof sec.content === 'string' ? JSON.parse(sec.content) : sec.content;
          if (sec.sectionType === 'personal_info') {
            if (parsed.fullName) candidateName = parsed.fullName;
            if (parsed.summary) parsedSummary = parsed.summary;
          } else if (sec.sectionType === 'experience' && Array.isArray(parsed)) {
            parsedExperiences = parsed;
            if (parsed[0]?.role) candidateRole = parsed[0].role;
          } else if (sec.sectionType === 'projects' && Array.isArray(parsed)) {
            parsedProjects = parsed;
          } else if (sec.sectionType === 'skills') {
            if (Array.isArray(parsed)) parsedSkills = parsed;
            else if (typeof parsed === 'object') {
              parsedSkills = Object.values(parsed).flatMap((v: any) => (Array.isArray(v) ? v : [v]));
            }
          }
        } catch (e) {
          console.error(`Failed to parse section ${sec.sectionType}:`, e);
        }
      }
    }
  }

  // Combine entire candidate text for deep full-text semantic searching
  const candidateFullText = [
    candidateName,
    candidateRole,
    parsedSummary,
    ...parsedSkills,
    ...parsedExperiences.flatMap((e: any) => [e.role, e.company, ...(e.bullets || [])]),
    ...parsedProjects.flatMap((p: any) => [p.title, p.techStack, ...(p.bullets || [])]),
  ].join(' ').toLowerCase();

  const jdLower = jdText.toLowerCase();

  // 2. Check for live LLM API keys (Groq LPU / NVIDIA / OpenAI / Anthropic / OpenRouter)
  const groqKey = process.env.GROQ_API_KEY;
  const nvidiaKey = process.env.NVIDIA_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openRouterKey = process.env.OPENROUTER_API_KEY;

  if (groqKey || nvidiaKey || openAiKey || anthropicKey || openRouterKey) {
    try {
      const llmResult = await callLlmMatcher({
        candidateName,
        candidateRole,
        parsedSkills,
        parsedExperiences,
        parsedProjects,
        parsedSummary,
        candidateFullText,
        jdText,
        groqKey,
        nvidiaKey,
        openAiKey,
        anthropicKey,
        openRouterKey,
      });

      if (llmResult && llmResult.matchPercentage > 0) {
        await saveMatchToDatabase(resume?.userId || 'demo-user-alex', resumeId, jdText, llmResult);
        return llmResult;
      }
    } catch (llmErr) {
      console.warn('LLM API Matcher error, falling back to Deep Semantic Engine:', llmErr);
    }
  }

  // 3. Deep Deterministic Semantic & NLP Matcher Engine
  const output = executeSemanticMatchingEngine({
    candidateName,
    candidateRole,
    parsedSkills,
    parsedExperiences,
    parsedProjects,
    parsedSummary,
    candidateFullText,
    jdText,
    jdLower,
  });

  // 4. Persist to Database
  await saveMatchToDatabase(resume?.userId || 'demo-user-alex', resumeId, jdText, output);

  return output;
}

/**
 * Execute deep semantic matching against real candidate sections
 */
function executeSemanticMatchingEngine({
  candidateName,
  candidateRole,
  parsedSkills,
  parsedExperiences,
  parsedProjects,
  candidateFullText,
  jdText,
  jdLower,
}: {
  candidateName: string;
  candidateRole: string;
  parsedSkills: string[];
  parsedExperiences: any[];
  parsedProjects: any[];
  parsedSummary: string;
  candidateFullText: string;
  jdText: string;
  jdLower: string;
}): MatchResultOutput {
  const matchedKeywords: MatchedKeywordItem[] = [];
  const missingKeywordsDetailed: MissingKeywordItem[] = [];
  const requiredSkillsFoundInJd: string[] = [];

  // Match Taxonomy against JD
  for (const item of TECH_TAXONOMY) {
    const isPresentInJd = item.aliases.some((alias) => jdLower.includes(alias.toLowerCase()));
    if (isPresentInJd) {
      requiredSkillsFoundInJd.push(item.name);

      const isPresentInCandidate = item.aliases.some((alias) => candidateFullText.includes(alias.toLowerCase()));
      if (isPresentInCandidate) {
        // Find exact context snippet from candidate resume
        let contextSnippet = `Found in candidate skills / projects`;
        for (const exp of parsedExperiences) {
          const bulletMatch = exp.bullets?.find((b: string) =>
            item.aliases.some((alias) => b.toLowerCase().includes(alias.toLowerCase()))
          );
          if (bulletMatch) {
            contextSnippet = `${exp.company}: "${bulletMatch.slice(0, 75)}..."`;
            break;
          }
        }

        matchedKeywords.push({
          name: item.name,
          category: item.category,
          candidateContext: contextSnippet,
        });
      } else {
        // Missing skill
        missingKeywordsDetailed.push({
          name: item.name,
          category: item.category,
          importance: item.category === 'core_skill' || item.category === 'framework' ? 'critical' : 'high',
          recommendation: `Add verifiable experience or project proof using ${item.name} to align with target role.`,
        });
      }
    }
  }

  // If JD has custom phrases not in standard taxonomy, extract them
  const customJdKeywords = extractCustomKeywordsFromJd(jdText);
  for (const kw of customJdKeywords) {
    if (!requiredSkillsFoundInJd.some((s) => s.toLowerCase() === kw.toLowerCase())) {
      const inCandidate = candidateFullText.includes(kw.toLowerCase());
      if (inCandidate) {
        if (!matchedKeywords.some((m) => m.name.toLowerCase() === kw.toLowerCase())) {
          matchedKeywords.push({
            name: kw,
            category: 'tool',
            candidateContext: 'Verified in candidate experience history',
          });
        }
      } else {
        if (!missingKeywordsDetailed.some((m) => m.name.toLowerCase() === kw.toLowerCase())) {
          missingKeywordsDetailed.push({
            name: kw,
            category: 'core_skill',
            importance: 'medium',
            recommendation: `Target position specifically highlights ${kw}.`,
          });
        }
      }
    }
  }

  // Calculate Weighted Sub-Scores
  const totalChecked = matchedKeywords.length + missingKeywordsDetailed.length || 1;
  const rawTechRatio = Math.round((matchedKeywords.length / totalChecked) * 100);

  // Years of Experience check
  const expMatch = jdText.match(/(\d+)\+?\s*(?:to\s*\d+\s*)?(?:years?|yrs?)/i);
  const requiredYrs = expMatch ? parseInt(expMatch[1], 10) : 3;
  const candidateYrs = Math.max(parsedExperiences.length * 1.5, 2.5);
  const experienceDepthScore = Math.min(100, Math.round((candidateYrs / requiredYrs) * 90 + 10));

  const technicalSkillsScore = Math.min(98, Math.max(45, rawTechRatio));
  const domainArchitectureScore = matchedKeywords.some((m) => m.category === 'ai_data' || m.category === 'architecture')
    ? 94
    : 72;
  const keywordDensityScore = Math.min(95, Math.max(50, Math.round((matchedKeywords.length / (totalChecked + 2)) * 100 + 20)));

  // Overall Weighted Score
  const overallScore = Math.round(
    technicalSkillsScore * 0.4 +
    experienceDepthScore * 0.25 +
    domainArchitectureScore * 0.2 +
    keywordDensityScore * 0.15
  );

  const fitGrade: MatchResultOutput['fitGrade'] =
    overallScore >= 90 ? 'Exceptional Fit' :
    overallScore >= 75 ? 'Strong Fit' :
    overallScore >= 60 ? 'Moderate Fit' : 'Needs Tailoring';

  const fitSummary = `Candidate matches ${matchedKeywords.length} of ${totalChecked} detected requirements with strong technical grounding in ${matchedKeywords.slice(0, 3).map((m) => m.name).join(', ')}. Addressing ${missingKeywordsDetailed.length} missing skill areas will elevate ATS rank.`;

  // Generate Real, Context-Aware Tailoring Recommendations
  const tailoringRecommendations: TailoringRecommendationItem[] = [];

  const topMissing = missingKeywordsDetailed.slice(0, 3);
  const primaryExp = parsedExperiences[0] || {
    company: 'Leading AI Product',
    role: candidateRole,
    bullets: ['Developed full-stack web applications and scalable backend APIs.'],
  };

  if (topMissing.length > 0 && primaryExp.bullets && primaryExp.bullets[0]) {
    const originalBullet = primaryExp.bullets[0];
    const missingName = topMissing[0].name;

    tailoringRecommendations.push({
      targetSection: 'Experience Section',
      roleOrProject: `${primaryExp.role} at ${primaryExp.company}`,
      originalSnippet: originalBullet,
      tailoredRewrite: `Architected high-throughput services utilizing ${missingName} and ${matchedKeywords[0]?.name || 'TypeScript'}, processing 150k+ daily transactions while reducing p95 latency by 42%.`,
      reason: `Directly demonstrates required ${missingName} competency with quantified operational impact.`,
      keywordsAdded: [missingName, 'Latency Optimization', 'High-Throughput'],
    });
  }

  if (topMissing.length > 1 && (primaryExp.bullets?.[1] || parsedProjects[0])) {
    const originalBullet = primaryExp.bullets?.[1] || parsedProjects[0]?.bullets?.[0] || 'Implemented data pipeline and cloud deployment.';
    const secondMissing = topMissing[1].name;

    tailoringRecommendations.push({
      targetSection: 'Projects / Experience',
      roleOrProject: parsedProjects[0]?.title || primaryExp.company,
      originalSnippet: originalBullet,
      tailoredRewrite: `Engineered resilient ${secondMissing} deployment pipeline with automated telemetry and zero-downtime canary releases.`,
      reason: `Closes the gap on target job requirement for ${secondMissing}.`,
      keywordsAdded: [secondMissing, 'Telemetry', 'Canary Releases'],
    });
  }

  if (topMissing.length > 2) {
    const thirdMissing = topMissing[2].name;
    tailoringRecommendations.push({
      targetSection: 'Skills Summary & Header',
      originalSnippet: parsedSkills.slice(0, 6).join(', '),
      tailoredRewrite: `${parsedSkills.slice(0, 5).join(', ')}, ${thirdMissing} (Production Architecture & Deployment)`,
      reason: `Positions ${thirdMissing} prominently in technical skills taxonomy for immediate ATS keyword indexation.`,
      keywordsAdded: [thirdMissing],
    });
  }

  const legacyMissingKeywords = missingKeywordsDetailed.map((m) => m.name);
  const legacySkillGaps = missingKeywordsDetailed.map((m) => `${m.name} in production scale`);
  const legacyRecommendations = tailoringRecommendations.map((t) => `${t.reason} -> Suggestion: "${t.tailoredRewrite}"`);

  return {
    matchPercentage: overallScore,
    subScores: {
      technicalSkills: technicalSkillsScore,
      experienceDepth: experienceDepthScore,
      domainArchitecture: domainArchitectureScore,
      keywordDensity: keywordDensityScore,
    },
    fitGrade,
    fitSummary,
    matchedKeywords,
    missingKeywords: legacyMissingKeywords,
    missingKeywordsDetailed,
    skillGaps: legacySkillGaps,
    experienceGaps: [
      `Target JD emphasizes ${topMissing.map((m) => m.name).join(' & ') || 'specialized cloud deployment'}.`,
    ],
    recommendations: legacyRecommendations,
    tailoringRecommendations,
    parsedRequirements: {
      title: extractRoleTitleFromJd(jdText),
      requiredSkills: matchedKeywords.map((m) => m.name).concat(legacyMissingKeywords),
      preferredSkills: legacyMissingKeywords.slice(0, 4),
      minYearsExperience: requiredYrs,
      coreDomain: 'Full-Stack AI & Cloud Systems',
    },
    tailoredResumeSnapshot: {
      suggestedSummary: `${candidateName} is an accomplished ${candidateRole} specializing in ${matchedKeywords.slice(0, 4).map((m) => m.name).join(', ')} and ${legacyMissingKeywords.slice(0, 2).join(', ')}. Proven track record of scaling high-availability systems with verified business impact.`,
      suggestedSkills: Array.from(new Set([...parsedSkills, ...legacyMissingKeywords.slice(0, 4)])),
      tailoredBullets: tailoringRecommendations.map((t) => ({
        role: primaryExp.role,
        company: primaryExp.company,
        originalBullet: t.originalSnippet,
        tailoredBullet: t.tailoredRewrite,
      })),
    },
  };
}

/**
 * Call Live LLM (OpenAI / Anthropic / OpenRouter) when keys exist
 */
async function callLlmMatcher({
  candidateName,
  candidateRole,
  parsedSkills,
  parsedExperiences,
  parsedProjects,
  candidateFullText,
  jdText,
}: any): Promise<MatchResultOutput | null> {
  const prompt = `You are a Principal Technical Recruiter and ATS Parser Architect. Compare this candidate's resume with the target job description.

CANDIDATE:
Name: ${candidateName}
Role: ${candidateRole}
Skills: ${parsedSkills.join(', ')}
Work History:
${parsedExperiences.map((e: any) => `- ${e.role} at ${e.company}: ${e.bullets?.join(' ')}`).join('\n')}
Projects:
${parsedProjects.map((p: any) => `- ${p.title} (${p.techStack}): ${p.bullets?.join(' ')}`).join('\n')}

JOB DESCRIPTION:
${jdText}

Respond ONLY with a valid JSON object matching this schema:
{
  "matchPercentage": number (0-100),
  "subScores": {
    "technicalSkills": number (0-100),
    "experienceDepth": number (0-100),
    "domainArchitecture": number (0-100),
    "keywordDensity": number (0-100)
  },
  "fitGrade": "Exceptional Fit" | "Strong Fit" | "Moderate Fit" | "Needs Tailoring",
  "fitSummary": "1-2 sentence executive match rationale",
  "matchedKeywords": [
    { "name": "Exact skill name (e.g. Next.js, React, TypeScript, PgVector)", "category": "core_skill"|"framework"|"cloud_devops"|"architecture"|"ai_data"|"tool", "candidateContext": "Where verified in candidate history" }
  ],
  "missingKeywordsDetailed": [
    { "name": "Exact missing skill name", "category": "core_skill"|"framework"|"cloud_devops"|"architecture"|"ai_data"|"tool", "importance": "critical"|"high"|"medium", "recommendation": "Actionable advice to bridge gap" }
  ],
  "experienceGaps": ["string"],
  "tailoringRecommendations": [
    {
      "targetSection": "Experience Section",
      "roleOrProject": "Role at Company",
      "originalSnippet": "Original bullet from candidate",
      "tailoredRewrite": "Executive quantified rewrite incorporating missing requirement",
      "reason": "Why this improves ATS match",
      "keywordsAdded": ["string"]
    }
  ],
  "parsedRequirements": {
    "title": "Exact Role Title from JD",
    "requiredSkills": ["string"],
    "preferredSkills": ["string"],
    "minYearsExperience": number,
    "coreDomain": "string"
  },
  "tailoredResumeSnapshot": {
    "suggestedSummary": "Executive summary tailored to this target JD",
    "suggestedSkills": ["Clean list of real technical skills"],
    "tailoredBullets": [
      { "role": "string", "company": "string", "originalBullet": "string", "tailoredBullet": "string" }
    ]
  }
}`;

  try {
    const llmRes = await executeMultiProviderLLM({
      systemPrompt: 'You are an elite ATS Recruiter Matcher. Always return accurate, realistic matches with real tech skills only. Never treat generic words like "App" or "Engineer" as technical skills.',
      userPrompt: prompt,
      jsonMode: true,
      maxTokens: 3000,
    });

    const parsedData = llmRes.json;
    if (!parsedData || !parsedData.matchPercentage || !parsedData.subScores) {
      throw new Error('Incomplete JSON schema returned by LLM');
    }

    const missingList = (parsedData.missingKeywordsDetailed || []).map((m: any) => m.name || m);

    return {
      ...parsedData,
      missingKeywords: missingList,
      skillGaps: missingList.map((m: string) => `${m} in production scale`),
      recommendations: (parsedData.tailoringRecommendations || []).map((t: any) => `${t.reason || ''} -> "${t.tailoredRewrite || ''}"`),
    };
  } catch (err) {
    console.warn('callLlmMatcher error:', err);
    throw err;
  }
}

/**
 * Extract role title from JD text
 */
function extractRoleTitleFromJd(jdText: string): string {
  const firstLines = jdText.split('\n').slice(0, 3);
  for (const line of firstLines) {
    const match = line.match(/(?:Role|Position|Title|Job Title|Hiring for)\s*:\s*([^\n\r]+)/i);
    if (match) return match[1].trim();
    if (/Engineer|Developer|Architect|Scientist|Lead|Manager|Director/i.test(line) && line.length < 60) {
      return line.trim();
    }
  }
  return 'Target Technical Position';
}

/**
 * Extract custom high-frequency capitalized/tech keywords from JD with strong stoplist
 */
function extractCustomKeywordsFromJd(jdText: string): string[] {
  const words = jdText.match(/\b[A-Z][a-zA-Z0-9.+#/-]{2,20}\b/g) || [];
  const commonWords = new Set([
    'The', 'You', 'We', 'Our', 'Job', 'Role', 'Requirements', 'Experience', 'Years', 'Team',
    'Company', 'Work', 'Full', 'Time', 'Remote', 'About', 'With', 'Have', 'Will', 'Must',
    'Plus', 'Strong', 'Engineer', 'Developer', 'Architect', 'Scientist', 'Lead', 'Manager',
    'Director', 'App', 'Application', 'System', 'Platform', 'Labs', 'Vercel', 'Openai',
    'Stripe', 'Figma', 'Google', 'Amazon', 'Stack', 'Senior', 'Junior', 'Staff', 'Principal'
  ]);
  const unique = Array.from(new Set(words.filter((w) => !commonWords.has(w))));
  return unique.slice(0, 8);
}

/**
 * Persist match to SQLite Database
 */
async function saveMatchToDatabase(userId: string, resumeId: string, jdText: string, result: MatchResultOutput) {
  try {
    const existingResume = await db.resume.findUnique({ where: { id: resumeId } });
    if (!existingResume) return;

    const jd = await db.jobDescription.create({
      data: {
        userId,
        title: result.parsedRequirements?.title || 'Target Job Description',
        rawText: jdText,
        parsedRequirementsJson: JSON.stringify(result.parsedRequirements || {}),
      },
    });

    await db.matchResult.create({
      data: {
        resumeId,
        jobDescriptionId: jd.id,
        overallMatchPercentage: result.matchPercentage,
        missingKeywordsJson: JSON.stringify(result.missingKeywordsDetailed || result.missingKeywords || []),
        skillGapsJson: JSON.stringify(result.skillGaps || []),
        experienceGapsJson: JSON.stringify(result.experienceGaps || []),
        recommendationsJson: JSON.stringify(result.tailoringRecommendations || result.recommendations || []),
      },
    });
  } catch (err) {
    console.warn('Match result persistence note:', err);
  }
}
