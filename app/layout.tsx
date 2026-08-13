import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-[#111827]">
        {children}
      </body>
    </html>
  );
}
