'use client';
import { useEffect, useState } from 'react';
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
const getDashboardState = (userId: string, searchParams: URLSearchParams): { status: PairStatus, flow: FlowType } => {
  const requestedFlow = searchParams.get('flow') === 'solo' ? 'solo' : 'couple';
  const showResults = searchParams.get('results') === 'true';

  if (showResults) {
    return { status: 'results_ready', flow: requestedFlow };
  }
  
  if (requestedFlow === 'solo') {
    return { status: 'paired_user_pending', flow: 'solo' };
  } else {
    return { status: 'unpaired', flow: 'couple' };
  }
};


export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<PairStatus>('loading');
  const [flow, setFlow] = useState<FlowType>('couple');
  const [results, setResults] = useState<ResultsData | null>(null);

  // In a real app, you would get the user from the session
  const user = MOCK_USER; 
  
  // Generate a random 6-digit code. This is fine on the client for this mock.
  const pairCode = Math.floor(100000 + Math.random() * 900000).toString();

  useEffect(() => {
    const { status: newStatus, flow: newFlow } = getDashboardState(user.uid, searchParams);
    setStatus(newStatus);
    setFlow(newFlow);

    if (newStatus === 'results_ready') {
      const storedResults = localStorage.getItem('soulSyncResults');
      if (storedResults) {
        setResults(JSON.parse(storedResults));
        // Optional: clear the results from storage after displaying them
        // localStorage.removeItem('soulSyncResults');
      } else {
        // Handle case where results are expected but not found
        console.error("Results expected but not found in local storage.");
        // Potentially redirect or show an error message
      }
    }
  }, [searchParams, user.uid]);
  
  const renderContent = () => {
    switch (status) {
      case 'loading':
         return <p>Loading...</p>;
      case 'unpaired':
        return <Pairing user={user} pairCode={pairCode} />;
      case 'paired_user_pending':
        return <StartQuiz isSolo={flow === 'solo'} />;
      case 'paired_partner_pending':
        return <Waiting />;
      case 'results_ready':
        return results ? <Results results={results} flow={flow} /> : <p>Loading results...</p>;
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

