'use client';

import React from 'react';
import { useAuth, useUser } from '@clerk/nextjs';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useAppAuth() {
  return useAuth();
}

export function useAppUser() {
  return useUser();
}
