'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MicOff, Sparkles, CheckCircle2, ArrowRight, RefreshCw, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';

export default function VoiceIntakePage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [extractedData, setExtractedData] = useState<any>(null);
  const [isExtracting, setIsExtracting] = useState(false);

  const sampleVoiceDemo =
    "At Aether Cloud Tech, I built a RAG query pipeline using Next.js 14, PgVector, and Claude 3.5 Sonnet that handled 150k daily active requests while cutting p95 response latency down to 180 milliseconds.";

  const handleStartSimulatedVoice = () => {
    setIsRecording(true);
    setTranscript('');
    setExtractedData(null);

    let currentText = '';
    const words = sampleVoiceDemo.split(' ');
    let idx = 0;

    const interval = setInterval(() => {
      if (idx < words.length) {
        currentText += (idx === 0 ? '' : ' ') + words[idx];
        setTranscript(currentText);
        idx++;
      } else {
        clearInterval(interval);
        setIsRecording(false);
        handleRunExtraction(currentText);
      }
    }, 120);
  };

  const handleRunExtraction = (text: string) => {
    setIsExtracting(true);
    setTimeout(() => {
      setExtractedData({
        extractedBullet:
          'Architected high-throughput RAG query pipeline using Next.js 14, PgVector, and Claude 3.5 Sonnet, processing 150k daily requests at 180ms p95 latency.',
        extractedSkills: ['Next.js 14', 'PgVector', 'Claude 3.5 Sonnet', 'RAG Pipeline', 'Latency Optimization'],
        evidenceLink: 'Work Experience — Aether Cloud Tech',
      });
      setIsExtracting(false);
    }, 600);
  };

  const handleConfirmToSkillGraph = () => {
    router.push('/skill-graph');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm">Voice Intake Engine</Badge>
            <span className="text-xs text-gray-500">Ayush Mishra</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Voice-Native Career Intake</h1>
        </div>
      </div>

      {/* Voice Recorder Card */}
      <Card className="p-8 bg-white border border-gray-200/90 shadow-xs flex flex-col items-center justify-center text-center gap-6">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
            isRecording ? 'bg-red-500 text-white animate-pulse shadow-lg scale-105' : 'bg-indigo-50 text-[#4F46E5]'
          }`}
        >
          {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <h3 className="text-base font-bold text-gray-900">
            {isRecording ? 'Listening to your career story...' : 'Speak Naturally About Your Project or Role'}
          </h3>
          <p className="text-xs text-gray-500">
            Describe what you built, metrics achieved, or tools used — our LLM extractor will format it into structured resume bullets & skill graph nodes.
          </p>
        </div>

        <Button
          variant={isRecording ? 'danger' : 'primary'}
          size="lg"
          onClick={handleStartSimulatedVoice}
          leftIcon={<Volume2 className="w-5 h-5" />}
        >
          {isRecording ? 'Recording Live Speech...' : 'Start Voice Recording'}
        </Button>

        {/* Live Transcript Display */}
        {transcript && (
          <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-left text-xs text-gray-800 leading-relaxed font-mono">
            <span className="font-bold text-gray-400 block mb-1">LIVE SPEECH TRANSCRIPT:</span>
            "{transcript}"
          </div>
        )}
      </Card>

      {/* Extraction Review Step */}
      {isExtracting && (
        <div className="flex flex-col items-center justify-center p-8 gap-2">
          <RefreshCw className="w-6 h-6 text-[#4F46E5] animate-spin" />
          <span className="text-xs font-semibold text-gray-600">Extracting structured bullets & skill graph nodes...</span>
        </div>
      )}

      {extractedData && (
        <Card className="p-6 bg-emerald-50/40 border border-emerald-200/80 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Extracted Resume Bullet & Skill Graph Proposals
            </span>
            <Badge variant="success">Uncommitted Proposal</Badge>
          </div>

          <div className="p-4 bg-white border border-emerald-100 rounded-xl text-xs font-semibold text-gray-900">
            "{extractedData.extractedBullet}"
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Extracted Skill Nodes:</span>
            <div className="flex flex-wrap gap-2">
              {extractedData.extractedSkills.map((sk: string, idx: number) => (
                <span key={idx} className="px-2.5 py-1 bg-white border border-emerald-300 text-emerald-900 text-xs font-bold rounded-lg shadow-2xs">
                  + {sk}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-emerald-200/60">
            <Button
              variant="primary"
              size="md"
              onClick={handleConfirmToSkillGraph}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Confirm & Save to Skill Graph
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
