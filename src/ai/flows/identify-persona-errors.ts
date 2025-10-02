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
  diagnosis: z
    .string()
    .describe('Emotional diagnosis for the persona. Example: "Você está no olho do furacão... e isso pode marcar seu filho PRA SEMPRE"'),
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
  prompt: `Você é um copywriter especialista em saúde materno-infantil.
Sua tarefa é criar um diagnóstico emocional e identificar 3 erros de alimentação com base no perfil de uma mãe.

Persona: {{{persona}}}
Respostas do Quiz: {{#each quizAnswers}}{{{this}}}\n{{/each}}

Siga EXATAMENTE estas instruções:
1. Analise a Persona e as respostas para entender os desafios da mãe.
2. Crie um "diagnóstico emocional" curto e impactante (1-2 frases) que ressoe com o perfil dela.
3. Liste os 3 erros mais prováveis que ela comete na alimentação.

Exemplos de Diagnósticos:
- "Mãe em Pânico Inicial": "Você está no olho do furacão... e isso pode marcar seu filho PRA SEMPRE."
- "Mãe Guerreira Esgotada": "Você já lutou demais sozinha. Cada dia que passa, a culpa só cresce..."
- "Mãe Racional Estratégica": "Você SABE que precisa de um sistema. Parar de improvisar está custando caro."
- "Mãe Desacreditada ao Extremo": "Eu sei... você já tentou TUDO. Mas e se DESTA VEZ for diferente?"

Exemplos de Erros:
- Confiar em rótulos "sem lactose" que ainda contêm leite.
- Repetir as mesmas 3 receitas por medo de errar e causar reações.
- Acreditar que "só um pouquinho" não vai fazer mal.

Responda APENAS com o JSON. NÃO inclua texto adicional.
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
