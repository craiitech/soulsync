import type { QuizAnswers } from './types';
import type { ResultsData } from '@/components/dashboard/results';

// --- Scoring Logic ---

// Helper to get an answer value, defaulting to a neutral 3
const getAnswer = (answers: QuizAnswers, id: string) => answers[id] || 3;

// BIG FIVE PERSONALITY
// Note: Some questions are reverse-scored. This is handled in quiz-data.ts
const calculatePersonalityScores = (answers: QuizAnswers) => {
  // O-C-E-A-N
  const openness = (getAnswer(answers, 'p5') + getAnswer(answers, 'p10')) / 2; // p10 is reversed
  const conscientiousness = (getAnswer(answers, 'p3') + getAnswer(answers, 'p8')) / 2; // p8 is reversed
  const extraversion = (getAnswer(answers, 'p1') + getAnswer(answers, 'p6')) / 2; // p6 is reversed
  const agreeableness = (getAnswer(answers, 'p2') + getAnswer(answers, 'p7')) / 2; // p2 is reversed
  const neuroticism = (getAnswer(answers, 'p4') + getAnswer(answers, 'p9')) / 2; // p4 is reversed, but p9 is direct
  
  // We return the inverse of neuroticism as "Emotional Stability"
  return {
    openness,
    conscientiousness,
    extraversion,
    agreeableness,
    emotionalStability: 6 - neuroticism, // Higher score = more stable
  };
};

// ATTACHMENT STYLE
const calculateAttachmentScores = (answers: QuizAnswers) => {
  // High score on avoidance indicates avoidant attachment
  const avoidance = (getAnswer(answers, 'a1') + getAnswer(answers, 'a2') + getAnswer(answers, 'a3') + getAnswer(answers, 'a4')) / 4;
  
  // High score on anxiety indicates anxious attachment
  const anxiety = (getAnswer(answers, 'a5') + getAnswer(answers, 'a6') + getAnswer(answers, 'a7') + getAnswer(answers, 'a8')) / 4;

  let style = 'Secure';
  if (avoidance > 3 && anxiety > 3) {
    style = 'Anxious-Avoidant';
  } else if (avoidance > 3) {
    style = 'Avoidant';
  } else if (anxiety > 3) {
    style = 'Anxious';
  }

  return { avoidance, anxiety, style };
};

// --- Text Generation ---

const getPersonalityBlurb = (scores: ReturnType<typeof calculatePersonalityScores>): string => {
  let parts = [];
  if (scores.extraversion > 3.5) parts.push('an outgoing and sociable person');
  else if (scores.extraversion < 2.5) parts.push('a more reserved and independent person');
  else parts.push('a balance of sociable and private');

  if (scores.agreeableness > 3.5) parts.push('who is cooperative and kind');
  else if (scores.agreeableness < 2.5) parts.push('who is direct and can be competitive');
  else parts.push('with a balanced approach to cooperation');
  
  if (scores.conscientiousness > 3.5) parts.push('who is organized and reliable');
  else if (scores.conscientiousness < 2.5) parts.push('who is spontaneous and flexible');
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
    if (pScores.emotionalStability > 4) strengths.push('You possess strong emotional stability, allowing you to handle stress well.');
    if (pScores.agreeableness > 3.5) strengths.push('Your high agreeableness makes you a supportive and empathetic individual.');
    if (pScores.conscientiousness > 3.5) strengths.push('You are reliable and disciplined, which brings stability to your connections.');
    
    if(strengths.length === 0) return "You are on a journey of self-discovery, with many opportunities for growth."
    return strengths.join(' ');
}

const getGrowthAreas = (pScores: ReturnType<typeof calculatePersonalityScores>, aScores: ReturnType<typeof calculateAttachmentScores>): string => {
    let areas = [];
    if (aScores.style.includes('Anxious')) areas.push('You may find it beneficial to work on managing relationship anxiety and building self-reassurance.');
    if (aScores.style.includes('Avoidant')) areas.push('Exploring ways to increase comfort with vulnerability and interdependence could be rewarding.');
    if (pScores.emotionalStability < 2.5) areas.push('Developing strategies for managing stress and emotional fluctuations can improve your well-being.');
    if (pScores.agreeableness < 2.5) areas.push('Being mindful of others\' perspectives in disagreements can strengthen your bonds.');

    if(areas.length === 0) return "Continue to nurture your strengths and be mindful of how they serve you in different situations."
    return areas.join(' ');
}

// --- Main Computation Function ---

export const computeSoloResults = (answers: QuizAnswers): ResultsData => {
  const personalityScores = calculatePersonalityScores(answers);
  const attachmentScores = calculateAttachmentScores(answers);

  const personalityBlurb = getPersonalityBlurb(personalityScores);
  const attachmentBlurb = getAttachmentBlurb(attachmentScores);

  const summary = `${personalityBlurb} In relationships, ${attachmentBlurb.toLowerCase()}`;
  const strengths = getStrengths(personalityScores, attachmentScores);
  const growthAreas = getGrowthAreas(personalityScores, attachmentScores);
  
  // Overall score is a simple average of positive traits
  const overallScore = Math.round(
    ((personalityScores.conscientiousness + 
      personalityScores.emotionalStability + 
      personalityScores.agreeableness + 
      (6 - attachmentScores.anxiety) + // Higher anxiety lowers score
      (6 - attachmentScores.avoidance) // Higher avoidance lowers score
    ) / 5) * 20 
  );

  return {
    summary,
    strengths,
    growthAreas,
    overallScore,
    affirmation: 'The greatest journey you can take is the one of self-discovery. Each step reveals more of the unique and valuable person you are.',
  };
};

// NOTE: A `computeCoupleResults` function would be needed for the partner flow.
// It would take two sets of answers, compare them, and generate a different report.
