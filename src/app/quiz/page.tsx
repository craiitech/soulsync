import { Suspense } from 'react';
import { Header } from '@/components/header';
import { quizQuestions } from '@/lib/quiz-data';
import dynamic from 'next/dynamic';

const QuizClient = dynamic(() => import('@/components/quiz/quiz-client').then(mod => mod.QuizClient), {
  ssr: false,
  loading: () => <QuizLoading />,
});


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
    <div className="flex flex-col min-h-screen">
      <Header user={null} />
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-4">
        <QuizClient questions={quizQuestions} />
      </main>
    </div>
  );
}
