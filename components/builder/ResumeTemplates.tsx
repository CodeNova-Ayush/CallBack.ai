import React from 'react';
import { clsx } from 'clsx';

export type TemplateId =
  | 'classic_ats'
  | 'modern_executive'
  | 'navy_sidebar'
  | 'navy_header'
  | 'right_sidebar'
  | 'soft_green_pill'
  | 'minimalist_tech'
  | 'yellow_creative';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website?: string;
    summary: string;
  };
  experiences: {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    bullets: string[];
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa: string;
  }[];
  projects: {
    id: string;
    title: string;
    techStack: string;
    link: string;
    bullets: string[];
  }[];
  skills: string[];
}

interface ResumeTemplateProps {
  templateId: TemplateId;
  data: ResumeData;
  zoomLevel?: number;
}

export const ResumeTemplateRenderer: React.FC<ResumeTemplateProps> = ({
  templateId,
  data,
  zoomLevel = 100,
}) => {
  const { personalInfo, experiences, education, projects, skills } = data;

  const hasData =
    personalInfo.fullName ||
    personalInfo.email ||
    experiences.length > 0 ||
    education.length > 0 ||
    projects.length > 0 ||
    skills.length > 0;

  return (
    <div
      className="bg-white text-[#231F1D] shadow-2xl rounded-sm p-10 min-h-[1050px] w-[750px] transition-transform origin-top flex flex-col gap-6 print:shadow-none print:w-full print:p-0 select-text relative"
      style={{ transform: `scale(${zoomLevel / 100})` }}
    >
      {!hasData && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-gray-400 bg-gray-50/50 backdrop-blur-xs rounded-sm z-20">
          <span className="text-base font-bold text-gray-700 mb-1">Your Resume Canvas is Empty</span>
          <span className="text-xs text-gray-500 max-w-xs">Fill out the sections on the left form panel to live-render your resume.</span>
        </div>
      )}

      {/* 1. Classic ATS Standard (Helen Willis style) */}
      {templateId === 'classic_ats' && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center text-center border-b-2 border-gray-900 pb-4">
            <h1 className="text-2xl font-bold font-serif text-gray-900 uppercase tracking-widest">{personalInfo.fullName || 'YOUR NAME'}</h1>
            <div className="text-xs text-gray-700 flex flex-wrap justify-center gap-2 mt-1 font-serif">
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.email && <span>• {personalInfo.email}</span>}
              {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
            </div>
          </div>

          {personalInfo.summary && (
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-0.5 font-serif">Professional Summary</h3>
              <p className="text-xs text-gray-800 leading-relaxed text-justify mt-1 font-serif">{personalInfo.summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-0.5 font-serif">Work Experience</h3>
              {experiences.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-1 font-serif">
                  <div className="flex justify-between items-baseline text-xs font-bold text-gray-900">
                    <span>{exp.role} — <span className="font-semibold text-gray-800">{exp.company}</span></span>
                    <span className="text-gray-600 font-normal">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-gray-800 flex flex-col gap-1 mt-0.5 pl-1">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div className="flex flex-col gap-3 font-serif">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-0.5">Projects</h3>
              {projects.map((proj) => (
                <div key={proj.id} className="flex flex-col gap-1">
                  <div className="flex justify-between items-baseline text-xs font-bold text-gray-900">
                    <span>{proj.title} <span className="text-[#C85A32] font-normal text-[11px]">({proj.techStack})</span></span>
                    <span className="text-gray-500 font-normal">{proj.link}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-gray-800 flex flex-col gap-1 mt-0.5 pl-1">
                    {proj.bullets.map((b, idx) => (
                      <li key={idx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div className="flex flex-col gap-2 font-serif">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-0.5">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-xs">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">{edu.degree}</span>
                    <span className="text-gray-700">{edu.institution} {edu.gpa ? `— GPA ${edu.gpa}` : ''}</span>
                  </div>
                  <span className="text-gray-500">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div className="flex flex-col gap-1 font-serif">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-0.5">Skills</h3>
              <p className="text-xs text-gray-800 leading-relaxed">{skills.join(' • ')}</p>
            </div>
          )}
        </div>
      )}

      {/* 2. Modern Executive (Terracotta Banner) */}
      {templateId === 'modern_executive' && (
        <div className="flex flex-col gap-5">
          <div className="p-5 bg-[#FAF6F0] border-l-4 border-[#C85A32] rounded-r-xl flex flex-col gap-2">
            <h1 className="text-2xl font-extrabold text-[#231F1D] tracking-tight">{personalInfo.fullName || 'YOUR NAME'}</h1>
            <div className="text-xs text-[#786F68] flex flex-wrap gap-3 font-semibold">
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.email && <span>• {personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.linkedin && <span className="text-[#C85A32]">• {personalInfo.linkedin}</span>}
            </div>
            {personalInfo.summary && (
              <p className="text-xs text-[#4A423C] leading-relaxed mt-1 italic">{personalInfo.summary}</p>
            )}
          </div>

          {experiences.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-extrabold text-[#C85A32] uppercase tracking-wider border-b border-[#F6DCD1] pb-1">Professional Experience</h3>
              {experiences.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-1.5 bg-[#FAF6F0]/40 p-3 rounded-lg border border-[#EAE3D5]">
                  <div className="flex justify-between items-baseline text-xs font-bold text-[#231F1D]">
                    <span className="text-[#C85A32]">{exp.role} <span className="text-[#231F1D]">at {exp.company}</span></span>
                    <span className="text-[#786F68] text-[11px] font-semibold">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-[#231F1D] flex flex-col gap-1 pl-1">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-extrabold text-[#C85A32] uppercase tracking-wider border-b border-[#F6DCD1] pb-1">Featured Projects</h3>
                {projects.map((proj) => (
                  <div key={proj.id} className="text-xs flex flex-col gap-1 bg-[#FAF6F0]/40 p-2.5 rounded-lg border border-[#EAE3D5]">
                    <span className="font-bold text-[#231F1D]">{proj.title}</span>
                    <span className="text-[11px] text-[#C85A32] font-semibold">{proj.techStack}</span>
                  </div>
                ))}
              </div>
            )}

            {skills.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-extrabold text-[#C85A32] uppercase tracking-wider border-b border-[#F6DCD1] pb-1">Core Competencies</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((sk, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-[#FDF4F0] border border-[#F6DCD1] text-[#C85A32] text-[11px] font-bold rounded-full">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Deep Navy Header Banner (Maria Dean style) */}
      {templateId === 'navy_header' && (
        <div className="flex flex-col gap-5">
          <div className="bg-[#0D3B66] text-white p-6 rounded-xl flex flex-col items-center text-center gap-2 shadow-md">
            <h1 className="text-2xl font-extrabold uppercase tracking-wide">{personalInfo.fullName || 'YOUR NAME'}</h1>
            <div className="text-xs text-sky-200 flex flex-wrap justify-center gap-3 font-medium">
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.email && <span>• {personalInfo.email}</span>}
            </div>
          </div>

          {personalInfo.summary && (
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-extrabold text-[#0D3B66] uppercase tracking-wider border-b-2 border-[#0D3B66] pb-0.5">Summary</h3>
              <p className="text-xs text-gray-800 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-extrabold text-[#0D3B66] uppercase tracking-wider border-b-2 border-[#0D3B66] pb-0.5">Work Experience</h3>
              {experiences.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-1">
                  <div className="flex justify-between items-baseline text-xs font-bold text-[#0D3B66]">
                    <span>{exp.role} <span className="text-gray-700 font-semibold">— {exp.company}</span></span>
                    <span className="text-gray-500 font-normal">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-gray-800 flex flex-col gap-1 pl-1">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-extrabold text-[#0D3B66] uppercase tracking-wider border-b-2 border-[#0D3B66] pb-0.5">Skills</h3>
              <p className="text-xs text-gray-800 font-medium">{skills.join(' • ')}</p>
            </div>
          )}
        </div>
      )}

      {/* 4. Midnight Navy Left Sidebar (Theo Ramos / Mia Bennett style) */}
      {templateId === 'navy_sidebar' && (
        <div className="grid grid-cols-12 gap-6 h-full min-h-[900px] -m-10">
          {/* Left Dark Sidebar */}
          <div className="col-span-4 bg-[#1E3A4C] text-white p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold text-white tracking-tight">{personalInfo.fullName || 'YOUR NAME'}</h1>
              <span className="text-xs text-sky-300 font-medium">{personalInfo.location}</span>
            </div>

            <div className="flex flex-col gap-2 border-t border-sky-800/80 pt-4 text-xs">
              <span className="font-extrabold uppercase text-[10px] text-sky-300">Contacts</span>
              <span className="text-gray-200 truncate">{personalInfo.email}</span>
              <span className="text-gray-200">{personalInfo.phone}</span>
              {personalInfo.linkedin && <span className="text-sky-300 truncate">{personalInfo.linkedin}</span>}
            </div>

            {skills.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-sky-800/80 pt-4 text-xs">
                <span className="font-extrabold uppercase text-[10px] text-sky-300">Skills & Tools</span>
                <div className="flex flex-col gap-1.5">
                  {skills.map((sk, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px] text-gray-200">
                      <span>{sk}</span>
                      <span className="text-[9px] text-sky-300 font-bold">Expert</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Right Column */}
          <div className="col-span-8 p-6 pl-2 flex flex-col gap-5 text-xs">
            {personalInfo.summary && (
              <div className="flex flex-col gap-1">
                <h3 className="font-extrabold text-[#1E3A4C] uppercase text-[11px] border-b border-gray-300 pb-0.5">Summary</h3>
                <p className="text-gray-800 leading-relaxed">{personalInfo.summary}</p>
              </div>
            )}

            {experiences.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="font-extrabold text-[#1E3A4C] uppercase text-[11px] border-b border-gray-300 pb-0.5">Work History</h3>
                {experiences.map((exp) => (
                  <div key={exp.id} className="flex flex-col gap-1">
                    <div className="flex justify-between font-bold text-[#1E3A4C]">
                      <span>{exp.role} — <span className="text-gray-700">{exp.company}</span></span>
                      <span className="text-gray-500 font-normal text-[11px]">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-800 flex flex-col gap-1 pl-1">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx} className="leading-relaxed">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Dark Navy Right Sidebar (Ethan Cole style) */}
      {templateId === 'right_sidebar' && (
        <div className="grid grid-cols-12 gap-6 h-full min-h-[900px] -m-10">
          {/* Main Left Column */}
          <div className="col-span-8 p-6 pr-2 flex flex-col gap-5 text-xs">
            <div className="flex flex-col gap-1 border-b border-gray-300 pb-3">
              <h1 className="text-2xl font-black uppercase text-[#0F2537]">{personalInfo.fullName || 'YOUR NAME'}</h1>
              <div className="text-gray-600 text-xs flex gap-2">
                <span>{personalInfo.email}</span>
                <span>•</span>
                <span>{personalInfo.phone}</span>
              </div>
            </div>

            {personalInfo.summary && (
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-[#0F2537] uppercase text-[11px]">Summary</h3>
                <p className="text-gray-800 leading-relaxed">{personalInfo.summary}</p>
              </div>
            )}

            {experiences.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-[#0F2537] uppercase text-[11px]">Work Experience</h3>
                {experiences.map((exp) => (
                  <div key={exp.id} className="flex flex-col gap-1">
                    <div className="flex justify-between font-bold text-[#0F2537]">
                      <span>{exp.role}</span>
                      <span className="text-gray-500 font-normal text-[11px]">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <span className="text-gray-600 font-semibold">{exp.company}</span>
                    <ul className="list-disc list-inside text-gray-800 flex flex-col gap-1 pl-1">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx} className="leading-relaxed">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Dark Navy Sidebar */}
          <div className="col-span-4 bg-[#0F2537] text-white p-6 flex flex-col gap-6">
            {skills.length > 0 && (
              <div className="flex flex-col gap-2 text-xs">
                <span className="font-extrabold uppercase text-[10px] text-sky-300 border-b border-sky-800 pb-1">Skills</span>
                <div className="flex flex-col gap-1.5">
                  {skills.map((sk, idx) => (
                    <span key={idx} className="text-gray-200 text-[11px]">• {sk}</span>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div className="flex flex-col gap-2 text-xs">
                <span className="font-extrabold uppercase text-[10px] text-sky-300 border-b border-sky-800 pb-1">Education</span>
                {education.map((edu) => (
                  <div key={edu.id} className="flex flex-col text-[11px]">
                    <span className="font-bold text-white">{edu.degree}</span>
                    <span className="text-gray-300">{edu.institution}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. Soft Green Pill Header (Alisha Hill style) */}
      {templateId === 'soft_green_pill' && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-start border-b border-emerald-200 pb-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-gray-900">{personalInfo.fullName || 'YOUR NAME'}</h1>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold w-fit">
                {personalInfo.location || 'Candidate'}
              </span>
            </div>
            <div className="text-xs text-gray-600 flex flex-col items-end gap-0.5">
              <span>{personalInfo.email}</span>
              <span>{personalInfo.phone}</span>
            </div>
          </div>

          {personalInfo.summary && (
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Summary</h3>
              <p className="text-xs text-gray-800 leading-relaxed bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">{personalInfo.summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Experience</h3>
              {experiences.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-1 text-xs">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span className="text-emerald-900">{exp.role} — {exp.company}</span>
                    <span className="text-gray-500 font-normal">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-800 flex flex-col gap-1 pl-1">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((sk, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[11px] font-semibold">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7. Minimalist Tech */}
      {templateId === 'minimalist_tech' && (
        <div className="flex flex-col gap-5 font-mono">
          <div className="border-b-2 border-black pb-4 flex flex-col gap-1">
            <h1 className="text-2xl font-black uppercase text-black tracking-tighter">{personalInfo.fullName || 'YOUR NAME'}</h1>
            <div className="text-xs text-gray-700 flex flex-wrap gap-3 font-semibold">
              <span>{personalInfo.email}</span>
              <span>•</span>
              <span>{personalInfo.github}</span>
            </div>
          </div>

          {personalInfo.summary && (
            <div className="p-3 bg-gray-100 rounded text-xs leading-relaxed text-black">
              // {personalInfo.summary}
            </div>
          )}

          {experiences.length > 0 && (
            <div className="flex flex-col gap-3 font-sans">
              <h3 className="text-xs font-black uppercase text-black tracking-widest border-b border-black pb-0.5">01 // EXPERIENCE</h3>
              {experiences.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-1 text-xs">
                  <div className="flex justify-between font-bold text-black">
                    <span>{exp.role} @ {exp.company}</span>
                    <span>{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-800 flex flex-col gap-1 pl-1">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 8. Yellow Creative Badge (Samantha Lewis style) */}
      {templateId === 'yellow_creative' && (
        <div className="grid grid-cols-12 gap-6 h-full min-h-[900px] -m-10">
          <div className="col-span-4 bg-[#FAF8ED] p-6 border-r border-[#EBE5CE] flex flex-col gap-5 text-xs">
            <div className="flex flex-col gap-2">
              <div className="w-14 h-14 rounded-full bg-amber-300 border-2 border-amber-400 flex items-center justify-center text-lg font-black text-amber-950">
                {personalInfo.fullName ? personalInfo.fullName[0] : 'Y'}
              </div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">{personalInfo.fullName || 'YOUR NAME'}</h1>
            </div>

            <div className="flex flex-col gap-1 border-t border-[#EBE5CE] pt-3 text-[11px]">
              <span className="font-bold text-amber-900 uppercase">Contact</span>
              <span className="text-gray-700 truncate">{personalInfo.email}</span>
              <span className="text-gray-700">{personalInfo.phone}</span>
            </div>

            {skills.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-[#EBE5CE] pt-3">
                <span className="font-bold text-amber-900 uppercase text-[11px]">Skills</span>
                <div className="flex flex-wrap gap-1">
                  {skills.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded-full border border-amber-300">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-8 p-6 pl-2 flex flex-col gap-5 text-xs">
            {personalInfo.summary && (
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-amber-900 uppercase text-[11px] border-b border-amber-200 pb-0.5">Summary</h3>
                <p className="text-gray-800 leading-relaxed">{personalInfo.summary}</p>
              </div>
            )}

            {experiences.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-amber-900 uppercase text-[11px] border-b border-amber-200 pb-0.5">Experience</h3>
                {experiences.map((exp) => (
                  <div key={exp.id} className="flex flex-col gap-1">
                    <div className="flex justify-between font-bold text-gray-900">
                      <span>{exp.role} — <span className="text-amber-900">{exp.company}</span></span>
                      <span className="text-gray-500 font-normal text-[11px]">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-800 flex flex-col gap-1 pl-1">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx} className="leading-relaxed">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
