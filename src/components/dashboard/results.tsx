import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, HeartHandshake, Quote } from 'lucide-react';

interface ResultsData {
  summary: string;
  strengths: string;
  growthAreas: string;
  overallCompatibility: number;
  affirmation: string;
}

export function Results({ results }: { results: ResultsData }) {
  const getBadgeVariant = (score: number) => {
    if (score > 80) return 'default';
    if (score > 60) return 'secondary';
    return 'destructive';
  }

  return (
    <div className="flex flex-col items-center text-center gap-8 w-full">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Your SoulSync Results</h1>
        <p className="text-muted-foreground max-w-2xl">
          Here is a snapshot of your compatibility based on your quiz responses. Remember, this is a tool for insight, not a final judgment.
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
            strokeDashoffset={2 * Math.PI * 45 * (1 - results.overallCompatibility / 100)}
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
          <span className="text-5xl font-bold text-primary">{results.overallCompatibility}</span>
          <span className="text-sm text-muted-foreground">Overall Score</span>
        </div>
      </div>
      
      <p className="max-w-prose text-lg text-foreground italic p-4 border-l-4 border-primary bg-secondary rounded-r-lg">
        {results.summary}
      </p>

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
