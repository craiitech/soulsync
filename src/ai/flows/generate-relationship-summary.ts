'use server';

/**
 * @fileOverview Generates a human-readable summary of relationship compatibility, including strengths and areas for growth.
 *
 * - generateRelationshipSummary - A function that generates the relationship summary.
 * - GenerateRelationshipSummaryInput - The input type for the generateRelationshipSummary function.
 * - GenerateRelationshipSummaryOutput - The return type for the generateRelationshipSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRelationshipSummaryInputSchema = z.object({
  user1Values: z.string().describe('The core values of user 1.'),
  user2Values: z.string().describe('The core values of user 2.'),
  user1AttachmentStyle: z.string().describe('The attachment style of user 1.'),
  user2AttachmentStyle: z.string().describe('The attachment style of user 2.'),
  user1Personality: z.string().describe('The personality traits of user 1.'),
  user2Personality: z.string().describe('The personality traits of user 2.'),
  loveStyleMatch: z.string().describe('A description of how well the love styles of the users match.'),
  communicationRiskFlags: z.string().describe('Any communication risk flags identified between the users.'),
  overallCompatibility: z.number().describe('The overall compatibility score between the users (0-100).'),
});
export type GenerateRelationshipSummaryInput = z.infer<typeof GenerateRelationshipSummaryInputSchema>;

const GenerateRelationshipSummaryOutputSchema = z.object({
  summary: z.string().describe('A detailed summary of the relationship compatibility, including strengths, growth areas, and personalized advice.'),
});
export type GenerateRelationshipSummaryOutput = z.infer<typeof GenerateRelationshipSummaryOutputSchema>;

export async function generateRelationshipSummary(input: GenerateRelationshipSummaryInput): Promise<GenerateRelationshipSummaryOutput> {
  return generateRelationshipSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRelationshipSummaryPrompt',
  input: {schema: GenerateRelationshipSummaryInputSchema},
  output: {schema: GenerateRelationshipSummaryOutputSchema},
  prompt: `You are a relationship expert providing insights into compatibility based on provided data.

  Based on the following information, generate a detailed summary of the relationship compatibility. Include strengths, growth areas, and personalized advice for the couple.

  User 1 Values: {{{user1Values}}}
  User 2 Values: {{{user2Values}}}
  User 1 Attachment Style: {{{user1AttachmentStyle}}}
  User 2 Attachment Style: {{{user2AttachmentStyle}}}
  User 1 Personality: {{{user1Personality}}}
  User 2 Personality: {{{user2Personality}}}
  Love Style Match: {{{loveStyleMatch}}}
  Communication Risk Flags: {{{communicationRiskFlags}}}
  Overall Compatibility: {{{overallCompatibility}}}%

  Summary:`,
});

const generateRelationshipSummaryFlow = ai.defineFlow(
  {
    name: 'generateRelationshipSummaryFlow',
    inputSchema: GenerateRelationshipSummaryInputSchema,
    outputSchema: GenerateRelationshipSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
