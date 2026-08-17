'use client';

import React, { useState } from 'react';
import { GitGraph, CheckCircle2, ExternalLink, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';

export default function SkillGraphPage() {
  const skillNodes = [
    {
      name: 'Next.js',
      signal: 95,
      evidence: [
        { title: 'Experience — Aether Cloud Tech', snippet: 'RAG query pipeline handling 150k daily active requests' },
        { title: 'Project — NeuroDraft Copilot', snippet: 'Agentic document copilot deployed live' },
      ],
    },
    {
      name: 'PgVector & Vector Search',
      signal: 92,
      evidence: [
        { title: 'Experience — Aether Cloud Tech', snippet: 'Sub-180ms nearest-neighbor similarity search' },
      ],
    },
    {
      name: 'TypeScript',
      signal: 94,
      evidence: [
        { title: 'Experience — Pulse Digital Analytics', snippet: 'Analytics portal used by 45k enterprise managers' },
      ],
    },
    {
      name: 'Python & FastAPI',
      signal: 90,
      evidence: [
        { title: 'Project — NeuroDraft Copilot', snippet: 'FastAPI multi-agent orchestration backend' },
      ],
    },
    {
      name: 'PostgreSQL',
      signal: 88,
      evidence: [
        { title: 'Experience — Pulse Digital', snippet: 'Query indexing optimization from 4.2s to 210ms' },
      ],
    },
    {
      name: 'Rust',
      signal: 78,
      evidence: [
        { title: 'Project — HyperCache Store', snippet: 'Memory-efficient vector index downloaded 80k+ times' },
      ],
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm">Persistent Candidate Entity</Badge>
            <span className="text-xs text-gray-500 font-medium">Alex Rivera</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Persistent Skill & Evidence Graph</h1>
        </div>
      </div>

      {/* Grid of Skill Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillNodes.map((node, idx) => (
          <Card key={idx} className="p-6 bg-white border border-gray-200/90 shadow-xs flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">{node.name}</h3>
                <Badge variant="indigo">{node.signal}% Proficiency</Badge>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4F46E5] rounded-full transition-all duration-700"
                  style={{ width: `${node.signal}%` }}
                />
              </div>
            </div>

            {/* Evidence References */}
            <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Evidence Links ({node.evidence.length})
              </span>
              {node.evidence.map((ev, evIdx) => (
                <div key={evIdx} className="p-2.5 bg-gray-50 rounded-lg text-xs flex flex-col gap-0.5 border border-gray-100">
                  <span className="font-bold text-gray-900">{ev.title}</span>
                  <span className="text-gray-600 text-[11px] font-medium">"{ev.snippet}"</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
