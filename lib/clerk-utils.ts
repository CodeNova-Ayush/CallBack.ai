export function isClerkEnabled(): boolean {
  const pubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
  const secretKey = process.env.CLERK_SECRET_KEY || '';
  if (!pubKey || !secretKey) return false;
  if (pubKey.includes('your_clerk') || pubKey.includes('example')) return false;
  if (secretKey.includes('your_clerk') || secretKey.includes('example')) return false;
  return true;
}
