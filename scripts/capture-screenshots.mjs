import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('public/screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const PAGES_TO_CAPTURE = [
  { url: 'http://localhost:3000/', filename: '01-landing-page.png', title: 'Landing Page & 40+ Templates Showcase' },
  { url: 'http://localhost:3000/dashboard', filename: '02-candidate-dashboard.png', title: 'Candidate Workspace Dashboard' },
  { url: 'http://localhost:3000/builder/demo-resume-alex-1', filename: '03-resume-builder.png', title: '3-Zone Resume Builder & A4 Canvas' },
  { url: 'http://localhost:3000/agent/demo-resume-alex-1', filename: '05-rag-candidate-agent.png', title: 'Living Candidate RAG Agent' },
  { url: 'http://localhost:3000/analyzer/demo-resume-alex-1', filename: '04-ats-analyzer.png', title: 'Deep ATS Audit & Bullet Enhancer' },
  { url: 'http://localhost:3000/jd-match/demo-resume-alex-1', filename: '06-jd-match.png', title: 'Job Description Matcher & Keyword Gap' },
  { url: 'http://localhost:3000/recruiter-dashboard', filename: '07-recruiter-dashboard.png', title: 'Recruiter Evaluation Companion' },
  { url: 'http://localhost:3000/trust-score/demo-resume-alex-1', filename: '08-claim-verification.png', title: 'Claim Verification & Trust Score Engine' },
  { url: 'http://localhost:3000/opportunities', filename: '09-opportunities-tailor.png', title: 'Auto-Tailor Job Matches & Opportunities' },
  { url: 'http://localhost:3000/skill-graph', filename: '10-skill-graph.png', title: 'Persistent Verified Skill Graph' },
  { url: 'http://localhost:3000/voice-intake', filename: '11-voice-intake.png', title: 'Voice-Native Career Intake Engine' },
  { url: 'http://localhost:3000/import-resume', filename: '12-import-old-resume.png', title: 'Binary Document Dropzone & Import' },
];

async function captureAll() {
  console.log('🚀 Launching Puppeteer browser to capture real live screenshots...');
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  for (const item of PAGES_TO_CAPTURE) {
    try {
      console.log(`📸 Capturing: ${item.title} -> ${item.url}`);
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 1200)); // allow animations and state to settle
      const filePath = path.join(SCREENSHOT_DIR, item.filename);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`✅ Saved: ${filePath}`);
    } catch (err) {
      console.error(`❌ Failed to capture ${item.url}:`, err.message);
    }
  }

  await browser.close();
  console.log('🎉 All live screenshots successfully captured!');
}

captureAll();
