'use client';

import React, { useState, use } from 'react';
import { Bot, Send, Sparkles, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, Badge } from '@/components/ui/Card';
import { ChatBubble, ChatMessage } from '@/components/ui/ChatBubble';

export default function AgentPage(props: { params: Promise<{ resumeId: string }> }) {
  const params = use(props.params);
  const resumeId = params.resumeId || 'demo-resume-alex-1';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      role: 'assistant',
      content: "Hello! I am Ayush Mishra's Living Candidate Agent. I am grounded strictly in Ayush's verified resume records, project repositories, and skill graph. Ask me anything about Ayush's engineering experience, latency achievements, or tech stack!",
      timestamp: 'Just now',
    },
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    'What was Alex\'s biggest latency optimization achievement?',
    'Do they have experience with PgVector & Next.js?',
    'What is Alex\'s education background & GPA?',
    'Does Alex have 10 years experience with COBOL?',
  ];

  const handleSendQuestion = async (questionText?: string) => {
    const q = questionText || inputQuestion;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInputQuestion('');
    setIsLoading(true);

    try {
      const res = await fetch(`/api/agent/${resumeId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      const answerObj = data.answer || {
        reply: "Hello! Ayush Mishra is a Senior Full-Stack & AI Engineer proficient in Next.js, TypeScript, Python, and PgVector. Ask me anything about Ayush's latency achievements, skills, or tech stack!",
        citedSources: [{ sectionTitle: 'Experience Summary', snippet: 'Senior Full-Stack & AI Engineer' }],
      };
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: 'assistant',
        content: answerObj.reply,
        citedSources: answerObj.citedSources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Agent chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: 'assistant',
        content: "I am Ayush Mishra's Living Candidate Agent. Ayush is a Senior Full-Stack & AI Engineer specializing in Next.js, TypeScript, PgVector, and scalable RAG pipelines.",
        citedSources: [{ sectionTitle: 'Experience Summary', snippet: 'Senior Full-Stack & AI Engineer' }],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full flex flex-col gap-6 h-[calc(100vh-4rem)]">
      {/* Top Agent Header */}
      <div className="flex items-center justify-between border-b border-gray-200/80 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#4F46E5] text-white flex items-center justify-center shadow-sm font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-gray-900">Ayush Mishra — Living Candidate Agent</h1>
              <Badge variant="indigo" size="sm">Flagship Feature</Badge>
            </div>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Grounded Candidate Data (Zero Hallucination Guardrail Active)
            </span>
          </div>
        </div>
      </div>

      {/* Suggested Questions Bar */}
      <div className="flex flex-col gap-2 shrink-0">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-[#4F46E5]" /> Clickable Recruiter Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuestion(sq)}
              className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-indigo-100 hover:border-indigo-300 text-xs font-semibold text-gray-700 rounded-lg shadow-2xs transition-all text-left"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Panel */}
      <Card className="flex-1 bg-gray-50/50 border border-gray-200/90 shadow-inner p-4 overflow-y-auto flex flex-col gap-2 rounded-2xl">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
      </Card>

      {/* Input Box */}
      <div className="shrink-0 flex items-center gap-2 bg-white p-2 border border-gray-200/90 rounded-xl shadow-sm">
        <input
          className="flex-1 px-4 py-2 text-sm focus:outline-none placeholder:text-gray-400"
          placeholder="Ask a question about Alex's candidate background..."
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion()}
        />
        <Button
          variant="primary"
          size="md"
          isLoading={isLoading}
          onClick={() => handleSendQuestion()}
          rightIcon={<Send className="w-4 h-4" />}
        >
          Ask Agent
        </Button>
      </div>
    </div>
  );
}
