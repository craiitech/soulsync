"use client"

import { quizQuestions } from '@/lib/quiz-data';
import type { QuizQuestion } from '@/lib/types';
import dynamic from "next/dynamic"

const QuizClient = dynamic(() => import("@/components/quiz/quiz-client").then(mod => mod.QuizClient), {
  ssr: false,
  loading: () => <p>Loading Quiz...</p>
})

export default function QuizPage() {
  return <QuizClient questions={quizQuestions} />
}
