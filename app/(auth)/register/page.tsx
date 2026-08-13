'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

import { Logo } from '@/components/ui/Logo';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col justify-center items-center px-4 py-12">
      <Link href="/" className="mb-8">
        <Logo size="lg" showTagline />
      </Link>

      <Card className="w-full max-w-md p-8 bg-white border border-gray-200/90 shadow-xl rounded-2xl">
        <div className="flex flex-col gap-1 mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900">Create Account</h1>
          <p className="text-xs text-gray-500">Start building your ATS-optimized resume & candidate agent</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <Input
            label="Full Name"
            placeholder="e.g. Ayush Mishra"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="alex@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" isLoading={isLoading} className="mt-2 w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Create Account & Launch
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#4F46E5] hover:underline">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
}
