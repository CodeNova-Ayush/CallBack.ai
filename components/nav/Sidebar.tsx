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
  const activeResumeId = resumeIdMatch ? resumeIdMatch[2] : 'demo-resume-alex-1';

  const [candidateName, setCandidateName] = React.useState('Alex Morgan');
  const [candidateEmail, setCandidateEmail] = React.useState('alex.morgan@demo.com');

  React.useEffect(() => {
    if (!isLoaded || !user) return;

    const primaryEmail = user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress;
    setCandidateName(user.fullName || user.firstName || primaryEmail?.split('@')[0] || 'Signed-in user');
    if (primaryEmail) setCandidateEmail(primaryEmail);
  }, [isLoaded, user]);

  React.useEffect(() => {
    if (activeResumeId) {
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
            if (name) setCandidateName(name);
          }
        })
        .catch(console.error);
    }
  }, [activeResumeId]);

  const initials = candidateName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'AM';

  const navGroups: NavGroup[] = [
    {
      groupName: 'Build',
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Upload Old Resume', href: '/import-resume', icon: Upload, badge: 'ATS Audit' },
        { name: 'Resume Builder', href: `/builder/${activeResumeId}`, icon: FileText },
      ],
    },
    {
      groupName: 'Insights',
      items: [
        { name: 'ATS Analyzer', href: `/analyzer/${activeResumeId}`, icon: Sparkles },
        { name: 'JD Matcher', href: `/jd-match/${activeResumeId}`, icon: Target },
      ],
    },
    {
      groupName: 'Agentic Layer',
      items: [
        { name: 'Living Resume Agent', href: `/agent/${activeResumeId}`, icon: Bot, badge: 'Flagship' },
        { name: 'Import Resume to Talk', href: '/import-resume?mode=agent', icon: FileUp, badge: 'Talk AI' },
        { name: 'Trust Score & Claims', href: `/trust-score/${activeResumeId}`, icon: ShieldCheck },
        { name: 'Recruiter Companion', href: '/recruiter-dashboard', icon: UserCheck },
        { name: 'Opportunities & Apply', href: '/opportunities', icon: Briefcase },
        { name: 'Persistent Skill Graph', href: '/skill-graph', icon: GitGraph },
        { name: 'Voice Career Intake', href: '/voice-intake', icon: Mic },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-slate-50/90 backdrop-blur-xl border-r border-slate-200/80 h-screen sticky top-0 flex flex-col shrink-0 select-none z-30 print:hidden no-print">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-200/80 bg-white/50">
        <Logo size="md" showTagline />
      </div>

      {/* Navigation Group Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-6">
        {navGroups.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <span className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {group.groupName}
            </span>
            {group.items.map((item) => {
              const isActive = pathname === item.href || (item.href.startsWith('/builder') && pathname.startsWith('/builder'));
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'flex items-center justify-between px-3.5 py-2 text-xs font-bold rounded-full transition-all',
                    isActive
                      ? 'bg-[#048BA2] text-white shadow-md shadow-[#048BA2]/25'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white shadow-2xs hover:shadow-xs'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={clsx('w-4 h-4', isActive ? 'text-white' : 'text-slate-500')} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={clsx(
                        'px-2 py-0.5 text-[9px] font-extrabold rounded-full uppercase',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#E6F5F8] text-[#048BA2] border border-[#048BA2]/20'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-slate-200/80 bg-white/70 flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-[#048BA2] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
            {initials}
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-bold text-slate-900 truncate">{candidateName}</span>
            <span className="text-[10px] text-slate-500 truncate">{candidateEmail}</span>
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
          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title="Switch Account / Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
