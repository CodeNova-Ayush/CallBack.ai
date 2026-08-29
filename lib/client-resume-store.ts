/**
 * ============================================================================
 * 🔄 GLOBAL CLIENT RESUME STORE & SYNCHRONIZER
 * ============================================================================
 * 
 * Provides an immutable, persistent single-source-of-truth in the browser
 * across all CallBack.ai features (Living Agent, Builder, JD Match, Skill Graph,
 * Opportunities, ATS Analyzer, Trust Score, Dashboard, and Sidebar).
 */

export interface StoredResumeItem {
  id: string;
  title: string;
  candidateName: string;
  candidateTitle: string;
  candidateEmail?: string;
  candidatePhone?: string;
  candidateLocation?: string;
  atsScore: number;
  trustScore: number;
  updatedAt: string;
  isActive: boolean;
  template?: string;
  parsedSections: {
    personalInfo: any;
    experience: any[];
    education: any[];
    projects: any[];
    skills: string[];
    certifications?: string[];
  };
}

export const STORAGE_KEYS = {
  RESUMES_LIST: 'callback_ai_all_resumes_v2',
  ACTIVE_ID: 'active_resume_id',
  ACTIVE_TITLE: 'active_resume_title',
  ACTIVE_NAME: 'active_candidate_name',
  ACTIVE_TITLE_NAME: 'active_candidate_title',
  ACTIVE_EMAIL: 'active_candidate_email',
  ACTIVE_SKILLS: 'active_candidate_skills',
  ACTIVE_DATA: 'active_resume_data',
};

/**
 * Get all stored resumes from localStorage
 */
export function getStoredResumes(): StoredResumeItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESUMES_LIST);
    if (raw) {
      const list = JSON.parse(raw);
      if (Array.isArray(list) && list.length > 0) return list;
    }
  } catch (e) {
    console.warn('Error reading stored resumes:', e);
  }
  return [];
}

/**
 * Get the currently active resume from localStorage
 */
export function getActiveStoredResume(): StoredResumeItem | null {
  if (typeof window === 'undefined') return null;
  const list = getStoredResumes();
  const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_ID);

  if (activeId && list.length > 0) {
    const found = list.find((r) => r.id === activeId);
    if (found) return found;
  }

  // Also check individual saved key
  if (activeId) {
    try {
      const single = localStorage.getItem('callback_ai_saved_resume_' + activeId);
      if (single) {
        const parsed = JSON.parse(single);
        return {
          id: activeId,
          title: localStorage.getItem(STORAGE_KEYS.ACTIVE_TITLE) || 'Candidate Resume',
          candidateName: parsed.personalInfo?.fullName || localStorage.getItem(STORAGE_KEYS.ACTIVE_NAME) || 'Candidate',
          candidateTitle: parsed.personalInfo?.title || localStorage.getItem(STORAGE_KEYS.ACTIVE_TITLE_NAME) || 'Software Engineer',
          candidateEmail: parsed.personalInfo?.email || localStorage.getItem(STORAGE_KEYS.ACTIVE_EMAIL) || '',
          candidateLocation: parsed.personalInfo?.location || '',
          atsScore: 96,
          trustScore: 98,
          updatedAt: 'Recently Updated',
          isActive: true,
          parsedSections: {
            personalInfo: parsed.personalInfo || {},
            experience: parsed.experiences || parsed.experience || [],
            education: parsed.education || [],
            projects: parsed.projects || [],
            skills: parsed.skills || [],
            certifications: parsed.certifications || [],
          },
        };
      }
    } catch {}
  }

  if (list.length > 0) return list[0];
  return null;
}

/**
 * Save a newly imported or edited resume to localStorage and make it active
 */
export function saveResumeToStore(item: StoredResumeItem): void {
  if (typeof window === 'undefined') return;

  const currentList = getStoredResumes().filter((r) => r.id !== item.id && r.id !== 'demo-resume-alex-1');
  const updatedList = [item, ...currentList];

  try {
    localStorage.setItem(STORAGE_KEYS.RESUMES_LIST, JSON.stringify(updatedList));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ID, item.id);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TITLE, item.title);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_NAME, item.candidateName);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TITLE_NAME, item.candidateTitle);
    if (item.candidateEmail) localStorage.setItem(STORAGE_KEYS.ACTIVE_EMAIL, item.candidateEmail);
    if (item.parsedSections.skills) localStorage.setItem(STORAGE_KEYS.ACTIVE_SKILLS, JSON.stringify(item.parsedSections.skills));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_DATA, JSON.stringify(item.parsedSections));
    localStorage.setItem('callback_ai_saved_resume_' + item.id, JSON.stringify({
      personalInfo: item.parsedSections.personalInfo,
      experiences: item.parsedSections.experience,
      education: item.parsedSections.education,
      projects: item.parsedSections.projects,
      skills: item.parsedSections.skills,
      certifications: item.parsedSections.certifications,
    }));

    window.dispatchEvent(new Event('active_resume_changed'));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.error('Failed to save resume to store:', e);
  }
}

/**
 * Set an existing stored resume as the active resume
 */
export function setActiveResume(resumeId: string): void {
  if (typeof window === 'undefined') return;
  const list = getStoredResumes();
  const matched = list.find((r) => r.id === resumeId);

  localStorage.setItem(STORAGE_KEYS.ACTIVE_ID, resumeId);
  if (matched) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TITLE, matched.title);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_NAME, matched.candidateName);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TITLE_NAME, matched.candidateTitle);
    if (matched.candidateEmail) localStorage.setItem(STORAGE_KEYS.ACTIVE_EMAIL, matched.candidateEmail);
    if (matched.parsedSections?.skills) localStorage.setItem(STORAGE_KEYS.ACTIVE_SKILLS, JSON.stringify(matched.parsedSections.skills));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_DATA, JSON.stringify(matched.parsedSections));
  }

  window.dispatchEvent(new Event('active_resume_changed'));
  window.dispatchEvent(new Event('storage'));
}

/**
 * Get active candidate name with priority: Stored Active > Local Storage > Fallback
 */
export function getActiveCandidateName(fallback = 'Candidate Profile'): string {
  if (typeof window === 'undefined') return fallback;
  const active = getActiveStoredResume();
  if (active?.candidateName && active.candidateName !== 'Candidate Profile' && active.candidateName !== 'Candidate' && active.candidateName !== 'Alex Rivera') {
    return active.candidateName;
  }
  const storedName = localStorage.getItem(STORAGE_KEYS.ACTIVE_NAME);
  if (storedName && storedName !== 'Alex Rivera' && storedName !== 'Candidate Profile' && storedName !== 'Candidate') {
    return storedName;
  }
  return fallback;
}
