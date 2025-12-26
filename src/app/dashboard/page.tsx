import { Header } from '@/components/header';
import { Pairing } from '@/components/dashboard/pairing';
import { StartQuiz } from '@/components/dashboard/start-quiz';
import { Waiting } from '@/components/dashboard/waiting';
import { Results } from '@/components/dashboard/results';
import { Card, CardContent } from '@/components/ui/card';

// MOCK DATA and FUNCTIONS - In a real app, this would come from Firebase
// after authenticating the user on the server.
const MOCK_USER = { uid: 'user123', email: 'user@example.com', name: 'Alex' };

type PairStatus = 'unpaired' | 'paired_user_pending' | 'paired_partner_pending' | 'results_ready';
type FlowType = 'solo' | 'couple';

// This function simulates fetching data from Firestore and determining the state.
const getDashboardState = async (userId: string): Promise<{ status: PairStatus, flow: FlowType }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // To simulate the single user results flow, we'll default to the 'results_ready' state.
  // In a real app, you'd check if the user has completed their quiz.
  const currentState: PairStatus = 'results_ready';
  const currentFlow: FlowType = 'solo';


  return { status: currentState, flow: currentFlow };
};

const MOCK_PAIR_CODE = '123456';

const MOCK_RESULTS = {
    summary: "You have a strong foundation built on core values of authenticity and growth. You approach relationships with a secure attachment style, which fosters trust and open communication. Your personality is balanced, with a healthy mix of extroversion and introspection, creating a dynamic and supportive nature.",
    strengths: "Core values in honesty and personal growth. Secure attachment style leading to high trust. Well-balanced personality traits.",
    growthAreas: "Tendency to be self-critical under stress. Occasional difficulty setting firm boundaries. Navigating high-energy social situations can be draining.",
    overallCompatibility: 88, // This will be interpreted as a self-score for solo
    affirmation: "Like a tree with deep roots, you are grounded and resilient, capable of weathering any storm while continuing to reach for the sun."
};
// END MOCK DATA

export default async function DashboardPage() {
  // In a real app, you would get the user from the session
  const user = MOCK_USER; 
  const { status, flow } = await getDashboardState(user.uid);

  const renderContent = () => {
    switch (status) {
      case 'unpaired':
        return <Pairing user={user} pairCode={MOCK_PAIR_CODE} />;
      case 'paired_user_pending':
        return <StartQuiz />;
      case 'paired_partner_pending':
        return <Waiting />;
      case 'results_ready':
        return <Results results={MOCK_RESULTS} flow={flow} />;
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
