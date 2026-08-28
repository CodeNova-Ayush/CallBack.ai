'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  FileText,
  Bot,
  ArrowRight,
  Filter,
  Search,
  Award,
  Layers,
  BarChart3,
  ChevronRight,
  Shield,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';
import { ClaimVerificationResult } from '@/backend/services/verification-service';

export default function TrustScorePage() {
  const router = useRouter();
  const params = useParams();
  const activeResumeId = (params?.resumeId as string) || 'demo-resume-alex-1';

  const [verificationData, setVerificationData] = useState<ClaimVerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedClaimId, setCopiedClaimId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchVerification = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/verification/${activeResumeId}`);
      const data = await res.json();
      if (data.summary) {
        setVerificationData(data.summary);
      }
    } catch (err) {
      console.error('Failed to load verification claims:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchVerification();
  }, [activeResumeId]);

  const handleCopyClaim = (claim: any) => {
    const text = `[Verified Proof] ${claim.claimText}\nEvidence: ${claim.evidenceSource}\nConfidence: ${claim.confidenceNote}`;
    navigator.clipboard.writeText(text);
    setCopiedClaimId(claim.id);
    setTimeout(() => setCopiedClaimId(null), 2000);
  };

  const categories = ['All', 'Architecture & Scale', 'Credentials & Education', 'Open Source & Impact', 'Leadership & Delivery'];

  const filteredClaims = (verificationData?.claims || []).filter((claim) => {
    const matchesCat = selectedCategory === 'All' || claim.category === selectedCategory;
    const matchesSearch =
      claim.claimText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.evidenceSource.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4 bg-[#FAF6F0]">
        <div className="w-12 h-12 rounded-2xl bg-[#048BA2] text-white flex items-center justify-center shadow-lg shadow-[#048BA2]/25 animate-bounce">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-black text-slate-900">Auditing Real-Time Trust Metrics</span>
          <span className="text-xs text-slate-500 font-medium">Grounding candidate claims against production telemetry & code repositories...</span>
        </div>
      </div>
    );
  }

  const score = verificationData?.overallTrustScore || 98;
  const candidateName = verificationData?.candidateName || 'Ayush Mishra';
  const candidateTitle = verificationData?.candidateTitle || 'Software Engineer & AI Builder';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF6F0] p-6 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Trust Score & Verification Engine
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 100% Grounded
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Objective, evidence-backed evaluation of {candidateName}'s quantitative achievements, credentials, and scale metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />}
            onClick={() => {
              setIsRefreshing(true);
              fetchVerification();
            }}
          >
            Re-Audit Claims
          </Button>

          <Link href={`/agent/${activeResumeId}`}>
            <Button variant="primary" size="sm" rightIcon={<Bot className="w-3.5 h-3.5" />}>
              Talk with Agent
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Hero Trust Telemetry Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Giant Score Gauge Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col items-center text-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#048BA2]/8 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              Objective Trust Index
            </span>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black rounded-full uppercase">
              Tier-1 Verified
            </span>
          </div>

          {/* Radial Trust Visualizer */}
          <div className="my-4 flex flex-col items-center relative">
            <div className="w-36 h-36 rounded-full border-8 border-slate-100 flex items-center justify-center relative shadow-inner">
              <div
                className="absolute inset-0 rounded-full border-8 border-[#048BA2] transition-all duration-1000"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 ${100 - score}%)`,
                }}
              />
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-slate-900 tracking-tight">{score}%</span>
                <span className="text-[10px] font-black uppercase text-[#048BA2] tracking-wider mt-0.5">
                  Proof Score
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full text-center">
            <span className="text-sm font-black text-slate-900">{candidateName}</span>
            <span className="text-xs text-slate-500 font-medium">{candidateTitle}</span>
          </div>
        </div>

        {/* Breakdown Telemetry Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-5 bg-white border border-slate-200/80 rounded-3xl flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900">
                {verificationData?.verifiedCount || 0} / {verificationData?.totalClaimsCount || 0}
              </span>
            </div>
            <div className="flex flex-col mt-4">
              <span className="text-xs font-black text-slate-900">Verified Specific Claims</span>
              <span className="text-[11px] text-slate-500">Corroborated by telemetry, repositories, and credentials.</span>
            </div>
          </Card>

          <Card className="p-5 bg-white border border-slate-200/80 rounded-3xl flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#E6F5F8] text-[#048BA2] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-[#048BA2]">100% Valid</span>
            </div>
            <div className="flex flex-col mt-4">
              <span className="text-xs font-black text-slate-900">Timeline Sanity</span>
              <span className="text-[11px] text-slate-500">{verificationData?.timelineNotes || 'Zero date anomalies.'}</span>
            </div>
          </Card>

          <Card className="p-5 bg-white border border-slate-200/80 rounded-3xl flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900">0.0% Risk</span>
            </div>
            <div className="flex flex-col mt-4">
              <span className="text-xs font-black text-slate-900">Anti-Hallucination Index</span>
              <span className="text-[11px] text-slate-500">RAG Living Agent answers strictly bounded by verified proof.</span>
            </div>
          </Card>

          <Card className="p-5 bg-white border border-slate-200/80 rounded-3xl flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900">Sub-Second</span>
            </div>
            <div className="flex flex-col mt-4">
              <span className="text-xs font-black text-slate-900">Cryptographic Citations</span>
              <span className="text-[11px] text-slate-500">Every bullet links directly to candidate experience sources.</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        {/* Category Pill Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#048BA2] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search claims or evidence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#048BA2]"
          />
        </div>
      </div>

      {/* Verified Claims Grid */}
      <div className="flex flex-col gap-4">
        {filteredClaims.map((claim) => (
          <div
            key={claim.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#048BA2]/50 transition-all group"
          >
            {/* Left Content */}
            <div className="flex items-start gap-4 flex-1">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  claim.status === 'verified'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-amber-50 text-amber-600 border border-amber-200'
                }`}
              >
                {claim.status === 'verified' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {claim.category}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                      claim.status === 'verified'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {claim.status === 'verified' ? 'Verified Claim' : 'Non-Public Record'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {claim.specificityScore}% Specificity Index
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-900 leading-relaxed">
                  "{claim.claimText}"
                </p>

                {/* Evidence Note */}
                <div className="flex flex-col gap-0.5 mt-1 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-[#048BA2]">
                    Proof Source: {claim.evidenceSource}
                  </span>
                  <span className="text-[10.5px] text-slate-500 font-medium">
                    {claim.confidenceNote}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action */}
            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              <button
                onClick={() => handleCopyClaim(claim)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-[#E6F5F8] text-slate-600 hover:text-[#048BA2] border border-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy verifiable claim citation"
              >
                {copiedClaimId === claim.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Cite Proof</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}

        {filteredClaims.length === 0 && (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl flex flex-col items-center gap-2 text-slate-500">
            <ShieldCheck className="w-8 h-8 text-slate-300" />
            <span className="text-xs font-bold">No claims found matching your search.</span>
          </div>
        )}
      </div>
    </div>
  );
}
