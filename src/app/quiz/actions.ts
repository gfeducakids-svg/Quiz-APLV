'use server';

import { redirect } from 'next/navigation';
import type { Persona } from '@/lib/types';
import { scoringMatrix } from './scoring';
import { quizQuestions } from './data';

function getPersona(answers: number[]): Persona {
  const scores: Record<Persona, number> = {
    'Mãe em Pânico Inicial': 0,
    'Mãe Guerreira Esgotada': 0,
    'Mãe Racional Estratégica': 0,
    'Mãe Desacreditada ao Extremo': 0,
  };

  answers.forEach((answerIndex, questionIndex) => {
    const questionScores = scoringMatrix[questionIndex]?.[answerIndex];
    if (questionScores) {
      scores['Mãe em Pânico Inicial'] += questionScores.I;
      scores['Mãe Guerreira Esgotada'] += questionScores.E;
      scores['Mãe Racional Estratégica'] += questionScores.V;
      scores['Mãe Desacreditada ao Extremo'] += questionScores.R;
    }
  });

  let topPersona: Persona = 'Mãe em Pânico Inicial';
  let maxScore = -1;

  for (const persona in scores) {
    if (scores[persona as Persona] > maxScore) {
      maxScore = scores[persona as Persona];
      topPersona = persona as Persona;
    }
  }

  // Tie-breaking logic
  if (
    answers[6] >= 2 && // Question 7 (index 6), answer 3 or 4
    (topPersona === 'Mãe Guerreira Esgotada' ||
      topPersona === 'Mãe Racional Estratégica')
  ) {
    if (
      scores['Mãe Desacreditada ao Extremo'] >=
      scores['Mãe Guerreira Esgotada']
    ) {
      return 'Mãe Desacreditada ao Extremo';
    }
  }

  return topPersona;
}

const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export async function submitQuiz(answers: number[]) {
  if (answers.length !== quizQuestions.length) {
    redirect('/quiz?error=incomplete');
    return;
  }
  
  const persona = getPersona(answers);
  const personaSlug = normalizeString(persona);

  const answerValues = {
    q7: answers[6],
  };
  const params = new URLSearchParams(
    Object.entries(answerValues).map(([key, value]) => [key, value.toString()])
  );

  console.log('Perfil calculado:', persona);
  console.log('Slug gerado:', personaSlug);
  console.log('URL redirecionamento:', `/results/${personaSlug}?${params.toString()}`);

  redirect(`/results/${personaSlug}?${params.toString()}`);
}
