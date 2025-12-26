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

// This function simulates fetching data from Firestore and determining the state.
const getDashboardState = async (userId: string): Promise<PairStatus> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Possible states to cycle through for demonstration
  const states: PairStatus[] = ['unpaired', 'paired_user_pending', 'paired_partner_pending', 'results_ready'];
  
  // For demonstration, we'll cycle through states. A real app would have persistent state.
  // This is a simplification to avoid needing a real database for the scaffold.
  const currentState: PairStatus = 'paired_user_pending'; // Change this to 'unpaired', 'paired_partner_pending', or 'results_ready' to see other states.

  return currentState;
};

const MOCK_PAIR_CODE = '123456';

const MOCK_RESULTS = {
    summary: "You and your partner have a strong foundation built on shared core values, particularly in your appreciation for authenticity and growth. You both approach relationships with a secure attachment style, which fosters trust and open communication. Your personality traits are complementary; one's extroversion balances the other's introspection, creating a dynamic and supportive partnership.",
    strengths: "Shared values in honesty and personal growth. Secure attachment styles leading to high trust. Complementary personality traits.",
    growthAreas: "Differing communication styles under stress. Occasional misalignment on long-term financial goals. Navigating social energy levels can be a point of discussion.",
    overallCompatibility: 88,
    affirmation: "Like two trees planted side by side, your roots intertwine, strengthening each other as you reach for the sun."
};
// END MOCK DATA

export default async function DashboardPage() {
  // In a real app, you would get the user from the session
  const user = MOCK_USER; 
  const dashboardState = await getDashboardState(user.uid);

  const renderContent = () => {
    switch (dashboardState) {
      case 'unpaired':
        return <Pairing user={user} pairCode={MOCK_PAIR_CODE} />;
      case 'paired_user_pending':
        return <StartQuiz />;
      case 'paired_partner_pending':
        return <Waiting />;
      case 'results_ready':
        return <Results results={MOCK_RESULTS} />;
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
