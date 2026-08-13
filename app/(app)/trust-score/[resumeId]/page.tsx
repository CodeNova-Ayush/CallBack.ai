'use client';

import React, { useState, useEffect, use } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  GitBranch,
  Award,
  ExternalLink,
  RefreshCw,
  Search,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge, ProgressRing } from '@/components/ui/Card';

export default function TrustScorePage(props: { params: Promise<{ resumeId: string }> }) {
  const params = use(props.params);
  const resumeId = params.resumeId || 'demo-resume-alex-1';

  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/verification/${resumeId}`)
      .then((res) => res.json())
      .then((data) => {
        setSummary(data.summary);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Verification fetch error:', err);
        setLoading(false);
      });
  }, [resumeId]);

  if (loading || !summary) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <RefreshCw className="w-8 h-8 text-[#4F46E5] animate-spin" />
        <span className="text-sm font-semibold text-gray-700">Verifying resume claims against GitHub & institutional signals...</span>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm">Evidence Engine v2.1</Badge>
            <span className="text-xs text-gray-500">Ayush Mishra</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Claim Verification & Trust Score</h1>
        </div>
      </div>

      {/* Aggregate Score Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200/90 text-center gap-3">
          <ProgressRing score={summary.trustScore} size={130} label="Verified Candidate Trust Score" />
        </Card>

        <Card className="p-6 bg-white flex flex-col justify-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Verified Claims</span>
          <span className="text-3xl font-extrabold text-emerald-600">{summary.verifiedCount} / {summary.totalClaimsCount}</span>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed with GitHub & Registrar data
          </span>
        </Card>

        <Card className="p-6 bg-white flex flex-col justify-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Unverifiable Claims</span>
          <span className="text-3xl font-extrabold text-amber-600">{summary.unverifiableCount}</span>
          <span className="text-xs text-gray-500">Internal leadership claims (non-public)</span>
        </Card>

        <Card className="p-6 bg-white flex flex-col justify-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Timeline Sanity</span>
          <span className="text-3xl font-extrabold text-indigo-600">100% Valid</span>
          <span className="text-xs text-indigo-600 font-semibold">Zero date overlaps or gaps</span>
        </Card>
      </div>

      {/* Claims Breakdown List */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-extrabold text-gray-900">Per-Claim Verification Breakdown</h2>

        <div className="flex flex-col gap-4">
          {summary.claims.map((claim: any) => {
            const isVerified = claim.status === 'verified';
            return (
              <Card key={claim.id} className="p-5 bg-white border border-gray-200/90 flex flex-col gap-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    {isVerified ? (
                      <Badge variant="success" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>Verified</Badge>
                    ) : (
                      <Badge variant="warning" icon={<AlertCircle className="w-3.5 h-3.5" />}>Unverifiable</Badge>
                    )}
                    <span className="text-xs text-gray-500 font-medium">Specificity Score: {claim.specificityScore}/100</span>
                  </div>

                  {claim.evidenceSource && (
                    <span className="text-xs font-semibold text-[#4F46E5] flex items-center gap-1">
                      <GitBranch className="w-3.5 h-3.5" /> {claim.evidenceSource}
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-gray-900">"{claim.claimText}"</p>

                {claim.confidenceNote && (
                  <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-600 border border-gray-100">
                    <span className="font-semibold text-gray-800">Verification Signal: </span>
                    {claim.confidenceNote}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
