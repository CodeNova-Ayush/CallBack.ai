import { SignUp } from '@clerk/nextjs';
import { Logo } from '@/components/ui/Logo';

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#FAF6F0] flex flex-col items-center justify-center px-4 py-12">
      <Logo size="lg" showTagline className="mb-8" />
      <SignUp
        signInUrl="/sign-in"
        fallbackRedirectUrl="/dashboard"
        appearance={{
          elements: {
            cardBox: 'shadow-xl',
            footerActionLink: 'text-[#C85A32]',
            formButtonPrimary: 'bg-[#C85A32] hover:bg-[#B24D28]',
          },
        }}
      />
    </main>
  );
}
