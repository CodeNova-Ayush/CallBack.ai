'use client';

import React, { useState } from 'react';
import {
  UserCheck,
  Search,
  Bot,
  ShieldCheck,
  Sparkles,
  FileText,
  MessageSquare,
  ArrowRight,
  Target,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge, ProgressRing } from '@/components/ui/Card';
import { ChatBubble, ChatMessage } from '@/components/ui/ChatBubble';

export default function RecruiterDashboardPage() {
  const [activeCandidateId, setActiveCandidateId] = useState<string | null>(null);
  const [candidateMessages, setCandidateMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const candidates = [
    {
      id: 'demo-resume-alex-1',
      name: 'Ayush Mishra',
      role: 'Senior Full-Stack AI Engineer',
      matchScore: 94,
      trustScore: 96,
      topSkills: ['Next.js 14', 'PgVector', 'Claude 3.5 Sonnet', 'TypeScript', 'Rust'],
      verifiedClaimsCount: 4,
      experienceYears: '4+ Years',
      location: 'San Francisco, CA',
    },
    {
      id: 'demo-resume-priya-1',
      name: 'Priya Sharma',
      role: 'Full Stack & Cloud Infrastructure Dev',
      matchScore: 86,
      trustScore: 92,
      topSkills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
      verifiedClaimsCount: 3,
      experienceYears: '3 Years',
      location: 'San Jose, CA',
    },
  ];

  const handleOpenCandidateChat = (candidate: any) => {
    setActiveCandidateId(candidate.id);
    setCandidateMessages([
      {
        id: 'r-init',
        role: 'assistant',
        content: `Hi Sarah! I am ${candidate.name}'s verified candidate agent. I have pre-loaded your Senior AI Engineer job description. Ask me any technical or fit question!`,
        citedSources: [
          { sectionTitle: 'Pre-loaded JD Matcher', snippet: 'Target Position: Sr AI Engineer at TechCorp' },
        ],
        timestamp: 'Just now',
      },
    ]);
  };

  const handleSendRecruiterChat = async () => {
    if (!chatInput.trim() || !activeCandidateId) return;
    const q = chatInput;
    setChatInput('');

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setCandidateMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const res = await fetch(`/api/agent/${activeCandidateId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (data.answer) {
        setCandidateMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            role: 'assistant',
            content: data.answer.reply,
            citedSources: data.answer.citedSources,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (err) {
      console.error('Recruiter chat error:', err);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm">Recruiter Companion Surface</Badge>
            <span className="text-xs text-gray-500">Sarah Jenkins (TechCorp)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Candidate Agent Matcher</h1>
        </div>
      </div>

      {/* Candidates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {candidates.map((cand) => (
          <Card key={cand.id} className="p-6 bg-white border border-gray-200/90 shadow-xs flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-900">{cand.name}</h3>
                <span className="text-xs text-gray-600 font-medium">{cand.role} • {cand.location}</span>
              </div>
              <Badge variant="indigo">{cand.experienceYears}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase">JD Match Fit</span>
                <span className="text-xl font-extrabold text-emerald-600">{cand.matchScore}% Match</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Trust Verification</span>
                <span className="text-xl font-extrabold text-indigo-600">{cand.trustScore}% Verified</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {cand.topSkills.map((sk, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-white border border-gray-200 text-gray-700 text-[11px] font-semibold rounded">
                  {sk}
                </span>
              ))}
            </div>

            <Button
              variant="primary"
              size="md"
              leftIcon={<Bot className="w-4 h-4" />}
              onClick={() => handleOpenCandidateChat(cand)}
              className="mt-2"
            >
              Chat with {cand.name}'s Agent
            </Button>
          </Card>
        ))}
      </div>

      {/* Candidate Agent Chat Modal/Drawer */}
      {activeCandidateId && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#4F46E5]" />
                <h3 className="font-bold text-base text-gray-900">Candidate Agent Chat — Ayush Mishra</h3>
              </div>
              <button onClick={() => setActiveCandidateId(null)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-2">
              {candidateMessages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
              <input
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#4F46E5]"
                placeholder="Ask about Alex's fit for Sr AI Engineer..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendRecruiterChat()}
              />
              <Button variant="primary" size="md" isLoading={isChatLoading} onClick={handleSendRecruiterChat}>
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
