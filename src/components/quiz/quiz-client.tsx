"use client";

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Check, Loader2, Sparkles } from 'lucide-react';
import type { QuizQuestion, QuizAnswers } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Placeholder server action
async function submitQuiz(answers: QuizAnswers) {
  console.log('Submitting quiz with answers:', answers);
  await new Promise(resolve => setTimeout(resolve, 2000));
  // In a real app, this would save to Firestore and trigger the AI flow
  return { success: true };
}

export function QuizClient({ questions }: { questions: QuizQuestion[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [direction, setDirection] = useState(1);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (!isLastQuestion) {
      setTimeout(() => {
        setDirection(1);
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await submitQuiz(answers);
      if (result.success) {
        toast({
          title: "Quiz Complete!",
          description: "Your responses have been submitted. Redirecting to your results...",
        });
        const flow = searchParams.get('flow');
        // Redirect to dashboard with params to show results
        router.push(`/dashboard?flow=solo&results=true`);
      } else {
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your answers. Please try again.",
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {currentQuestionIndex > 0 && (
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="flex-1 space-y-2">
            <p className="text-sm font-medium text-primary uppercase tracking-wider">{currentQuestion.category}</p>
            <Progress value={progress} />
          </div>
        </div>
        <p className="text-sm text-right text-muted-foreground">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>
      
      <div className="relative h-[380px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentQuestionIndex}
            custom={direction}
            variants={{
              enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
              center: { x: '0%', opacity: 1 },
              exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.2 }}
            className="absolute w-full"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl leading-relaxed">
                  {currentQuestion.text}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={answers[currentQuestion.id] === option.value ? 'default' : 'secondary'}
                    className="w-full h-auto justify-start p-4 text-wrap text-left"
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  >
                    <div className="flex items-center w-full">
                      <span className="flex-1">{option.text}</span>
                      {answers[currentQuestion.id] === option.value && <Check className="ml-4 h-5 w-5" />}
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {isLastQuestion && Object.keys(answers).length === questions.length && (
         <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="lg" className="w-full font-bold animate-pulse">
                <Sparkles className="mr-2 h-5 w-5" />
                Finish & See Results
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Ready to submit your answers?</AlertDialogTitle>
              <AlertDialogDescription>
                Once you submit, your answers will be final. Your results will be calculated and shown on your dashboard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit} disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Answers
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
