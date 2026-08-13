'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, ArrowRight, User, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

import { Logo } from '@/components/ui/Logo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('ayush.mishra@demo.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (email.includes('recruiter') || email.includes('sarah')) {
        router.push('/recruiter-dashboard');
      } else {
        router.push('/dashboard');
      }
    }, 400);
  };

  const handleQuickDemoLogin = (role: 'candidate' | 'recruiter') => {
    setIsLoading(true);
    setTimeout(() => {
      if (role === 'candidate') {
        router.push('/dashboard');
      } else {
        router.push('/recruiter-dashboard');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col justify-center items-center px-4 py-12">
      <Link href="/" className="mb-8">
        <Logo size="lg" showTagline />
      </Link>

      <Card className="w-full max-w-md p-8 bg-white border border-gray-200/90 shadow-xl rounded-2xl">
        <div className="flex flex-col gap-1 mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900">Welcome Back</h1>
          <p className="text-xs text-gray-500">Sign in to your candidate or recruiter agent workspace</p>
        </div>

        {/* Quick Demo Login Buttons for Live Demo */}
        <div className="mb-6 p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex flex-col gap-2">
          <span className="text-[11px] font-bold text-[#4F46E5] uppercase tracking-wider text-center">
            ⚡ Instant Live Demo Access
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('candidate')}
              className="py-2 px-3 bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-lg border border-indigo-200 flex items-center justify-center gap-1.5 shadow-2xs transition-all"
            >
              <User className="w-3.5 h-3.5 text-[#4F46E5]" /> Candidate
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('recruiter')}
              className="py-2 px-3 bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-lg border border-indigo-200 flex items-center justify-center gap-1.5 shadow-2xs transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Recruiter
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" isLoading={isLoading} className="mt-2 w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
          Don't have an account?{' '}
          <Link href="/register" className="font-semibold text-[#4F46E5] hover:underline">
            Create One
          </Link>
        </div>
      </Card>
    </div>
  );
}
