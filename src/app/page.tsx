import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';
import { ArrowRight, BarChart, Heart, Puzzle, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  const features = [
    {
      icon: <Puzzle className="w-8 h-8" />,
      title: "Big Five Personality",
      description: "Understand how your core personality traits (Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism) complement or differ from your partner's."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Attachment Styles",
      description: "Discover your attachment style (Secure, Anxious, Avoidant) and how it impacts your relationship dynamics and emotional needs."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Core Values & Love",
      description: "Explore what you both prioritize in life and how you express and prefer to receive love, ensuring you're speaking the same emotional language."
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Detailed Results",
      description: "Receive a comprehensive compatibility report, including an overall score, a summary of your synergy, and personalized insights into your strengths and growth areas."
    }
  ]

  return (
    <main className="flex-1 flex flex-col">
      <div className="relative flex-1 flex flex-col items-center justify-center text-center p-4 py-20">
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
      
      <section id="features" className="w-full py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">The Science of Your Connection</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
              Our compatibility test synthesizes key psychological concepts to give you a holistic view of your relationship.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="w-full p-4 text-center text-xs text-muted-foreground bg-background z-10">
        <p>Disclaimer: This tool offers insights based on psychological research—not a clinical assessment. For relationship concerns, consult a licensed professional.</p>
      </footer>
    </main>
  );
}
