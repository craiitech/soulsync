"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from 'lucide-react';

// NOTE: In a real app, this action would be implemented in `src/app/actions/auth.ts`
// and interact with Firebase Authentication's Google provider. For now, it's a placeholder.
async function signInWithGoogle() {
  console.log("Signing in with Google...");
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In a real app, you would use Firebase Auth's Google Popup/Redirect method here.
  // const { user, error } = await firebaseSignInWithGoogle();
  // if (error) return { error: error.message };
  return { error: null };
}
// End of placeholder action

export function GoogleAuth() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = () => {
    setError(null);
    startTransition(async () => {
      const result = await signInWithGoogle();
      if (result?.error) {
        setError(result.error);
      } else {
        toast({
          title: "Authentication Successful",
          description: "Welcome! Redirecting to your dashboard...",
        });
        router.push('/dashboard');
      }
    });
  };

  const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.58 2.05-4.82 2.05-3.83 0-6.95-3.12-6.95-6.95s3.12-6.95 6.95-6.95c1.82 0 3.18.7 4.1 1.65l2.5-2.5C18.16 3.03 15.66 2 12.48 2 7.1 2 2.94 6.03 2.94 11.4s4.16 9.4 9.54 9.4c2.84 0 5.1-1 6.8-2.73 1.72-1.72 2.5-4.25 2.5-6.88 0-.6-.05-1.18-.15-1.73z"
      ></path>
    </svg>
  );

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="mr-2 h-5 w-5" />
        )}
        Continue with Google
      </Button>
    </div>
  );
}
