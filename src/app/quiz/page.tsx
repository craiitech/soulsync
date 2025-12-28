"use client";

export const dynamic = "force-dynamic";

import { QuizWrapper } from "@/components/quiz/quiz-wrapper";
import { quizQuestions } from '@/lib/quiz-data';

export default function QuizPage() {
    return (
        <QuizWrapper questions={quizQuestions} />
    );
}
