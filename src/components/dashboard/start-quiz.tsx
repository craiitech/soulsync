import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowRight, FileQuestion, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StartQuiz({ isSolo }: { isSolo?: boolean }) {
  const title = isSolo ? "Discover Your Style" : "You're All Set!";
  const description = isSolo 
    ? "You are ready to begin your self-discovery quiz."
    : "You and your partner are connected. It's time to start the quiz!";
  const icon = isSolo ? <User className="h-10 w-10 text-primary" /> : <FileQuestion className="h-10 w-10 text-primary" />;

  return (
    <div className="flex flex-col items-center text-center gap-6 p-8">
      <div className="p-4 rounded-full bg-accent">
        {icon}
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline">{title}</h1>
        <p className="text-muted-foreground max-w-md">
          {description}
        </p>
      </div>
      <Link
        href="/quiz"
        className={cn(buttonVariants({ size: 'lg' }))}
      >
        Start Quiz
        <ArrowRight className="ml-2 h-5 w-5 inline" />
      </Link>
    </div>
  );
}
