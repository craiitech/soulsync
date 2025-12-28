import type { QuizAnswers } from './types';
import type { ResultsData, IndividualScore } from '@/components/dashboard/results';

// --- Scoring Logic ---

// Helper to get an answer value, defaulting to a neutral 3
const getAnswer = (answers: QuizAnswers, id: string) => answers[id] || 3;

// BIG FIVE PERSONALITY
// Note: Some questions are reverse-scored.
const calculatePersonalityScores = (answers: QuizAnswers) => {
  // O-C-E-A-N
  const openness = (getAnswer(answers, 'p5') + getAnswer(answers, 'p10')) / 2;
  const conscientiousness = (getAnswer(answers, 'p3') + getAnswer(answers, 'p8')) / 2;
  const extraversion = (getAnswer(answers, 'p1') + getAnswer(answers, 'p6')) / 2;
  const agreeableness = (getAnswer(answers, 'p2') + getAnswer(answers, 'p7')) / 2;
  // p9 is direct for emotional stability, p4 is reversed for neuroticism
  const emotionalStability = (getAnswer(answers, 'p9') + getAnswer(answers, 'p4')) / 2;

  return {
    openness: { score: Math.round(openness * 20) },
    conscientiousness: { score: Math.round(conscientiousness * 20) },
    extraversion: { score: Math.round(extraversion * 20) },
    agreeableness: { score: Math.round(agreeableness * 20) },
    emotionalStability: { score: Math.round(emotionalStability * 20) },
  };
};

// ATTACHMENT STYLE
const calculateAttachmentScores = (answers: QuizAnswers) => {
  const avoidanceRaw = (getAnswer(answers, 'a1') + getAnswer(answers, 'a2') + getAnswer(answers, 'a3') + getAnswer(answers, 'a4')) / 4;
  const anxietyRaw = (getAnswer(answers, 'a5') + getAnswer(answers, 'a6') + getAnswer(answers, 'a7') + getAnswer(answers, 'a8')) / 4;

  // We want a "Secure" score, so we invert the insecure measures.
  const security = (6 - (avoidanceRaw + anxietyRaw) / 2);

  let style = 'Secure';
  if (avoidanceRaw > 3 && anxietyRaw > 3) {
    style = 'Anxious-Avoidant';
  } else if (avoidanceRaw > 3) {
    style = 'Avoidant';
  } else if (anxietyRaw > 3) {
    style = 'Anxious';
  }
  
  return {
    score: Math.round(security * 20),
    style,
    raw: { anxiety: anxietyRaw, avoidance: avoidanceRaw }
  };
};

// CORE VALUES
const calculateValueScores = (answers: QuizAnswers) => {
    const tradition = (getAnswer(answers, 'v3') + getAnswer(answers, 'v4')) / 2; // Humility, Security
    const achievement = (getAnswer(answers, 'v2') + getAnswer(answers, 'v5')) / 2; // Competence, Helping
    const stimulation = (getAnswer(answers, 'v1') + getAnswer(answers, 'v6')) / 2; // Excitement, Independence

    return {
        tradition: { score: Math.round(tradition * 20) },
        achievement: { score: Math.round(achievement * 20) },
        stimulation: { score: Math.round(stimulation * 20) },
    }
}

// --- Text Generation ---

const getPersonalityBlurb = (scores: ReturnType<typeof calculatePersonalityScores>): string => {
  let parts = [];
  if (scores.extraversion.score > 70) parts.push('an outgoing and sociable person');
  else if (scores.extraversion.score < 30) parts.push('a more reserved and independent person');
  else parts.push('a balance of sociable and private');

  if (scores.agreeableness.score > 70) parts.push('who is cooperative and kind');
  else if (scores.agreeableness.score < 30) parts.push('who is direct and can be competitive');
  else parts.push('with a balanced approach to cooperation');
  
  if (scores.conscientiousness.score > 70) parts.push('who is organized and reliable');
  else if (scores.conscientiousness.score < 30) parts.push('who is spontaneous and flexible');
  else parts.push('with a flexible approach to planning');

  return `You tend to be ${parts.join(', ')}.`;
}

const getAttachmentBlurb = (scores: ReturnType<typeof calculateAttachmentScores>): string => {
    switch (scores.style) {
        case 'Secure':
            return 'You have a secure attachment style, comfortable with intimacy and independence.';
        case 'Anxious':
            return 'You lean towards an anxious attachment style, seeking high levels of intimacy and reassurance.';
        case 'Avoidant':
            return 'You lean towards an avoidant attachment style, prioritizing independence and self-sufficiency.';
        case 'Anxious-Avoidant':
            return 'You show traits of both anxious and avoidant styles, desiring closeness but also valuing your independence.';
    }
}

const getStrengths = (pScores: ReturnType<typeof calculatePersonalityScores>, aScores: ReturnType<typeof calculateAttachmentScores>): string => {
    let strengths = [];
    if (aScores.style === 'Secure') strengths.push('Your secure attachment style is a strong foundation for healthy relationships.');
    if (pScores.emotionalStability.score > 80) strengths.push('You possess strong emotional stability, allowing you to handle stress well.');
    if (pScores.agreeableness.score > 70) strengths.push('Your high agreeableness makes you a supportive and empathetic individual.');
    if (pScores.conscientiousness.score > 70) strengths.push('You are reliable and disciplined, which brings stability to your connections.');
    
    if(strengths.length === 0) return "You are on a journey of self-discovery, with many opportunities for growth."
    return strengths.join(' ');
}

const getGrowthAreas = (pScores: ReturnType<typeof calculatePersonalityScores>, aScores: ReturnType<typeof calculateAttachmentScores>): string => {
    let areas = [];
    if (aScores.style.includes('Anxious')) areas.push('You may find it beneficial to work on managing relationship anxiety and building self-reassurance.');
    if (aScores.style.includes('Avoidant')) areas.push('Exploring ways to increase comfort with vulnerability and interdependence could be rewarding.');
    if (pScores.emotionalStability.score < 40) areas.push('Developing strategies for managing stress and emotional fluctuations can improve your well-being.');
    if (pScores.agreeableness.score < 30) areas.push('Being mindful of others\' perspectives in disagreements can strengthen your bonds.');

    if(areas.length === 0) return "Continue to nurture your strengths and be mindful of how they serve you in different situations."
    return areas.join(' ');
}

// --- Main Computation Function ---

export const computeSoloResults = (answers: QuizAnswers): ResultsData => {
  const personalityScores = calculatePersonalityScores(answers);
  const attachmentInfo = calculateAttachmentScores(answers);
  const valueScores = calculateValueScores(answers);

  const personalityBlurb = getPersonalityBlurb(personalityScores);
  const attachmentBlurb = getAttachmentBlurb(attachmentInfo);

  const summary = `${personalityBlurb} In relationships, ${attachmentBlurb.toLowerCase()}`;
  const strengths = getStrengths(personalityScores, attachmentInfo);
  const growthAreas = getGrowthAreas(personalityScores, attachmentInfo);
  
  // Overall score is an average of "positive" or "healthy" traits
  const overallScore = Math.round(
    (personalityScores.conscientiousness.score + 
     personalityScores.emotionalStability.score + 
     personalityScores.agreeableness.score + 
     attachmentInfo.score
    ) / 4
  );

  const individualScores: IndividualScore[] = [
    {
      category: 'Personality Traits',
      description: "These traits describe your typical patterns of thought, feeling, and behavior.",
      scores: [
        { name: 'Openness', value: personalityScores.openness.score, insight: "Curiosity and creativity vs. preference for routine." },
        { name: 'Conscientiousness', value: personalityScores.conscientiousness.score, insight: "Organized and dependable vs. spontaneous and flexible." },
        { name: 'Extraversion', value: personalityScores.extraversion.score, insight: "Sociable and energetic vs. solitary and reserved." },
        { name: 'Agreeableness', value: personalityScores.agreeableness.score, insight: "Compassionate and cooperative vs. analytical and detached." },
        { name: 'Emotional Stability', value: personalityScores.emotionalStability.score, insight: "Calm and secure vs. sensitive and nervous." },
      ]
    },
    {
      category: 'Attachment Style',
      description: "This reflects how you connect with others in close relationships.",
      scores: [
        { name: 'Security', value: attachmentInfo.score, insight: "A higher score indicates comfort with intimacy and autonomy." },
      ]
    },
    {
      category: 'Core Values',
      description: "These are the principles that guide your life choices and motivations.",
      scores: [
        { name: 'Tradition & Security', value: valueScores.tradition.score, insight: "Emphasis on safety, stability, and respecting customs." },
        { name: 'Achievement & Benevolence', value: valueScores.achievement.score, insight: "Drive for personal success and caring for others." },
        { name: 'Stimulation & Self-Direction', value: valueScores.stimulation.score, insight: "Desire for excitement, novelty, and independence." },
      ]
    }
  ];

  return {
    summary,
    strengths,
    growthAreas,
    overallScore,
    affirmation: 'The greatest journey you can take is the one of self-discovery. Each step reveals more of the unique and valuable person you are.',
    individualScores
  };
};

// NOTE: A `computeCoupleResults` function would be needed for the partner flow.
// It would take two sets of answers, compare them, and generate a different report.
