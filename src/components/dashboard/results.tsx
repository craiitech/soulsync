import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, HeartHandshake, Quote, BarChart, ShieldCheck, Gem, Star, Users } from 'lucide-react';

export interface IndividualScore {
  category: string;
  description: string;
  scores: {
    name: string;
    value: number;
    insight: string;
  }[];
}

export interface ResultsData {
  summary: string;
  strengths: string;
  growthAreas: string;
  overallScore: number;
  affirmation: string;
  individualScores: IndividualScore[];
  compatibilityProfile?: string; // Optional: For solo results
}

type FlowType = 'solo' | 'couple';

const categoryIcons: Record<string, React.ReactNode> = {
  'Personality Traits': <BarChart className="w-6 h-6 text-blue-500" />,
  'Attachment Style': <ShieldCheck className="w-6 h-6 text-green-500" />,
  'Core Values': <Gem className="w-6 h-6 text-purple-500" />,
  'Love Style': <Star className="w-6 h-6 text-yellow-500" />,
}

export function Results({ results, flow }: { results: ResultsData, flow: FlowType }) {
  const getBadgeVariant = (score: number) => {
    if (score > 80) return 'default';
    if (score > 60) return 'secondary';
    return 'destructive';
  }
  
  const title = flow === 'solo' ? 'Your Personal Style Analysis' : 'Your SoulSync Results';
  const description = flow === 'solo' 
    ? "Here is a snapshot of your personal style based on your quiz responses. This is a tool for self-discovery and growth."
    : "Here is a snapshot of your compatibility based on your quiz responses. Remember, this is a tool for insight, not a final judgment.";
  const scoreTitle = flow === 'solo' ? 'Self-Awareness Score' : 'Overall Score';


  return (
    <div className="flex flex-col items-center text-center gap-8 w-full">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">{title}</h1>
        <p className="text-muted-foreground max-w-2xl">
          {description}
        </p>
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-secondary"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className="text-primary"
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={2 * Math.PI * 45 * (1 - results.overallScore / 100)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-5xl font-bold text-primary">{results.overallScore}</span>
          <span className="text-sm text-muted-foreground">{scoreTitle}</span>
        </div>
      </div>
      
      <p className="max-w-prose text-lg text-foreground italic p-4 border-l-4 border-primary bg-secondary rounded-r-lg">
        {results.summary}
      </p>

      {/* Individual Score Breakdown */}
      <div className="w-full space-y-6 text-left mt-4">
        <h2 className="text-2xl font-bold font-headline text-center">Score Breakdown</h2>
        {results.individualScores.map((area) => (
          <Card key={area.category}>
            <CardHeader>
              <div className="flex items-center gap-3">
                {categoryIcons[area.category] || <BarChart className="w-6 h-6" />}
                <CardTitle>{area.category}</CardTitle>
              </div>
              <CardDescription>{area.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {area.scores.map((score) => (
                <div key={score.name}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold">{score.name}</p>
                    <p className="text-sm font-bold text-primary">{score.value}%</p>
                  </div>
                  <Progress value={score.value} />
                  <p className="text-xs text-muted-foreground mt-1">{score.insight}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0">
            <HeartHandshake className="w-6 h-6 text-green-500" />
            <CardTitle>Your Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-left">{results.strengths}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            <CardTitle>Growth Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-left">{results.growthAreas}</p>
          </CardContent>
        </Card>
      </div>

       {flow === 'solo' && results.compatibilityProfile && (
        <div className="w-full mt-4">
            <Card>
                <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <Users className="w-6 h-6 text-primary" />
                    <CardTitle>Who You Vibe With</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-left">{results.compatibilityProfile}</p>
                </CardContent>
            </Card>
        </div>
      )}

       <div className="w-full mt-4">
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Quote className="w-6 h-6 text-primary" />
            <CardTitle>A Thought for Your Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg italic text-muted-foreground text-left">
              &ldquo;{results.affirmation}&rdquo;
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
