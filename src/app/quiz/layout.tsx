'use client';

import { Header } from '@/components/header';

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header user={null} />
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-4">
        {children}
      </main>
    </div>
  );
}
