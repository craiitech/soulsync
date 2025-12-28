import { Suspense } from 'react';
import { Header } from '@/components/header';
import { QuizClient } from '@/components/quiz/quiz-client';
import { quizQuestions } from '@/lib/quiz-data';

function QuizLoading() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header user={null} />
            <main className="flex-1 flex flex-col items-center justify-start py-8 px-4">
                <p>Loading Quiz...</p>
            </main>
        </div>
    )
}

export default function QuizPage() {
  return (
    <Suspense fallback={<QuizLoading />}>
      <QuizPageContent />
    </Suspense>
  );
}

function QuizPageContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header user={null} />
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-4">
        <QuizClient questions={quizQuestions} />
      </main>
    </div>
  );
}
