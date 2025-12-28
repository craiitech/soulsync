'use client';

import dynamic from 'next/dynamic';
import type { QuizQuestion } from '@/lib/types';

// Define a loading component to be used as a fallback
function QuizLoading() {
  return (
    <div className="flex flex-col items-center justify-start py-8 px-4">
      <p>Loading Quiz...</p>
    </div>
  );
}

// Dynamically import the QuizClient component with SSR disabled
const DynamicQuizClient = dynamic(
  () => import('@/components/quiz/quiz-client').then((mod) => mod.QuizClient),
  {
    ssr: false,
    loading: () => <QuizLoading />,
  }
);

// This wrapper component is a Client Component and can safely handle the dynamic import
export function QuizWrapper({ questions }: { questions: QuizQuestion[] }) {
  return <DynamicQuizClient questions={questions} />;
}
