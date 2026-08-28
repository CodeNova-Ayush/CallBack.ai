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
  const groqKey = process.env.GROQ_API_KEY;
  const nvidiaKey = process.env.NVIDIA_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  const prompt = `You are a Principal Technical Recruiter and ATS Optimization Expert.
Analyze the following speech transcript or resume bullet point:
Input: "${originalBullet}"

Transform it into a powerful, executive, quantifiable resume bullet point that accurately reflects what the user described. Also extract 2-5 relevant technical/functional skills mentioned or implied.

Return ONLY a valid JSON object matching this schema:
{
  "enhancedBullet": "High-impact, metric-driven resume bullet starting with an executive action verb based on what the user said",
  "improvements": ["Key improvement 1", "Key improvement 2"],
  "extractedSkills": ["Skill 1", "Skill 2", "Skill 3"]
}`;

  // 1. High-Speed Groq LPU (300ms response time)
  if (groqKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${groqKey}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          temperature: 0.2,
          max_tokens: 600,
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: 'You are an elite ATS resume optimization engine. Return pure JSON only.' },
            { role: 'user', content: prompt }
          ],
        }),
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        let rawText = json.choices?.[0]?.message?.content || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.enhancedBullet) {
            return {
              enhancedBullet: parsed.enhancedBullet,
              improvements: Array.isArray(parsed.improvements) ? parsed.improvements : ['Transformed into quantified executive accomplishment'],
              extractedSkills: Array.isArray(parsed.extractedSkills) && parsed.extractedSkills.length > 0 ? parsed.extractedSkills : ['Engineering', 'System Design'],
            };
          }
        }
      }
    } catch (err) {
      console.warn('Groq bullet enhance note:', err);
    }
  }

  // 2. Anthropic API
  if (anthropicKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 600,
          system: 'You are an elite ATS resume optimization engine. Return pure JSON only.',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        let rawText = json.content?.[0]?.text || '';
        if (rawText.includes('```')) {
          rawText = rawText.replace(/```(?:json)?([\s\S]*?)```/g, '$1').trim();
        }
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.enhancedBullet) {
            return {
              enhancedBullet: parsed.enhancedBullet,
              improvements: Array.isArray(parsed.improvements) ? parsed.improvements : ['Transformed spoken intent into quantifiable achievement'],
              extractedSkills: Array.isArray(parsed.extractedSkills) && parsed.extractedSkills.length > 0 ? parsed.extractedSkills : ['Engineering', 'System Design'],
            };
          }
        }
      }
    } catch (err) {
      console.warn('Anthropic enhance bullet note:', err);
    }
  }

  // 2. NVIDIA / OpenRouter / OpenAI API
  if (nvidiaKey || openAiKey || openRouterKey) {
    try {
      const endpoint = nvidiaKey
        ? 'https://integrate.api.nvidia.com/v1/chat/completions'
        : openRouterKey
        ? 'https://openrouter.ai/api/v1/chat/completions'
        : 'https://api.openai.com/v1/chat/completions';

      const apiKey = nvidiaKey || openRouterKey || openAiKey;
      const model = nvidiaKey ? 'meta/llama-3.3-70b-instruct' : openRouterKey ? 'google/gemini-2.0-flash-001' : 'gpt-4o-mini';

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: 'You are an elite ATS resume optimization engine. Return pure JSON only.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.3,
          max_tokens: 600,
        }),
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        let rawContent = json.choices?.[0]?.message?.content || '';
        if (rawContent.includes('```')) {
          rawContent = rawContent.replace(/```(?:json)?([\s\S]*?)```/g, '$1').trim();
        }
        const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.enhancedBullet) {
            return {
              enhancedBullet: parsed.enhancedBullet,
              improvements: Array.isArray(parsed.improvements) ? parsed.improvements : ['Transformed spoken intent into quantifiable achievement'],
              extractedSkills: Array.isArray(parsed.extractedSkills) && parsed.extractedSkills.length > 0 ? parsed.extractedSkills : ['Startup Strategy', 'MVP Engineering', 'Product Leadership'],
            };
          }
        }
      }
    } catch (e) {
      console.warn('Live AI bullet enhancement error, using dynamic rule fallback:', e);
    }
  }

  // Dynamic Contextual Fallback
  const clean = originalBullet.trim().replace(/\.$/, '');
  const lower = clean.toLowerCase();

  let enhancedBullet = `Spearheaded and executed ${clean}, driving technical milestone delivery and establishing scalable product architectures.`;
  let extractedSkills = ['Product Execution', 'Full-Stack Architecture'];

  if (lower.includes('startup') || lower.includes('founder') || lower.includes('build')) {
    enhancedBullet = `Founded and engineered early-stage product MVP (${clean}), architecting core system capabilities and accelerating go-to-market execution.`;
    extractedSkills = ['Startup Engineering', 'System Architecture', 'Product Strategy'];
  } else if (lower.includes('rag') || lower.includes('ai') || lower.includes('llama') || lower.includes('agent')) {
    enhancedBullet = `Architected high-throughput AI workflow for ${clean}, delivering sub-150ms response latency across production query loads.`;
    extractedSkills = ['Multi-Agent AI', 'Vector Indexing', 'Latency Optimization'];
  } else if (lower.includes('react') || lower.includes('next') || lower.includes('frontend')) {
    enhancedBullet = `Engineered responsive, high-performance web interface for ${clean}, improving page responsiveness and user interaction speed by 35%.`;
    extractedSkills = ['Next.js', 'React', 'Frontend Systems'];
  }

  return {
    enhancedBullet,
    improvements: [
      'Transformed spoken concept into executive action phrasing',
      'Added high-signal engineering and leadership framing',
      'Optimized for ATS keyword relevance',
    ],
    extractedSkills,
  };
}

export async function generateSummary(role: string, topSkills: string[]): Promise<string> {
  const skillsList = topSkills.slice(0, 4).join(', ');
  return `Results-driven ${role} with proven hands-on experience architecting scalable distributed systems and AI applications using ${skillsList}. Track record of improving system latency by 45% and scaling products to production benchmarks.`;
}
