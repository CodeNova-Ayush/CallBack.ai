'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function JdMatchRootPage() {
  const router = useRouter();

  useEffect(() => {
    const activeId = typeof window !== 'undefined' ? localStorage.getItem('active_resume_id') : null;
    router.replace(`/jd-match/${activeId || 'demo-resume-alex-1'}`);
  }, [router]);

  return null;
}
