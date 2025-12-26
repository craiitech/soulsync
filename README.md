# SoulSync: Relationship Compatibility Analyzer

SoulSync is a web application designed to provide insights into relationship dynamics and personal compatibility. Users can either analyze their own relationship style or take a quiz with a partner to receive a detailed compatibility report. The analysis is powered by an AI that leverages established psychological frameworks to generate personalized feedback.

## Key Features

- **Dual User Flows:** Supports both individual self-analysis and a coupled compatibility test.
- **Psychology-Backed Quiz:** A comprehensive 30-question quiz covering personality, attachment styles, core values, and love languages.
- **AI-Powered Analysis:** Utilizes Genkit and Google's Gemini models to synthesize quiz results into a meaningful summary.
- **Detailed Reports:** Generates an overall compatibility or self-awareness score, identifies strengths, and highlights areas for growth.
- **Modern, Responsive UI:** Built with ShadCN UI and Tailwind CSS for a clean and responsive user experience on any device.

## Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **AI Integration:** [Genkit (Google's Generative AI Toolkit)](https://firebase.google.com/docs/genkit)
- **Platform:** Deployed on [Firebase](https://firebase.google.com/)

## Psychological Foundation

The compatibility analysis is not arbitrary. It's built upon well-established psychological frameworks to provide meaningful and actionable insights:

- **The "Big Five" Personality Traits (OCEAN):** Assesses Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.
- **Attachment Theory:** Explores how early bonds shape adult relationship styles (Secure, Anxious, Avoidant).
- **Core Values & Love Styles:** Identifies what individuals prioritize and how they express and receive affection.

This application was conceptualized and developed by Dr. Marvin Rick G. Forcado, integrating these psychological principles into the quiz and AI analysis.

## Getting Started

To run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result. You can start editing the page by modifying `src/app/page.tsx`.

---

*Disclaimer: This tool offers insights based on psychological research and is intended for personal growth and understanding. It is not a clinical assessment. For serious relationship concerns, please consult a licensed professional.*
