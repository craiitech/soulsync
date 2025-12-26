import type { QuizQuestion } from './types';

export const quizQuestions: QuizQuestion[] = [
  // Big Five Personality (10 items)
  {
    id: 'p1',
    category: 'personality',
    text: 'I see myself as someone who is talkative and outgoing.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },
  {
    id: 'p2',
    category: 'personality',
    text: 'I tend to be critical of others.',
    options: [
      { text: 'Strongly Disagree', value: 5 }, // Reversed
      { text: 'Disagree', value: 4 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 2 },
      { text: 'Strongly Agree', value: 1 },
    ],
  },
  {
    id: 'p3',
    category: 'personality',
    text: 'I am a reliable and organized person.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },
  {
    id: 'p4',
    category: 'personality',
    text: 'I often feel anxious or easily upset.',
    options: [
      { text: 'Strongly Disagree', value: 5 }, // Reversed
      { text: 'Disagree', value: 4 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 2 },
      { text: 'Strongly Agree', value: 1 },
    ],
  },
  {
    id: 'p5',
    category: 'personality',
    text: 'I have an active imagination and enjoy artistic experiences.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },
   {
    id: 'p6',
    category: 'personality',
    text: 'I prefer to be in the background.',
    options: [
      { text: 'Strongly Disagree', value: 5 }, // Reversed for extroversion
      { text: 'Disagree', value: 4 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 2 },
      { text: 'Strongly Agree', value: 1 },
    ],
  },
  {
    id: 'p7',
    category: 'personality',
    text: 'I am generally trusting and forgiving.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },
   {
    id: 'p8',
    category: 'personality',
    text: 'I can be somewhat careless or disorganized.',
    options: [
      { text: 'Strongly Disagree', value: 5 }, // Reversed
      { text: 'Disagree', value: 4 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 2 },
      { text: 'Strongly Agree', value: 1 },
    ],
  },
  {
    id: 'p9',
    category: 'personality',
    text: 'I am emotionally stable and not easily rattled.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },
   {
    id: 'p10',
    category: 'personality',
    text: 'I have few artistic or abstract interests.',
    options: [
      { text: 'Strongly Disagree', value: 5 }, // Reversed
      { text: 'Disagree', value: 4 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 2 },
      { text: 'Strongly Agree', value: 1 },
    ],
  },

  // Attachment Style (8 items)
  {
    id: 'a1',
    category: 'attachment',
    text: 'I find it difficult to depend on other people.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },
  {
    id: 'a2',
    category: 'attachment',
    text: 'It is very important to me to feel independent.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },
  {
    id: 'a3',
    category: 'attachment',
    text: 'I find it easy to get emotionally close to others.',
    options: [
      { text: 'Strongly Disagree', value: 5 }, // Reversed
      { text: 'Disagree', value: 4 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 2 },
      { text: 'Strongly Agree', value: 1 },
    ],
  },
  {
    id: 'a4',
    category: 'attachment',
    text: "I'm comfortable depending on other people.",
    options: [
      { text: 'Strongly Disagree', value: 5 }, // Reversed
      { text: 'Disagree', value: 4 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 2 },
      { text: 'Strongly Agree', value: 1 },
    ],
  },
  {
    id: 'a5',
    category: 'attachment',
    text: 'I worry that others won’t care about me as much as I care about them.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },
   {
    id: 'a6',
    category: 'attachment',
    text: 'I often worry that my partner doesn’t really love me.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },
  {
    id: 'a7',
    category: 'attachment',
    text: "I rarely worry about my partner leaving me.",
    options: [
      { text: 'Strongly Disagree', value: 5 }, // Reversed
      { text: 'Disagree', value: 4 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 2 },
      { text: 'Strongly Agree', value: 1 },
    ],
  },
   {
    id: 'a8',
    category: 'attachment',
    text: 'I need a lot of reassurance that I am loved by my partner.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },

  // Core Values (6 items)
  {
    id: 'v1',
    category: 'values',
    text: 'How important is it for you to have a life full of excitement and novelty?',
    options: [
      { text: 'Not Important', value: 1 },
      { text: 'Slightly Important', value: 2 },
      { text: 'Moderately Important', value: 3 },
      { text: 'Very Important', value: 4 },
      { text: 'Extremely Important', value: 5 },
    ],
  },
  {
    id: 'v2',
    category: 'values',
    text: 'How important is personal achievement and showing your competence?',
    options: [
      { text: 'Not Important', value: 1 },
      { text: 'Slightly Important', value: 2 },
      { text: 'Moderately Important', value: 3 },
      { text: 'Very Important', value: 4 },
      { text: 'Extremely Important', value: 5 },
    ],
  },
  {
    id: 'v3',
    category: 'values',
    text: 'How important is it to you to be humble and modest?',
    options: [
      { text: 'Not Important', value: 1 },
      { text: 'Slightly Important', value: 2 },
      { text: 'Moderately Important', value: 3 },
      { text: 'Very Important', value: 4 },
      { text: 'Extremely Important', value: 5 },
    ],
  },
  {
    id: 'v4',
    category: 'values',
    text: 'How important is it for you to have security, safety, and stability in your life?',
    options: [
      { text: 'Not Important', value: 1 },
      { text: 'Slightly Important', value: 2 },
      { text: 'Moderately Important', value: 3 },
      { text: 'Very Important', value: 4 },
      { text: 'Extremely Important', value: 5 },
    ],
  },
  {
    id: 'v5',
    category: 'values',
    text: 'How important is it for you to help people and care for others’ well-being?',
    options: [
      { text: 'Not Important', value: 1 },
      { text: 'Slightly Important', value: 2 },
      { text: 'Moderately Important', value: 3 },
      { text: 'Very Important', value: 4 },
      { text: 'Extremely Important', value: 5 },
    ],
  },
  {
    id: 'v6',
    category: 'values',
    text: 'How important is being independent and free to choose your own explorations?',
    options: [
      { text: 'Not Important', value: 1 },
      { text: 'Slightly Important', value: 2 },
      { text: 'Moderately Important', value: 3 },
      { text: 'Very Important', value: 4 },
      { text: 'Extremely Important', value: 5 },
    ],
  },

  // Love Style (6 items)
  {
    id: 'l1',
    category: 'love',
    text: 'Emotional intimacy is the most important part of a relationship for me.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },
  {
    id: 'l2',
    category: 'love',
    text: 'I feel a strong physical and sexual attraction to my partner.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },
  {
    id: 'l3',
    category: 'love',
    text: 'I am fully committed to this relationship for the long term.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },
  {
    id: 'l4',
    category: 'love',
    text: 'During conflicts, I tend to shut down or withdraw.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },
  {
    id: 'l5',
    category: 'love',
    text: 'When my partner and I disagree, I am more likely to get critical or defensive.',
    options: [
      { text: 'Strongly Disagree', value: 1 },
      { text: 'Disagree', value: 2 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 4 },
      { text: 'Strongly Agree', value: 5 },
    ],
  },
   {
    id: 'l6',
    category: 'love',
    text: 'We are good at finding compromises when we have a disagreement.',
    options: [
      { text: 'Strongly Disagree', value: 5 }, // Reversed
      { text: 'Disagree', value: 4 },
      { text: 'Neutral', value: 3 },
      { text: 'Agree', value: 2 },
      { text: 'Strongly Agree', value: 1 },
    ],
  },
];
