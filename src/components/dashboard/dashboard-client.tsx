'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { Header } from '@/components/header';
import { Pairing } from '@/components/dashboard/pairing';
import { StartQuiz } from '@/components/dashboard/start-quiz';
import { Waiting } from '@/components/dashboard/waiting';
import { Results, type ResultsData } from '@/components/dashboard/results';
import { Card, CardContent } from '@/components/ui/card';

// MOCK DATA and FUNCTIONS - In a real app, this would come from Firebase
// after authenticating the user on the server.
const MOCK_USER = { uid: 'user123', email: 'user@example.com', name: 'Alex' };

type PairStatus = 'unpaired' | 'paired_user_pending' | 'paired_partner_pending' | 'results_ready' | 'loading';
type FlowType = 'solo' | 'couple';

// This function simulates fetching data from Firestore and determining the state.
const getDashboardState = (userId: string | null, searchParams: URLSearchParams): { status: PairStatus, flow: FlowType } => {
  const requestedFlow = searchParams.get('flow') === 'solo' ? 'solo' : 'couple';
  const showResults = searchParams.get('results') === 'true';

  if (showResults) {
    return { status: 'results_ready', flow: requestedFlow };
  }
  
  if (requestedFlow === 'solo') {
    // This state is now handled by the /solo-intro page. 
    // If a user lands here directly, we can guide them.
    return { status: 'unpaired', flow: 'solo' };
  } else {
    // This is for the couple flow
    return { status: 'unpaired', flow: 'couple' };
  }
};


function DashboardContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<PairStatus>('loading');
  const [flow, setFlow] = useState<FlowType>('couple');
  const [results, setResults] = useState<ResultsData | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  // In a real app, you would get the user from the session
  // For the solo flow, user is null. For couple flow, they would be logged in.
  const user = flow === 'couple' ? MOCK_USER : null;
  
  // This is only used for the couple flow for now.
  const pairCode = Math.floor(100000 + Math.random() * 900000).toString();

  useEffect(() => {
    // Use a placeholder UID for solo flow since there's no logged-in user
    const uid = user ? user.uid : 'solo-user';
    const { status: newStatus, flow: newFlow } = getDashboardState(uid, searchParams);
    setStatus(newStatus);
    setFlow(newFlow);

    if (newStatus === 'results_ready') {
      const storedData = localStorage.getItem('soulSyncData');
      if (storedData) {
        const { results, name } = JSON.parse(storedData);
        setResults(results);
        setUserName(name);
      } else {
        console.error("Results expected but not found in local storage.");
      }
    }
  }, [searchParams, user]);
  
  const renderContent = () => {
    switch (status) {
      case 'loading':
         return <p>Loading...</p>;
      case 'unpaired':
         // For solo flow, we can prompt them to start from the homepage
         if (flow === 'solo') {
             return <StartQuiz isSolo={true} />;
         }
        return <Pairing user={user!} pairCode={pairCode} />;
      case 'paired_user_pending':
        return <StartQuiz isSolo={flow === 'solo'} />;
      case 'paired_partner_pending':
        return <Waiting />;
      case 'results_ready':
        return results ? <Results results={results} flow={flow} name={userName} /> : <p>Loading results...</p>;
      default:
        return <p>Loading...</p>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-4xl shadow-lg">
          <CardContent className="p-6 md:p-10">
            {renderContent()}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


export function DashboardClient() {
    return (
        <Suspense fallback={<p>Loading dashboard...</p>}>
            <DashboardContent />
        </Suspense>
    )
}

