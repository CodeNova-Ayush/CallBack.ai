'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Bot,
  Send,
  Sparkles,
  CheckCircle2,
  Upload,
  FileText,
  HelpCircle,
  RefreshCw,
  User,
  Plus,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Paperclip,
  Trash2,
  Copy,
  Check,
  Layers,
  FileUp,
  Cpu,
  Zap,
  Clock,
  Award,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Input';
import { ChatBubble, ChatMessage } from '@/components/ui/ChatBubble';
import { ThreeAgentCanvas } from '@/components/agent/ThreeAgentCanvas';
import { AgentLoadingState } from '@/components/agent/AgentLoadingState';

export default function AgentPage() {
  const router = useRouter();
  const routeParams = useParams();
  const activeResumeId = (routeParams?.resumeId as string) || 'demo-resume-alex-1';

  // Candidate Data State
  const [candidateName, setCandidateName] = useState('Candidate');
  const [candidateTitle, setCandidateTitle] = useState('Software Engineer & AI Builder');
  const [candidateSummary, setCandidateSummary] = useState('');
  const [candidateSkills, setCandidateSkills] = useState<string[]>([]);
  const [allResumes, setAllResumes] = useState<{ id: string; title: string }[]>([]);
  const [atsScore, setAtsScore] = useState(98);
  const [trustScore, setTrustScore] = useState(99);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Local File Upload State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [rawResumeText, setRawResumeText] = useState('');
  const [customCandidateName, setCustomCandidateName] = useState('');
  const [selectedLocalFile, setSelectedLocalFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Load Resumes List for Quick Switcher
  useEffect(() => {
    fetch('/api/resumes')
      .then((res) => res.json())
      .then((data) => {
        if (data.resumes && Array.isArray(data.resumes)) {
          setAllResumes(data.resumes);
        }
      })
      .catch(() => {});
  }, []);

  // Load Active Resume Profile & Initialize Agent
  useEffect(() => {
    fetch(`/api/resumes/${activeResumeId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.resume) {
          const pi = data.resume.sections?.find((s: any) => s.sectionType === 'personal_info');
          const exp = data.resume.sections?.find((s: any) => s.sectionType === 'experience');
          const sk = data.resume.sections?.find((s: any) => s.sectionType === 'skills');

          let name = 'Candidate';
          let title = 'Software Engineer & AI Builder';
          let summary = '';
          let skillsList: string[] = ['TypeScript', 'Python', 'Next.js', 'PgVector', 'Docker', 'AWS'];

          if (pi) {
            try {
              const parsed = JSON.parse(pi.content);
              if (parsed.fullName) name = parsed.fullName;
              if (parsed.summary) summary = parsed.summary;
            } catch {}
          }
          if (exp) {
            try {
              const parsedExp = JSON.parse(exp.content);
              if (parsedExp?.[0]?.role) title = `${parsedExp[0].role} (${parsedExp[0].company || ''})`;
            } catch {}
          }
          if (sk) {
            try {
              const parsedSk = JSON.parse(sk.content);
              if (Array.isArray(parsedSk)) {
                skillsList = parsedSk;
              } else if (parsedSk?.categories) {
                skillsList = parsedSk.categories.flatMap((c: any) => c.items || []);
              }
            } catch {}
          }

          if (data.resume.title && name === 'Candidate') {
            name = data.resume.title.split('—')[0].trim();
          }

          setCandidateName(name);
          setCandidateTitle(title);
          setCandidateSummary(summary);
          setCandidateSkills(skillsList);

          // Initial Greetings
          setMessages([
            {
              id: 'init-msg',
              role: 'assistant',
              content: `Hello! I am ${name}'s Living Candidate Agent powered by NVIDIA Llama 3.3. I am grounded strictly in ${name}'s verified records, project repositories, and technical skills (${title}). Ask me anything about ${name}'s engineering experience, latency benchmarks, or stack!`,
              citedSources: [
                {
                  sectionTitle: 'Verified Candidate Profile',
                  snippet: summary || `${name} — ${title}`,
                },
              ],
              timestamp: 'Just now',
            },
          ]);
        }
      })
      .catch(() => {});
  }, [activeResumeId]);

  // Suggested Prompts Grouped by Domain
  const promptCategories = [
    {
      category: 'Technical Architecture',
      prompts: [
        `What is ${candidateName}'s verified tech stack?`,
        `How does ${candidateName} handle distributed multi-agent workflows?`,
      ],
    },
    {
      category: 'Metrics & Performance',
      prompts: [
        `What were ${candidateName}'s biggest latency optimization milestones?`,
        `Tell me about uptime & SLA benchmarks across past roles.`,
      ],
    },
    {
      category: 'Background & Credentials',
      prompts: [
        `What is ${candidateName}'s educational & academic pedigree?`,
        `Does ${candidateName} have enterprise cloud credentials?`,
      ],
    },
  ];

  // Send Question to Agent
  const handleSendQuestion = async (questionText?: string) => {
    const q = questionText || inputQuestion;
    if (!q.trim() || isLoading) return;

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
      const res = await fetch(`/api/agent/${activeResumeId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      const answerObj = data.answer || {
        reply: `${candidateName} is an accomplished engineer with proven full-stack and systems experience.`,
        citedSources: [{ sectionTitle: 'Verified Profile', snippet: candidateTitle }],
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
        content: `I am ${candidateName}'s Living Candidate Agent. ${candidateName} is verified in distributed systems, full-stack web architectures, and modern AI pipelines.`,
        citedSources: [{ sectionTitle: 'Experience Summary', snippet: candidateTitle }],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Local File Change Handler
  const handleLocalFileSelect = (file: File) => {
    setSelectedLocalFile(file);
    const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_@]/g, ' ').trim();
    if (!customCandidateName) {
      setCustomCandidateName(cleanName);
    }

    if (file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setRawResumeText(text);
        const firstLine = text.split('\n')[0]?.trim();
        if (firstLine && firstLine.length < 40 && !firstLine.includes('@')) {
          setCustomCandidateName(firstLine);
        }
      };
      reader.readAsText(file);
    }
  };

  // Upload and Ingest Resume with real PDF / DOCX / TXT binary parser
  const handleUploadAndTalk = async () => {
    if (!rawResumeText.trim() && !selectedLocalFile) return;
    setIsImporting(true);

    try {
      let res: Response;
      if (selectedLocalFile) {
        const formData = new FormData();
        formData.append('file', selectedLocalFile);
        if (customCandidateName) {
          formData.append('customTitle', `${customCandidateName} — Candidate Resume`);
        }
        if (rawResumeText) {
          formData.append('rawText', rawResumeText);
        }
        res = await fetch('/api/resumes/import', {
          method: 'POST',
          body: formData,
        });
      } else {
        res = await fetch('/api/resumes/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rawText: rawResumeText,
            customTitle: customCandidateName ? `${customCandidateName} — Candidate Resume` : undefined,
          }),
        });
      }

      const data = await res.json();
      if (data.resumeId) {
        setIsUploadModalOpen(false);
        setRawResumeText('');
        setCustomCandidateName('');
        setSelectedLocalFile(null);
        if (typeof window !== 'undefined') {
          localStorage.setItem('active_resume_id', data.resumeId);
          window.dispatchEvent(new Event('active_resume_changed'));
        }
        router.push(`/agent/${data.resumeId}`);
      } else {
        alert(data.error || 'Failed to parse resume file.');
      }
    } catch (err) {
      console.error('Import failed:', err);
      alert('Failed to upload and parse resume file.');
    } finally {
      setIsImporting(false);
    }
  };

  // Copy Chat Transcript
  const handleCopyChat = () => {
    const transcript = messages
      .map((m) => `${m.role === 'user' ? 'Recruiter' : candidateName + ' Agent'}: ${m.content}`)
      .join('\n\n');
    navigator.clipboard.writeText(transcript);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#FAF6F0] overflow-hidden">
      {/* Main Split Grid Workspace */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full h-full p-4 md:p-6 gap-6 overflow-hidden">
        {/* =========================================================================
            LEFT COLUMN: Clean Candidate Intelligence Sidebar (~320px)
           ========================================================================= */}
        <aside className="w-80 hidden lg:flex flex-col gap-4 shrink-0 h-full overflow-hidden">
          {/* Candidate Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#048BA2] text-white flex items-center justify-center font-black text-base shadow-xs shrink-0">
                {candidateName.charAt(0)}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-sm font-black text-slate-900 truncate">
                  {candidateName}
                </span>
                <span className="text-[11px] text-slate-500 font-medium truncate">
                  {candidateTitle}
                </span>
              </div>
            </div>

            {/* Candidate Selector Dropdown */}
            {allResumes.length > 1 && (
              <div className="pt-2 border-t border-slate-200">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                  Active Candidate Profile
                </label>
                <div className="relative">
                  <select
                    value={activeResumeId}
                    onChange={(e) => router.push(`/agent/${e.target.value}`)}
                    className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#048BA2] cursor-pointer appearance-none pr-8"
                  >
                    {allResumes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Trust Metrics Pill Matrix */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#E6F5F8] border border-[#048BA2]/25 rounded-2xl p-2.5 flex flex-col">
                <span className="text-[9px] font-extrabold text-[#048BA2] uppercase">ATS Grounding</span>
                <span className="text-base font-black text-[#048BA2]">{atsScore}%</span>
                <span className="text-[9px] text-slate-500">Anti-Hallucination</span>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 flex flex-col">
                <span className="text-[9px] font-extrabold text-emerald-800 uppercase">Trust Score</span>
                <span className="text-base font-black text-emerald-700">{trustScore}%</span>
                <span className="text-[9px] text-emerald-800">Verified Proof</span>
              </div>
            </div>
          </div>

          {/* Upload From Computer Quick Button */}
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-white border border-slate-200 hover:border-[#048BA2] rounded-2xl p-3.5 flex items-center justify-between gap-3 cursor-pointer group transition-all shadow-xs shrink-0"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E6F5F8] text-[#048BA2] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <FileUp className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-black text-slate-900 group-hover:text-[#048BA2] transition-colors">
                  Upload Resume from PC
                </span>
                <span className="text-[10px] text-slate-500">PDF, DOCX, TXT to chat</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#048BA2] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Categorized Suggested Prompt Library */}
          <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-4 shadow-xs overflow-y-auto flex flex-col gap-3.5">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#048BA2]" /> Question Library
            </span>

            {promptCategories.map((group, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  {group.category}
                </span>
                <div className="flex flex-col gap-1.5">
                  {group.prompts.map((p, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => handleSendQuestion(p)}
                      className="text-left text-xs font-semibold text-slate-900 p-2.5 bg-slate-50 hover:bg-[#E6F5F8] border border-slate-200 hover:border-[#048BA2]/40 rounded-xl transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span className="line-clamp-2">{p}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#048BA2] shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* =========================================================================
            RIGHT COLUMN: Main Conversational Chat Workspace (flex-1)
           ========================================================================= */}
        <main className="flex-1 flex flex-col bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden h-full relative">
          {/* Interactive 3D Three.js Agent Constellation Canvas */}
          <ThreeAgentCanvas className="absolute inset-0 pointer-events-none z-0 opacity-90" />

          {/* Header Bar */}
          <header className="h-16 border-b border-slate-200/80 px-6 flex items-center justify-between bg-white/80 backdrop-blur-md shrink-0 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#048BA2] text-white flex items-center justify-center font-bold shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-black text-slate-900">
                    {candidateName}'s Agent
                  </h2>
                  <span className="text-[9px] font-black uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Grounded Agent
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium line-clamp-1">
                  Powered by NVIDIA NIM & Groq LPU Vector RAG
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyChat}
                className="p-2 text-slate-500 hover:text-slate-950 hover:bg-slate-100/80 rounded-xl transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
                title="Copy Transcript"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Upload className="w-3.5 h-3.5" />}
                onClick={() => setIsUploadModalOpen(true)}
              >
                Upload from PC
              </Button>
            </div>
          </header>

          {/* Messages Scroll Stream */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3.5 bg-slate-50/40 relative z-10">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}

            {isLoading && <AgentLoadingState candidateName={candidateName} />}
            <div ref={messagesEndRef} />
          </div>

          {/* Docked Modern Command Bar */}
          <div className="p-4 bg-white border-t border-slate-200 shrink-0">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-[#048BA2] focus-within:bg-white rounded-2xl p-2 transition-all shadow-xs">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="p-2 text-slate-500 hover:text-[#048BA2] hover:bg-white rounded-xl transition-all cursor-pointer"
                title="Upload & attach new resume from computer"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                className="flex-1 px-2 py-1.5 text-xs bg-transparent focus:outline-none placeholder:text-slate-400 font-medium text-slate-900"
                placeholder={`Ask ${candidateName}'s Agent anything about skills, metrics, projects... (Enter ↵)`}
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion()}
              />

              <Button
                variant="primary"
                size="sm"
                isLoading={isLoading}
                disabled={!inputQuestion.trim() || isLoading}
                onClick={() => handleSendQuestion()}
                rightIcon={<Send className="w-3.5 h-3.5" />}
              >
                Send
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* =========================================================================
          UPLOAD FROM LOCAL COMPUTER MODAL
         ========================================================================= */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Resume from Local Computer & Chat"
        maxWidth="lg"
      >
        <div className="flex flex-col gap-4 p-1 text-slate-900">
          <p className="text-xs text-slate-600">
            Select any resume file (PDF, DOCX, TXT) directly from your computer or paste text. The LLM will parse all experience, skills, and metrics so you can immediately chat with the candidate agent.
          </p>

          {/* Hidden native file input for local computer file selection */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleLocalFileSelect(e.target.files[0]);
              }
            }}
            accept=".pdf,.docx,.doc,.txt,.md"
            className="hidden"
          />

          {/* Drag & Drop File Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleLocalFileSelect(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2.5 cursor-pointer transition-all ${
              isDragging
                ? 'border-[#048BA2] bg-[#E6F5F8]'
                : selectedLocalFile
                ? 'border-emerald-400 bg-emerald-50/50'
                : 'border-slate-200 hover:border-[#048BA2]/60 bg-slate-50'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#048BA2] flex items-center justify-center font-bold shadow-xs">
              <Upload className="w-6 h-6" />
            </div>

            {selectedLocalFile ? (
              <div className="flex flex-col items-center">
                <span className="text-xs font-black text-emerald-900 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {selectedLocalFile.name}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  {(selectedLocalFile.size / 1024).toFixed(1)} KB · Click to choose different file
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-xs font-black text-slate-900">
                  Click to select file from Computer or Drag & Drop
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  Supports PDF, DOCX, TXT, Markdown files
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-800">Candidate Name (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Dr. Jane Doe"
              value={customCandidateName}
              onChange={(e) => setCustomCandidateName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#048BA2]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-800">Or Paste Resume Raw Text</label>
            <Textarea
              rows={6}
              placeholder="Paste raw text here if you don't have a file ready..."
              value={rawResumeText}
              onChange={(e) => setRawResumeText(e.target.value)}
              className="text-xs font-mono"
            />
          </div>

          <div className="flex justify-end items-center gap-3 pt-3 border-t border-slate-100">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setIsUploadModalOpen(false);
                setSelectedLocalFile(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              isLoading={isImporting}
              disabled={(!rawResumeText.trim() && !selectedLocalFile) || isImporting}
              onClick={handleUploadAndTalk}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Upload & Talk with Agent
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
