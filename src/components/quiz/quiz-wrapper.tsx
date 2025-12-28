'use client';

import dynamic from 'next/dynamic';
import type { QuizQuestion } from '@/lib/types';

function QuizLoading() {
  return (
    <div className="flex flex-col items-center justify-start py-8 px-4">
      <p>Loading Quiz...</p>
    </div>
  );
}

const DynamicQuizClient = dynamic(
  () => import('@/components/quiz/quiz-client').then((mod) => mod.QuizClient),
  {
    ssr: false,
    loading: () => <QuizLoading />,
  }
);

export function QuizWrapper({ questions }: { questions: QuizQuestion[] }) {
  return <DynamicQuizClient questions={questions} />;
}
