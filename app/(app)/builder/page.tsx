'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BuilderRootPage() {
  const router = useRouter();

  useEffect(() => {
    const activeId = typeof window !== 'undefined' ? localStorage.getItem('active_resume_id') : null;
    router.replace(`/builder/${activeId || 'demo-resume-alex-1'}`);
  }, [router]);

  return null;
}
