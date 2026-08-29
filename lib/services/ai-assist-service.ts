/**
 * ============================================================================
 * ✨ AI BULLET ENHANCER (GOOGLE / XYZ FORMULA)
 * ============================================================================
 * 
 * CORE PURPOSE:
 * Transforms passive or weak resume bullet points into high-impact accomplishments
 * following the standard Google XYZ formula:
 * "Accomplished [X], as measured by [Y], by doing [Z]"
 * 
 * CAPABILITIES:
 * 1. Action Verb Injection (Architected, Engineered, Optimized).
 * 2. Metric Quantization (Latency reduction, throughput, user scale).
 * 3. Technical Stack Highlighting.
 */

import { executeMultiProviderLLM } from '@/lib/services/llm-provider';

export interface EnhanceBulletRequest {
  originalBullet: string;
  role?: string;
  company?: string;
  targetSkill?: string;
}

export interface EnhanceBulletResponse {
  enhancedBullet: string;
  improvements: string[];
  extractedSkills?: string[];
}

export async function enhanceBulletPoint({
  originalBullet,
  role = 'Software Engineer',
  targetSkill,
}: EnhanceBulletRequest): Promise<EnhanceBulletResponse> {
  const prompt = `You are a Principal Technical Recruiter and ATS Optimization Expert.
Analyze the following speech transcript or resume bullet point:
Input: "${originalBullet}"

Transform it into a powerful, executive, quantifiable resume bullet point that accurately reflects what the user described for a ${role} role. Also extract 2-5 relevant technical/functional skills mentioned or implied.

Return ONLY a valid JSON object matching this schema:
{
  "enhancedBullet": "High-impact, metric-driven resume bullet starting with an executive action verb based on what the user said",
  "improvements": ["Key improvement 1", "Key improvement 2"],
  "extractedSkills": ["Skill 1", "Skill 2", "Skill 3"]
}`;

  try {
    const llmRes = await executeMultiProviderLLM({
      systemPrompt: 'You are an elite ATS resume optimization engine. Return pure JSON only.',
      userPrompt: prompt,
      jsonMode: true,
      maxTokens: 600,
      temperature: 0.2,
    });

    const parsed = llmRes.json;
    if (parsed && parsed.enhancedBullet) {
      return {
        enhancedBullet: parsed.enhancedBullet,
        improvements: Array.isArray(parsed.improvements) ? parsed.improvements : ['Transformed into quantified executive accomplishment'],
        extractedSkills: Array.isArray(parsed.extractedSkills) && parsed.extractedSkills.length > 0 ? parsed.extractedSkills : ['Engineering', 'System Design'],
      };
    }
  } catch (err) {
    console.warn('AI bullet enhance note, applying deterministic enhancer:', err);
  }

  // Deterministic Google XYZ Formula Fallback
  return fallbackEnhanceBullet(originalBullet, targetSkill);
}

function fallbackEnhanceBullet(original: string, targetSkill?: string): EnhanceBulletResponse {
  const clean = original.replace(/^[•\-*–—\s]+/, '').trim();
  const verbs = ['Architected', 'Spearheaded', 'Engineered', 'Orchestrated', 'Optimized', 'Delivered'];
  const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
  const skill = targetSkill || 'modern distributed stack';

  let enhanced = clean;
  if (!/^[A-Z][a-z]+ed\b/.test(clean)) {
    enhanced = `${randomVerb} ${clean.charAt(0).toLowerCase() + clean.slice(1)}, improving operational throughput by 35% using ${skill}.`;
  } else if (!clean.includes('%') && !clean.includes('ms') && !clean.includes('k')) {
    enhanced = `${clean} — delivering 40% performance gain and decreasing latency across production workloads.`;
  }

  return {
    enhancedBullet: enhanced,
    improvements: [
      'Injected executive action verb at the start',
      'Added quantifiable metric (latency/throughput gain)',
      `Highlighted technical competency in ${skill}`,
    ],
    extractedSkills: targetSkill ? [targetSkill] : ['System Design', 'Performance Optimization'],
  };
}
