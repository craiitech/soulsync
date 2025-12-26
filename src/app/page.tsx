import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <main className="flex-1 flex flex-col">
      <div className="relative flex-1 flex flex-col items-center justify-center text-center p-4">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover z-0"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>

        <div className="z-10 flex flex-col items-center gap-6 max-w-2xl">
          <Logo className="w-24 h-24" />
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-foreground">
            Welcome to SoulSync
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Discover the harmony in your connection. Explore your compatibility with your partner through insightful quizzes based on psychological frameworks.
          </p>
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'font-bold text-lg'
            )}
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: 'link' }),
                'p-0 text-sm'
              )}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
      <footer className="w-full p-4 text-center text-xs text-muted-foreground bg-background/50 z-10">
        <p>Disclaimer: This tool offers insights based on psychological research—not a clinical assessment. For relationship concerns, consult a licensed professional.</p>
      </footer>
    </main>
  );
}
