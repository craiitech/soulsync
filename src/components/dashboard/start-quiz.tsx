import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileQuestion } from 'lucide-react';

export function StartQuiz() {
  return (
    <div className="flex flex-col items-center text-center gap-6 p-8">
      <div className="p-4 rounded-full bg-accent">
        <FileQuestion className="h-10 w-10 text-primary" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline">You're All Set!</h1>
        <p className="text-muted-foreground max-w-md">
          You and your partner are now connected. It's time to take the compatibility quiz to discover your SoulSync score.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/quiz">
          Start Quiz
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
}
