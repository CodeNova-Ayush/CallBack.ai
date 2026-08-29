/**
 * ============================================================================
 * 🧠 UNIFIED MULTI-PROVIDER LLM ENGINE (GROQ LPU + NVIDIA NIM + OPENROUTER)
 * ============================================================================
 * High-throughput, resilient AI execution with automated fallback & latency optimization.
 */

export interface LLMRequestOptions {
  systemPrompt?: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
}

export interface LLMResponse {
  content: string;
  json?: any;
  provider: 'groq' | 'nvidia' | 'openrouter' | 'openai' | 'anthropic';
  latencyMs: number;
}

export async function executeMultiProviderLLM(options: LLMRequestOptions): Promise<LLMResponse> {
  const {
    systemPrompt = 'You are an elite AI Career & ATS Optimization Engine. Return accurate, professional responses.',
    userPrompt,
    temperature = 0.2,
    maxTokens = 3000,
    jsonMode = true,
  } = options;

  const groqKey = process.env.GROQ_API_KEY;
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const nvidiaKey = process.env.NVIDIA_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  const start = Date.now();

  // 1. Primary: Ultra-Fast Groq LPU (Sub-second latency)
  if (groqKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const body: any = {
        model: 'llama-3.3-70b-versatile',
        temperature,
        max_tokens: maxTokens,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      };

      if (jsonMode) {
        body.response_format = { type: 'json_object' };
      }

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${groqKey}`,
        },
        signal: controller.signal,
        body: JSON.stringify(body),
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const jsonRes = await res.json();
        let rawContent = jsonRes.choices?.[0]?.message?.content || '';
        let parsedJson = null;

        if (jsonMode) {
          if (rawContent.includes('```')) {
            rawContent = rawContent.replace(/```(?:json)?([\s\S]*?)```/g, '$1').trim();
          }
          const match = rawContent.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
          if (match) {
            try {
              parsedJson = JSON.parse(match[0]);
            } catch {}
          }
        }

        return {
          content: rawContent,
          json: parsedJson,
          provider: 'groq',
          latencyMs: Date.now() - start,
        };
      }
    } catch (groqErr) {
      console.warn('Groq primary attempt failed, cascading to next provider:', groqErr);
    }
  }

  // 2. Secondary: NVIDIA NIM
  if (nvidiaKey && nvidiaKey.length > 20) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${nvidiaKey}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: 'meta/llama-3.3-70b-instruct',
          temperature,
          max_tokens: maxTokens,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
        }),
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const jsonRes = await res.json();
        let rawContent = jsonRes.choices?.[0]?.message?.content || '';
        let parsedJson = null;

        if (jsonMode) {
          if (rawContent.includes('```')) {
            rawContent = rawContent.replace(/```(?:json)?([\s\S]*?)```/g, '$1').trim();
          }
          const match = rawContent.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
          if (match) {
            try {
              parsedJson = JSON.parse(match[0]);
            } catch {}
          }
        }

        return {
          content: rawContent,
          json: parsedJson,
          provider: 'nvidia',
          latencyMs: Date.now() - start,
        };
      }
    } catch (nvErr) {
      console.warn('NVIDIA attempt note:', nvErr);
    }
  }

  // 3. Tertiary: OpenRouter
  if (openRouterKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openRouterKey}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: 'meta-llama/llama-3.3-70b-instruct',
          temperature,
          max_tokens: maxTokens,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
        }),
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const jsonRes = await res.json();
        let rawContent = jsonRes.choices?.[0]?.message?.content || '';
        let parsedJson = null;

        if (jsonMode) {
          if (rawContent.includes('```')) {
            rawContent = rawContent.replace(/```(?:json)?([\s\S]*?)```/g, '$1').trim();
          }
          const match = rawContent.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
          if (match) {
            try {
              parsedJson = JSON.parse(match[0]);
            } catch {}
          }
        }

        return {
          content: rawContent,
          json: parsedJson,
          provider: 'openrouter',
          latencyMs: Date.now() - start,
        };
      }
    } catch (orErr) {
      console.warn('OpenRouter attempt note:', orErr);
    }
  }

  // 4. OpenAI fallback
  if (openAiKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const body: any = {
        model: 'gpt-4o-mini',
        temperature,
        max_tokens: maxTokens,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      };

      if (jsonMode) {
        body.response_format = { type: 'json_object' };
      }

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        signal: controller.signal,
        body: JSON.stringify(body),
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const jsonRes = await res.json();
        let rawContent = jsonRes.choices?.[0]?.message?.content || '';
        let parsedJson = null;

        if (jsonMode) {
          if (rawContent.includes('```')) {
            rawContent = rawContent.replace(/```(?:json)?([\s\S]*?)```/g, '$1').trim();
          }
          const match = rawContent.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
          if (match) {
            try {
              parsedJson = JSON.parse(match[0]);
            } catch {}
          }
        }

        return {
          content: rawContent,
          json: parsedJson,
          provider: 'openai',
          latencyMs: Date.now() - start,
        };
      }
    } catch (oaiErr) {
      console.warn('OpenAI attempt note:', oaiErr);
    }
  }

  // 5. Anthropic fallback
  if (anthropicKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

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
          max_tokens: maxTokens,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }],
        }),
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const jsonRes = await res.json();
        let rawContent = jsonRes.content?.[0]?.text || '';
        let parsedJson = null;

        if (jsonMode) {
          if (rawContent.includes('```')) {
            rawContent = rawContent.replace(/```(?:json)?([\s\S]*?)```/g, '$1').trim();
          }
          const match = rawContent.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
          if (match) {
            try {
              parsedJson = JSON.parse(match[0]);
            } catch {}
          }
        }

        return {
          content: rawContent,
          json: parsedJson,
          provider: 'anthropic',
          latencyMs: Date.now() - start,
        };
      }
    } catch (antErr) {
      console.warn('Anthropic attempt note:', antErr);
    }
  }

  throw new Error('All configured LLM providers were unavailable');
}
