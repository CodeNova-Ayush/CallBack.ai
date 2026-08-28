'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AnalyzerRootPage() {
  const router = useRouter();

  useEffect(() => {
    const activeId = typeof window !== 'undefined' ? localStorage.getItem('active_resume_id') : null;
    router.replace(`/analyzer/${activeId || 'demo-resume-alex-1'}`);
  }, [router]);

  return null;
}
