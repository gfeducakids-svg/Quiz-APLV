'use server';

import { identifyPersonaErrors } from '@/ai/flows/identify-persona-errors';
import { generateUrgentCTA } from '@/ai/flows/generate-urgent-cta';
import type { Persona } from '@/lib/types';
import { redirect } from 'next/navigation';

function getPersona(answers: string[]): Persona {
  const age = answers[0];
  const moneySpent = answers[7];
  const desiredOutcome = answers[5];

  if (
    age === 'Adolescente (14+)' ||
    age === 'Pré-adolescente (9-13 anos)' ||
    moneySpent === 'R$ 1.500 a R$ 3.000 (nutricionistas, produtos caros)' ||
    moneySpent === 'Mais de R$ 3.000 (e ainda estou perdida)'
  ) {
    return 'Mãe Desacreditada ao Extremo';
  }

  if (desiredOutcome === 'Ter um cardápio PRONTO que EU SEI que funciona') {
    return 'Mãe Racional Estratégica';
  }

  if (age === 'Bebê (0-2 anos)') {
    return 'Mãe em Pânico Inicial';
  }

  if (age === 'Criança (3-8 anos)') {
    return 'Mãe Guerreira Esgotada';
  }

  // Fallback to a common persona
  return 'Mãe Guerreira Esgotada';
}

export async function submitQuiz(answers: string[]) {
  if (answers.length !== 8) {
    redirect('/quiz?error=incomplete');
    return;
  }

  const persona = getPersona(answers);

  try {
    const personaErrorsResult = await identifyPersonaErrors({
      persona,
      quizAnswers: answers,
    });

    const urgentCtaResult = await generateUrgentCTA({
      persona,
      errors: personaErrorsResult.errors,
    });

    const result = {
      persona,
      diagnosis: personaErrorsResult.diagnosis,
      errors: personaErrorsResult.errors,
      cta: urgentCtaResult.cta,
    };

    const resultString = JSON.stringify(result);
    const encodedResult = Buffer.from(resultString).toString('base64');
    redirect(`/results?data=${encodedResult}`);
  } catch (error) {
    console.error('AI flow failed:', error);
    redirect('/results?error=ai_failed');
  }
}
