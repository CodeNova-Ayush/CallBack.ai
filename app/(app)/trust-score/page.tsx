'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TrustScoreRootPage() {
  const router = useRouter();

  useEffect(() => {
    const activeId = typeof window !== 'undefined' ? localStorage.getItem('active_resume_id') : null;
    router.replace(`/trust-score/${activeId || 'demo-resume-alex-1'}`);
  }, [router]);

  return null;
}
