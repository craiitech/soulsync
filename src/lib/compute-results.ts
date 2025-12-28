import type { QuizAnswers } from './types';
import type { ResultsData, IndividualScore } from '@/components/dashboard/results';

// --- Scoring Logic ---

// Helper to get an answer value, defaulting to a neutral 3
const getAnswer = (answers: QuizAnswers, id: string) => answers[id] || 3;

// BIG FIVE PERSONALITY
// Note: Some questions are reverse-scored.
const calculatePersonalityScores = (answers: QuizAnswers) => {
  // O-C-E-A-N
  const openness = (getAnswer(answers, 'p5') + (6 - getAnswer(answers, 'p10'))) / 2;
  const conscientiousness = (getAnswer(answers, 'p3') + (6 - getAnswer(answers, 'p8'))) / 2;
  const extraversion = (getAnswer(answers, 'p1') + (6 - getAnswer(answers, 'p6'))) / 2;
  const agreeableness = ((6 - getAnswer(answers, 'p2')) + getAnswer(answers, 'p7')) / 2;
  const emotionalStability = ((6 - getAnswer(answers, 'p4')) + getAnswer(answers, 'p9')) / 2;

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
  const avoidanceRaw = (getAnswer(answers, 'a1') + getAnswer(answers, 'a2') + (6 - getAnswer(answers, 'a3')) + (6 - getAnswer(answers, 'a4'))) / 4;
  const anxietyRaw = (getAnswer(answers, 'a5') + getAnswer(answers, 'a6') + (6 - getAnswer(answers, 'a7')) + (6 - getAnswer(answers, 'a8'))) / 4;

  // We want a "Secure" score, so we invert the insecure measures.
  const security = (6 - (avoidanceRaw + anxietyRaw) / 2);

  let style = 'Secure';
  if (avoidanceRaw > 3 && anxietyRaw > 3) {
    style = 'Anxious-Avoidant';
  } else if (avoidanceRaw > 3.2) {
    style = 'Avoidant';
  } else if (anxietyRaw > 3.2) {
    style = 'Anxious';
  }
  
  return {
    score: Math.round(Math.max(0, security * 20)),
    style,
    raw: { anxiety: anxietyRaw, avoidance: avoidanceRaw }
  };
};

// CORE VALUES
const calculateValueScores = (answers: QuizAnswers) => {
    const tradition = (getAnswer(answers, 'v3') + getAnswer(answers, 'v4')) / 2;
    const achievement = (getAnswer(answers, 'v2') + getAnswer(answers, 'v5')) / 2;
    const stimulation = (getAnswer(answers, 'v1') + getAnswer(answers, 'v6')) / 2;

    return {
        tradition: { score: Math.round(tradition * 20) },
        achievement: { score: Math.round(achievement * 20) },
        stimulation: { score: Math.round(stimulation * 20) },
    }
}

// LOVE STYLE
const calculateLoveStyleScores = (answers: QuizAnswers) => {
    const intimacy = getAnswer(answers, 'l1');
    const passion = getAnswer(answers, 'l2');
    const commitment = getAnswer(answers, 'l3');
    // For conflict, a lower score on l4 and l5 is better, so we reverse it.
    const conflictResolution = ( (6 - getAnswer(answers, 'l4')) + (6 - getAnswer(answers, 'l5')) + getAnswer(answers, 'l6') ) / 3;

    return {
        intimacy: { score: Math.round(intimacy * 20) },
        passion: { score: Math.round(passion * 20) },
        commitment: { score: Math.round(commitment * 20) },
        conflictResolution: { score: Math.round(conflictResolution * 20) },
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
        default:
            return 'Your attachment style is a unique blend, showing flexibility in how you approach relationships.'
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

const getCompatibilityProfile = (
    pScores: ReturnType<typeof calculatePersonalityScores>,
    aScores: ReturnType<typeof calculateAttachmentScores>
): string => {
    let profile = [];

    // Attachment is key
    if (aScores.style === 'Secure') {
        profile.push("You are a great match for many types of people, as your secure base can help partners who are more anxious or avoidant feel safe.");
    } else if (aScores.style === 'Anxious') {
        profile.push("You would thrive with a partner who has a secure attachment style. Their consistency and reassurance can help soothe your anxieties and build a strong, trusting bond.");
    } else if (aScores.style === 'Avoidant') {
        profile.push("You would pair well with a patient and secure partner. They can provide the understanding and space you need, while gently encouraging deeper connection without feeling overwhelming.");
    } else {
        profile.push("A secure and patient partner would be a great match, helping to create a stable environment where you can explore both intimacy and independence safely.");
    }

    // Personality
    if (pScores.extraversion.score > 70) {
        profile.push("Look for an introvert who appreciates your energy and can help you recharge, or a fellow extrovert to share in your social adventures.");
    } else if (pScores.extraversion.score < 30) {
        profile.push("A partner who respects your need for quiet and solitude is key. They might be a fellow introvert or a calm extrovert who understands your boundaries.");
    }

    if (pScores.conscientiousness.score < 40) {
        profile.push("A more organized and structured partner could bring balance and stability, helping you stay on track with shared goals.");
    }

    if (profile.length <= 1) {
        profile.push("Because you have a balanced profile, you may find you connect well with a wide variety of personalities. Look for someone whose core values align with your own.");
    }

    return profile.join(" ");
};


// --- Main Computation Function ---

export const computeSoloResults = (answers: QuizAnswers): ResultsData => {
  const personalityScores = calculatePersonalityScores(answers);
  const attachmentInfo = calculateAttachmentScores(answers);
  const valueScores = calculateValueScores(answers);
  const loveStyleScores = calculateLoveStyleScores(answers);

  const personalityBlurb = getPersonalityBlurb(personalityScores);
  const attachmentBlurb = getAttachmentBlurb(attachmentInfo);

  const summary = `${personalityBlurb} In relationships, ${attachmentBlurb.toLowerCase()}`;
  const strengths = getStrengths(personalityScores, attachmentInfo);
  const growthAreas = getGrowthAreas(personalityScores, attachmentInfo);
  const compatibilityProfile = getCompatibilityProfile(personalityScores, attachmentInfo);
  
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
        { name: 'Security', value: attachmentInfo.score, insight: `A higher score indicates comfort with intimacy and autonomy. Your style appears to be: ${attachmentInfo.style}` },
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
    },
    {
        category: 'Love Style',
        description: 'This explores how you experience love and handle conflict.',
        scores: [
            { name: 'Intimacy', value: loveStyleScores.intimacy.score, insight: "Desire for closeness and emotional connection."},
            { name: 'Passion', value: loveStyleScores.passion.score, insight: "The 'in-love' feeling, including physical and sexual attraction."},
            { name: 'Commitment', value: loveStyleScores.commitment.score, insight: "The decision to maintain the relationship long-term."},
            { name: 'Conflict Resolution', value: loveStyleScores.conflictResolution.score, insight: "Ability to navigate disagreements constructively."},
        ]
    }
  ];

  return {
    summary,
    strengths,
    growthAreas,
    overallScore,
    affirmation: 'The greatest journey you can take is the one of self-discovery. Each step reveals more of the unique and valuable person you are.',
    individualScores,
    compatibilityProfile,
  };
};

// NOTE: A `computeCoupleResults` function would be needed for the partner flow.
// It would take two sets of answers, compare them, and generate a different report.
