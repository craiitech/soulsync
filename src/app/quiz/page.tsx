"use client";

export const dynamic = "force-dynamic";

import { QuizWrapper } from "@/components/quiz/quiz-wrapper";
import { Header } from "@/components/header";
import { quizQuestions } from '@/lib/quiz-data';

export default function QuizPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header user={null} />
            <main className="flex-1 flex flex-col items-center justify-start py-8 px-4">
                <QuizWrapper questions={quizQuestions} />
            </main>
        </div>
    );
}
