'use server';

/**
 * @fileOverview A flow to identify the 3 most probable feeding errors a mother is making, based on her assigned persona.
 *
 * - identifyPersonaErrors - A function that identifies feeding errors based on persona.
 * - IdentifyPersonaErrorsInput - The input type for the identifyPersonaErrors function.
 * - IdentifyPersonaErrorsOutput - The return type for the identifyPersonaErrors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyPersonaErrorsInputSchema = z.object({
  persona: z
    .enum([
      'Mãe em Pânico Inicial',
      'Mãe Guerreira Esgotada',
      'Mãe Racional Estratégica',
      'Mãe Desacreditada ao Extremo',
    ])
    .describe('The persona of the mother taking the quiz.'),
  quizAnswers: z
    .array(z.string())
    .describe('The answers provided by the mother in the quiz.'),
});
export type IdentifyPersonaErrorsInput = z.infer<
  typeof IdentifyPersonaErrorsInputSchema
>;

const IdentifyPersonaErrorsOutputSchema = z.object({
  errors: z
    .array(z.string())
    .describe('The 3 most probable feeding errors the mother is making.'),
  cta: z.string().describe('The call to action for the given persona.'),
  diagnosis: z.string().describe('Emotional diagnosis for the persona'),
});
export type IdentifyPersonaErrorsOutput = z.infer<
  typeof IdentifyPersonaErrorsOutputSchema
>;

export async function identifyPersonaErrors(
  input: IdentifyPersonaErrorsInput
): Promise<IdentifyPersonaErrorsOutput> {
  return identifyPersonaErrorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyPersonaErrorsPrompt',
  input: {
    schema: IdentifyPersonaErrorsInputSchema,
  },
  output: {
    schema: IdentifyPersonaErrorsOutputSchema,
  },
  prompt: `You are an expert copywriter specializing in quizzes of high conversion in the maternal-infant health niche.
Based on the persona of the mother and her quiz answers, you will identify the 3 most probable feeding errors she is making and provide a relevant emotional diagnosis and call to action.

Persona: {{{persona}}}
Quiz Answers: {{#each quizAnswers}}{{{this}}}\n{{/each}}

Instructions:
1.  Analyze the persona and quiz answers to understand the mother's emotional state and challenges.
2.  Identify the 3 most probable feeding errors the mother is making based on her persona and quiz answers.
3.  Create a short emotional diagnosis (2-3 sentences) that resonates with the mother's feelings and challenges.
4.  Craft a call to action that creates a sense of urgency and encourages the mother to take action.

Output:
{
  "errors": ["error 1", "error 2", "error 3"],
  "cta": "Call to action",
  "diagnosis": "Emotional diagnosis"
}
`,
});

const identifyPersonaErrorsFlow = ai.defineFlow(
  {
    name: 'identifyPersonaErrorsFlow',
    inputSchema: IdentifyPersonaErrorsInputSchema,
    outputSchema: IdentifyPersonaErrorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
