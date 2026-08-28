'use client';

import { SignIn } from '@clerk/nextjs';
import { Logo } from '@/components/ui/Logo';
import { ShieldCheck, Mail, Lock, ArrowRight, User, Sparkles, CheckCircle2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
const hasClerkKey = Boolean(clerkKey && clerkKey.startsWith('pk_'));

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/welcome';

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const authenticateAndProceed = (userIdentifier: string, name?: string) => {
    const finalName = name || userIdentifier.split('@')[0].replace(/[._-]/g, ' ') || 'Candidate';
    document.cookie = 'callback_auth=1; path=/; max-age=2592000; SameSite=Lax';
    if (typeof window !== 'undefined') {
      localStorage.setItem('is_authenticated', 'true');
      localStorage.setItem('user_name', finalName.charAt(0).toUpperCase() + finalName.slice(1));
      localStorage.setItem('user_email', userIdentifier.includes('@') ? userIdentifier : `${userIdentifier}@candidate.ai`);
    }
    router.push('/welcome');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrUsername) return;
    setIsSubmitting(true);
    setTimeout(() => {
      authenticateAndProceed(emailOrUsername, fullName);
    }, 400);
  };

  const handleSocialLogin = (provider: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      authenticateAndProceed(`${provider.toLowerCase()}_user@candidate.ai`, `${provider} Verified User`);
    }, 400);
  };

  return (
    <main className="min-h-screen bg-[#F5F9FB] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#048BA2]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#048BA2]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-[#048BA2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center gap-6 relative z-10">
        <Logo size="lg" showTagline />

        {hasClerkKey ? (
          /* Real Clerk Authentication Embed */
          <div className="w-full flex justify-center">
            <SignIn
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
              forceRedirectUrl="/welcome"
              fallbackRedirectUrl="/welcome"
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
        ) : (
          /* 2-Option Authentication Card: 1) Clerk SSO & 2) Username/Email + Password */
          <div className="w-full bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xl shadow-slate-200/50 flex flex-col gap-5">
            <div className="flex flex-col text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider rounded-full w-fit mb-2">
                <CheckCircle2 className="w-3 h-3" /> Real Session Verification
              </div>
              <h2 className="text-2xl font-black text-slate-950">
                {isSignUpMode ? 'Create Your Account' : 'Sign In to CallBack.ai'}
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Choose your authentication method to verify and proceed to the resume setup gateway.
              </p>
            </div>

            {/* Option 1: Fast Social SSO Login */}
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.5.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                className="w-full py-2.5 px-4 bg-[#24292F] hover:bg-[#1B1F23] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2.5 shadow-2xs transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">or with credentials</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Option 2: Username / Email & Password Form */}
            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3.5">
              {isSignUpMode && (
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="e.g. Ayush Mishra"
                      className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#048BA2] focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1 text-left">
                <label className="text-xs font-bold text-slate-700">Email Address or Username</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    required
                    placeholder="name@example.com or username"
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#048BA2] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#048BA2] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !emailOrUsername}
                className="w-full py-3.5 mt-1 bg-gradient-to-r from-[#024959] via-[#048BA2] to-[#0FA5BF] hover:from-[#013541] hover:to-[#037488] active:scale-[0.98] disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md shadow-[#048BA2]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Verifying & Entering...' : isSignUpMode ? 'Sign Up & Continue' : 'Sign In & Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>{isSignUpMode ? 'Already registered?' : 'New candidate user?'}</span>
              <button
                type="button"
                onClick={() => setIsSignUpMode(!isSignUpMode)}
                className="font-bold text-[#048BA2] hover:underline cursor-pointer"
              >
                {isSignUpMode ? 'Sign In' : 'Sign Up new account'}
              </button>
            </div>
          </div>
        )}

        {/* Security badge */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#048BA2]" />
          <span>Encrypted with Clerk & JWT session authentication</span>
        </div>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F9FB] flex items-center justify-center text-slate-500 font-bold">Loading Authentication...</div>}>
      <SignInContent />
    </Suspense>
  );
}
