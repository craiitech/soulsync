'use client';

import { Header } from '@/components/header';

export default function SoloIntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header user={null} />
      <main className="flex-1 flex items-center justify-center p-4 bg-background">
        {children}
      </main>
    </div>
  );
}
