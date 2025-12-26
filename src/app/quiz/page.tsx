import { Header } from '@/components/header';
import { QuizClient } from '@/components/quiz/quiz-client';
import { quizQuestions } from '@/lib/quiz-data';

// MOCK USER - In a real app, this would be from a server session
const MOCK_USER = { uid: 'user123', email: 'user@example.com', name: 'Alex' };

export default function QuizPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header user={MOCK_USER} />
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-4">
        <QuizClient questions={quizQuestions} />
      </main>
    </div>
  );
}
