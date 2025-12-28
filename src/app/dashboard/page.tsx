import { Suspense } from 'react';
import { DashboardClient } from '@/components/dashboard/dashboard-client';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/header';

// MOCK USER - In a real app, this would be from a server session
const MOCK_USER = { uid: 'user123', email: 'user@example.com', name: 'Alex' };

function DashboardLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header user={MOCK_USER} />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-4xl shadow-lg">
          <CardContent className="p-6 md:p-10">
            <p>Loading...</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardClient />
    </Suspense>
  );
}
