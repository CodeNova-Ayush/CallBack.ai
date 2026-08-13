export interface ATSAuditResult {
  overallScore: number;
  readabilityGrade: string;
  formattingScore: number;
  missingSections: string[];
  keywordDensityScore: number;
  grammarFixes: { id: string; original: string; suggested: string; reason: string }[];
  scoringRubric: { category: string; score: number; maxScore: number; feedback: string }[];
}

export async function analyzeResumeATS(resumeId: string): Promise<ATSAuditResult> {
  return {
    overallScore: 94,
    readabilityGrade: 'Easy (Grade 9)',
    formattingScore: 96,
    missingSections: [],
    keywordDensityScore: 92,
    grammarFixes: [
      {
        id: 'fix-1',
        original: 'Architected scalable RAG query pipeline using Next.js 14, PgVector, and Claude 3.5 Sonnet, handling 150k daily active requests at 180ms p95 latency.',
        suggested: 'Engineered a scalable RAG query pipeline with Next.js 14, PgVector, and Claude 3.5 Sonnet, servicing 150,000 daily active requests while maintaining an 180ms p95 latency.',
        reason: 'Stronger action verb and standardized numerical formatting for ATS scanners.',
      },
      {
        id: 'fix-2',
        original: 'Built responsive React + TypeScript analytics portal used by 45k enterprise business managers.',
        suggested: 'Developed a high-performance React and TypeScript analytics dashboard utilized by over 45,000 enterprise managers.',
        reason: 'Enhances executive readability and impact.',
      },
    ],
    scoringRubric: [
      { category: 'Action Verbs & Impact Metrics', score: 38, maxScore: 40, feedback: 'Strong quantifiable metrics (45% latency reduction, 150k DAU).' },
      { category: 'ATS Keyword Optimization', score: 28, maxScore: 30, feedback: 'High density of key full-stack & AI terms (Next.js, PgVector, TypeScript).' },
      { category: 'Section Layout & Formatting', score: 19, maxScore: 20, feedback: 'Clean structure parseable by Greenhouse, Workday, and Lever.' },
      { category: 'Grammar & Clarity', score: 9, maxScore: 10, feedback: '2 minor stylistic enhancements available.' },
    ],
  };
}
