import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';
import { ArrowRight, BarChart, Heart, Puzzle, Users, BookOpen, BrainCircuit, HeartHandshake, CheckCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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

        <div className="z-10 flex flex-col items-center gap-6 max-w-3xl">
          <Logo className="w-24 h-24" />
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-foreground">
            Understand Your Connections
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Discover the harmony in your connections. Explore your own relationship style or test your compatibility with a partner through insightful, psychology-backed quizzes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'font-bold text-lg bg-background/80'
              )}
            >
              <User className="mr-2 h-5 w-5" />
              Analyze Your Style
            </Link>
             <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'font-bold text-lg'
              )}
            >
              <Users className="mr-2 h-5 w-5" />
              Test Your Compatibility
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
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
      
      <section id="about" className="w-full py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">What is SoulSync?</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
              SoulSync is a comprehensive relationship compatibility tool designed to help you and your partner gain a deeper understanding of each other. By taking our insightful quiz, you'll uncover key aspects of your personalities, values, and attachment styles.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Take the Test</h3>
              <p className="text-muted-foreground">Both you and your partner complete a 30-question quiz covering personality, values, and relationship styles. It's quick, easy, and revealing.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Analysis</h3>
              <p className="text-muted-foreground">Our advanced AI analyzes your combined results, identifying areas of natural synergy and potential for growth based on established psychological principles.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Gain Deeper Insight</h3>
              <p className="text-muted-foreground">Receive a personalized report with an overall compatibility score, a summary of your strengths, and actionable advice to enhance your connection.</p>
            </div>
          </div>
        </div>
      </section>

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
      
      <section id="research" className="w-full py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Rooted in Proven Psychology</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
              Our compatibility analysis is built on well-established psychological frameworks to provide you with meaningful and actionable insights.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>The "Big Five" Personality Traits</CardTitle>
                <CardDescription>Also known as the OCEAN model, this is a cornerstone of modern personality psychology. It assesses five key dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-1 shrink-0 text-primary" /><span>Understanding these traits helps reveal your natural tendencies and how they interact with your partner's.</span></li>
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Attachment Theory</CardTitle>
                <CardDescription>Developed by John Bowlby, this theory explains how our early bonds with caregivers shape our approach to adult relationships, categorizing styles into Secure, Anxious, and Avoidant.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-1 shrink-0 text-primary" /><span>Knowing your attachment styles helps clarify your emotional needs and reactions within the relationship.</span></li>
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Core Values & Love Styles</CardTitle>
                <CardDescription>Drawing from research on what individuals prioritize (like security, achievement, or benevolence) and the ways they express and receive love (like through words, actions, or quality time).</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-1 shrink-0 text-primary" /><span>Aligning on core values and understanding each other's love languages are critical predictors of long-term satisfaction.</span></li>
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>AI-Driven Synthesis</CardTitle>
                <CardDescription>Our AI doesn't just score each section; it synthesizes the interactions between them. For example, it analyzes how your personality traits might influence your attachment style under stress.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-1 shrink-0 text-primary" /><span>This holistic analysis provides a nuanced and personalized summary of your unique relationship dynamic.</span></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="w-full p-4 text-center text-xs text-muted-foreground bg-secondary z-10">
        <p>Disclaimer: This tool offers insights based on psychological research—not a clinical assessment. For relationship concerns, consult a licensed professional.</p>
      </footer>
    </main>
  );
}
