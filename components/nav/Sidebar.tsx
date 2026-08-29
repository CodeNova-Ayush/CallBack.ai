'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppAuth as useAuth, useAppUser as useUser } from '@/components/auth/AuthProvider';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Target,
  Bot,
  ShieldCheck,
  Briefcase,
  GitGraph,
  Mic,
  Settings,
  LogOut,
  UserCheck,
  User,
  Upload,
  FileUp,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { clsx } from 'clsx';

interface NavGroup {
  groupName: string;
  items: {
    name: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const { isLoaded, user } = useUser();
  const resumeIdMatch = pathname.match(/\/(builder|analyzer|jd-match|agent|trust-score)\/([^\/]+)/);
  const [activeResumeId, setActiveResumeId] = React.useState<string>(() => {
    if (resumeIdMatch) return resumeIdMatch[2];
    if (typeof window !== 'undefined') {
      return localStorage.getItem('active_resume_id') || 'demo-resume-alex-1';
    }
    return 'demo-resume-alex-1';
  });

  React.useEffect(() => {
    if (resumeIdMatch) {
      if (resumeIdMatch[2] !== 'demo-resume-alex-1') {
        setActiveResumeId(resumeIdMatch[2]);
        if (typeof window !== 'undefined') {
          localStorage.setItem('active_resume_id', resumeIdMatch[2]);
        }
      }
    } else if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('active_resume_id');
      if (stored) setActiveResumeId(stored);
    }
  }, [pathname, resumeIdMatch]);

  React.useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('active_resume_id');
        if (stored) setActiveResumeId(stored);
      }
    };
    window.addEventListener('active_resume_changed', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('active_resume_changed', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const [candidateName, setCandidateName] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('active_candidate_name') || 'Candidate Profile';
    }
    return 'Candidate Profile';
  });
  const [candidateEmail, setCandidateEmail] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('active_candidate_email') || 'candidate@callback.ai';
    }
    return 'candidate@callback.ai';
  });

  const syncIdentityFromStorage = () => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('active_candidate_name');
      const storedEmail = localStorage.getItem('active_candidate_email');
      const storedId = localStorage.getItem('active_resume_id');
      if (storedName) setCandidateName(storedName);
      if (storedEmail) setCandidateEmail(storedEmail);
      if (storedId) setActiveResumeId(storedId);
    }
  };

  React.useEffect(() => {
    syncIdentityFromStorage();
    const handleStorageChange = () => {
      syncIdentityFromStorage();
    };
    window.addEventListener('active_resume_changed', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('active_resume_changed', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  React.useEffect(() => {
    if (!isLoaded || !user) return;

    const primaryEmail = user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress;
    const name = user.fullName || user.firstName || primaryEmail?.split('@')[0];
    if (name && candidateName === 'Candidate Profile') setCandidateName(name);
    if (primaryEmail && candidateEmail === 'candidate@callback.ai') setCandidateEmail(primaryEmail);
  }, [isLoaded, user]);

  React.useEffect(() => {
    if (activeResumeId) {
      // 1. Check local storage
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('callback_ai_saved_resume_' + activeResumeId);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed.personalInfo?.fullName) {
              setCandidateName(parsed.personalInfo.fullName);
              localStorage.setItem('active_candidate_name', parsed.personalInfo.fullName);
            }
            if (parsed.personalInfo?.email) {
              setCandidateEmail(parsed.personalInfo.email);
              localStorage.setItem('active_candidate_email', parsed.personalInfo.email);
            }
          } catch {}
        }
      }

      // 2. Fetch API
      fetch(`/api/resumes/${activeResumeId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.resume) {
            let name = '';
            if (data.resume.sections) {
              const pInfo = data.resume.sections.find((s: any) => s.sectionType === 'personal_info');
              if (pInfo) {
                try {
                  const parsed = typeof pInfo.content === 'string' ? JSON.parse(pInfo.content) : pInfo.content;
                  if (parsed.fullName || parsed.name) name = parsed.fullName || parsed.name;
                  if (parsed.email) setCandidateEmail(parsed.email);
                } catch {}
              }
            }
            if (!name && data.resume.title) {
              name = data.resume.title.split('—')[0].trim();
            }
            if (name) {
              setCandidateName(name);
              if (typeof window !== 'undefined') {
                localStorage.setItem('active_candidate_name', name);
              }
            }
          }
        })
        .catch(() => {});
    }
  }, [activeResumeId]);

  const initials = candidateName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'CP';

  const navGroups: NavGroup[] = [
    {
      groupName: 'Build',
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Upload Old Resume', href: '/import-resume', icon: Upload, badge: 'ATS Audit' },
        { name: 'Resume Builder', href: '/builder', icon: FileText },
      ],
    },
    {
      groupName: 'Insights',
      items: [
        { name: 'ATS Analyzer', href: '/analyzer', icon: Sparkles },
        { name: 'JD Matcher', href: '/jd-match', icon: Target },
      ],
    },
    {
      groupName: 'Agentic Layer',
      items: [
        { name: 'Living Resume Agent', href: '/agent', icon: Bot, badge: 'Flagship' },
        { name: 'Import Resume to Talk', href: '/import-resume?mode=agent', icon: FileUp, badge: 'Talk AI' },
        { name: 'Trust Score & Claims', href: '/trust-score', icon: ShieldCheck },
        { name: 'Recruiter Companion', href: '/recruiter-dashboard', icon: UserCheck },
        { name: 'Opportunities & Apply', href: '/opportunities', icon: Briefcase },
        { name: 'Persistent Skill Graph', href: '/skill-graph', icon: GitGraph },
        { name: 'Voice Career Intake', href: '/voice-intake', icon: Mic },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200/70 h-screen sticky top-0 flex flex-col shrink-0 select-none z-30 print:hidden no-print">
      {/* Brand Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <Logo size="md" showTagline />
      </div>

      {/* Navigation Group Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-slate-200">
        {navGroups.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-0.5">
            <span className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              {group.groupName}
            </span>

            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href.startsWith('/builder') && pathname.startsWith('/builder')) ||
                  (item.href.startsWith('/analyzer') && pathname.startsWith('/analyzer')) ||
                  (item.href.startsWith('/jd-match') && pathname.startsWith('/jd-match')) ||
                  (item.href.startsWith('/agent') && pathname.startsWith('/agent')) ||
                  (item.href.startsWith('/trust-score') && pathname.startsWith('/trust-score'));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={true}
                    className={clsx(
                      'flex items-center justify-between px-3 py-2 text-[13px] rounded-lg transition-colors',
                      isActive
                        ? 'bg-[#048BA2] text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={clsx('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-slate-400')} />
                      <span className="truncate">{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={clsx(
                          'px-1.5 py-0.5 text-[10px] font-semibold rounded leading-none shrink-0',
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badge === 'Flagship'
                            ? 'bg-amber-50 text-amber-600 border border-amber-200/60'
                            : item.badge === 'Talk AI'
                            ? 'bg-[#E6F5F8] text-[#048BA2] border border-[#048BA2]/20'
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden pl-1">
          <div className="w-8 h-8 rounded-full bg-[#048BA2] text-white flex items-center justify-center text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-semibold text-slate-900 truncate">{candidateName}</span>
            <span className="text-[11px] text-slate-500 truncate">{candidateEmail}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={async () => {
            localStorage.removeItem('is_authenticated');
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_email');
            await signOut({ redirectUrl: '/sign-in' });
          }}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          title="Sign Out / Switch Account"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
