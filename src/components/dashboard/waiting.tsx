import { Hourglass, MailCheck } from 'lucide-react';

export function Waiting() {
  return (
    <div className="flex flex-col items-center text-center gap-6 p-8">
      <div className="relative">
        <div className="p-4 rounded-full bg-accent animate-pulse">
            <Hourglass className="h-10 w-10 text-primary" />
        </div>
        <div className="absolute -bottom-2 -right-2 p-2 rounded-full bg-primary text-primary-foreground border-4 border-background">
            <MailCheck className="h-5 w-5" />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline">Quiz Submitted!</h1>
        <p className="text-muted-foreground max-w-md">
          Your responses have been recorded. We are now waiting for your partner to complete their quiz. Your results will appear here automatically once they are finished.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">Feel free to close this page and come back later.</p>
    </div>
  );
}
