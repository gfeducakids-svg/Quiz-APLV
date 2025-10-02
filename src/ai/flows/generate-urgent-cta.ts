'use server';

/**
 * @fileOverview Generates a personalized and urgent Call To Action (CTA) based on the user's quiz results and identified persona.
 *
 * - generateUrgentCTA - A function that generates the urgent CTA.
 * - GenerateUrgentCTAInput - The input type for the generateUrgentCTA function.
 * - GenerateUrgentCTAOutput - The return type for the generateUrgentCTA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUrgentCTAInputSchema = z.object({
  persona: z.enum([
    'Mãe em Pânico Inicial',
    'Mãe Guerreira Esgotada',
    'Mãe Racional Estratégica',
    'Mãe Desacreditada ao Extremo',
  ]),
  errors: z.array(z.string()).describe('List of identified errors the user is making.'),
});
export type GenerateUrgentCTAInput = z.infer<typeof GenerateUrgentCTAInputSchema>;

const GenerateUrgentCTAOutputSchema = z.object({
  cta: z.string().describe('The personalized and urgent Call To Action.'),
});
export type GenerateUrgentCTAOutput = z.infer<typeof GenerateUrgentCTAOutputSchema>;

export async function generateUrgentCTA(input: GenerateUrgentCTAInput): Promise<GenerateUrgentCTAOutput> {
  return generateUrgentCTAFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUrgentCTAPrompt',
  input: {schema: GenerateUrgentCTAInputSchema},
  output: {schema: GenerateUrgentCTAOutputSchema},
  prompt: `You are an expert copywriter specializing in creating high-conversion CTAs for mothers of children with APLV (Cow's Milk Protein Allergy).

  Based on the persona and identified errors, create a personalized and urgent Call To Action (CTA) to motivate the user to take immediate action.

  Persona: {{{persona}}}
  Identified Errors: {{#each errors}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Here are the possible personas and example CTAs:

  Perfil 1: "Mãe em Pânico Inicial" (bebês 0-2 anos)
  - Diagnosis: "Você está no olho do furacão... e isso pode marcar seu filho PRA SEMPRE"
  - CTA: "Pare de errar AGORA. Garanta o Cardápio com 50% OFF antes que seja tarde"

  Perfil 2: "Mãe Guerreira Esgotada" (3-8 anos)
  - Diagnosis: "Você já lutou demais sozinha. Cada dia que passa, a culpa só cresce..."
  - CTA: "Você merece alívio HOJE. Acesse as 1000 receitas e RESPIRE"

  Perfil 3: "Mãe Racional Estratégica" (pais participativos)
  - Diagnosis: "Você SABE que precisa de um sistema. Parar de improvisar está custando caro"
  - CTA: "Tenha o SISTEMA completo que sua família precisa. Garantia de 7 dias"

  Perfil 4: "Mãe Desacreditada ao Extremo" (13+ ou tentou tudo)
  - Diagnosis: "Eu sei... você já tentou TUDO. Mas e se DESTA VEZ for diferente?"
  - CTA: "Dê UMA última chance (com garantia). Você não tem mais nada a perder"

  Ensure the CTA is:
  - Personalized to the persona and errors.
  - Urgent and creates a sense of immediate need.
  - Clear and concise.
  - Action-oriented.

  Output the CTA only. Do not include any additional text or explanations.
  `,
})

const generateUrgentCTAFlow = ai.defineFlow(
  {
    name: 'generateUrgentCTAFlow',
    inputSchema: GenerateUrgentCTAInputSchema,
    outputSchema: GenerateUrgentCTAOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
