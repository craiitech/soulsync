import Link from 'next/link';
import { GoogleAuth } from '@/components/auth-forms';
import { Logo } from '@/components/logo';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SignupPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-100/50 dark:bg-gray-900/50">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo className="w-16 h-16" />
          </div>
          <CardTitle className="text-3xl font-bold">Create your Account</CardTitle>
          <CardDescription>
            Use Google to start your journey to deeper connection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleAuth />
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline font-medium text-primary">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
