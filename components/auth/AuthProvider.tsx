'use client';

import React, { createContext, useContext } from 'react';
import { ClerkProvider, useAuth as useClerkAuth, useUser as useClerkUser } from '@clerk/nextjs';

const pubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
const isClerkConfigured =
  Boolean(pubKey) &&
  !pubKey.includes('your_clerk') &&
  !pubKey.includes('example');

const MockAuthContext = createContext({
  isLoaded: true,
  isSignedIn: true,
  user: {
    fullName: 'Alex Rivera',
    firstName: 'Alex',
    primaryEmailAddress: { emailAddress: 'alex.rivera@neuralflow.ai' },
    emailAddresses: [{ emailAddress: 'alex.rivera@neuralflow.ai' }],
  },
  signOut: async (options?: any) => {
    if (typeof window !== 'undefined' && options?.redirectUrl) {
      window.location.href = options.redirectUrl;
    }
  },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (isClerkConfigured) {
    return <ClerkProvider>{children}</ClerkProvider>;
  }

  return (
    <MockAuthContext.Provider
      value={{
        isLoaded: true,
        isSignedIn: true,
        user: {
          fullName: 'Alex Rivera',
          firstName: 'Alex',
          primaryEmailAddress: { emailAddress: 'alex.rivera@neuralflow.ai' },
          emailAddresses: [{ emailAddress: 'alex.rivera@neuralflow.ai' }],
        },
        signOut: async (options?: any) => {
          if (typeof window !== 'undefined' && options?.redirectUrl) {
            window.location.href = options.redirectUrl;
          }
        },
      }}
    >
      {children}
    </MockAuthContext.Provider>
  );
}

export function useAppAuth() {
  if (isClerkConfigured) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useClerkAuth();
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ctx = useContext(MockAuthContext);
  return {
    isLoaded: ctx.isLoaded,
    isSignedIn: ctx.isSignedIn,
    userId: 'demo-user-alex',
    signOut: ctx.signOut,
  };
}

export function useAppUser() {
  if (isClerkConfigured) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useClerkUser();
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ctx = useContext(MockAuthContext);
  return {
    isLoaded: ctx.isLoaded,
    isSignedIn: ctx.isSignedIn,
    user: ctx.user as any,
  };
}
