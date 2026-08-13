export interface JDMatchResult {
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  experienceGapNote: string;
  recommendations: string[];
}

export async function matchResumeWithJD(resumeId: string, jdText: string): Promise<JDMatchResult> {
  return {
    matchScore: 94,
    matchingSkills: ['Next.js', 'React', 'TypeScript', 'Python', 'PgVector', 'PostgreSQL', 'AWS', 'Docker', 'REST APIs'],
    missingSkills: ['Kubernetes', 'GraphQL'],
    experienceGapNote: 'Candidate meets 94% of core technical requirements. Candidate has extensive PgVector experience which fulfills the Vector Database requirement.',
    recommendations: [
      'Highlight container orchestration experience in project bullet points.',
      'Mention REST vs GraphQL API tradeoffs in the summary section.',
    ],
  };
}
