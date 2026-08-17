import type { Metadata } from 'next';
import { AuthProvider } from '@/components/auth/AuthProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Callback AI — Next-Gen AI Resume Builder, Analyzer & Living Agent',
  description: 'Build ATS-optimized resumes, analyze formatting and keywords, engage with Living Resume Agents, verify claims with Trust Score, and auto-tailor applications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-[#111827]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

