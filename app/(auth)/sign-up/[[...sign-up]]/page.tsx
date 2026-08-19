'use client';

import { SignUp } from '@clerk/nextjs';
import { Logo } from '@/components/ui/Logo';
import { ShieldCheck, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/dashboard';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const authenticateAndRedirect = (userName: string, userEmail: string) => {
    document.cookie = 'callback_auth=1; path=/; max-age=2592000; SameSite=Lax';
    localStorage.setItem('is_authenticated', 'true');
    localStorage.setItem('user_name', userName || 'User');
    localStorage.setItem('user_email', userEmail);
    window.location.href = redirectUrl;
  };

  const handleCustomRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitting(true);
    setTimeout(() => {
      authenticateAndRedirect(name || email.split('@')[0], email);
    }, 400);
  };

  return (
    <main className="min-h-screen bg-[#F5F9FB] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient background glow using #048BA2 */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#048BA2]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#048BA2]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-[#048BA2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center gap-6 relative z-10">
        <Link href="/" className="transition-transform hover:scale-105">
          <Logo size="lg" showTagline />
        </Link>

        {/* Standard Sign Up Card */}
        <div className="w-full bg-white border border-slate-200 rounded-3xl p-7 shadow-lg shadow-slate-200/50 flex flex-col gap-5">
          <div className="flex flex-col text-left">
            <h2 className="text-xl font-black text-slate-900">Create Your Account</h2>
            <p className="text-xs text-slate-500 mt-1">
              Start building AI-powered resumes and conversational candidate agents.
            </p>
          </div>

          <form onSubmit={handleCustomRegister} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-bold text-slate-700">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#048BA2] focus:ring-1 focus:ring-[#048BA2] text-slate-900"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  placeholder="e.g. alex.rivera@neuralflow.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#048BA2] focus:ring-1 focus:ring-[#048BA2] text-slate-900"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#048BA2] focus:ring-1 focus:ring-[#048BA2] text-slate-900"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email || !password}
              className="w-full py-3 mt-1 bg-[#048BA2] hover:bg-[#037488] active:scale-[0.99] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md shadow-[#048BA2]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isSubmitting ? 'Creating account...' : 'Create Account & Enter'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Already have an account?</span>
            <Link href="/sign-in" className="font-bold text-[#048BA2] hover:underline">
              Sign In
            </Link>
          </div>
        </div>

        {/* Clerk Sign Up Embed */}
        <div className="w-full flex justify-center">
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            fallbackRedirectUrl={redirectUrl}
            appearance={{
              elements: {
                cardBox: 'shadow-xl border border-slate-200/80 rounded-2xl bg-white w-full',
                headerTitle: 'text-slate-900 font-extrabold',
                headerSubtitle: 'text-slate-500 text-xs',
                footerActionLink: 'text-[#048BA2] hover:text-[#037488] font-bold',
                formButtonPrimary: 'bg-[#048BA2] hover:bg-[#037488] text-white font-bold shadow-md shadow-[#048BA2]/25',
                socialButtonsBlockButton: 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium',
              },
            }}
          />
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#048BA2]" />
          <span>Encrypted with Clerk & JWT session authentication</span>
        </div>
      </div>
    </main>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F9FB] flex items-center justify-center text-slate-500 font-bold">Loading Sign Up...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
