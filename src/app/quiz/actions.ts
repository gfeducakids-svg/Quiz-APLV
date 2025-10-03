'use server';

import { redirect } from 'next/navigation';
import type { Persona } from '@/lib/types';
import { scoringMatrix } from './scoring';

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

  let topPersona: Persona = 'Mãe Racional Estratégica';
  let maxScore = -1;
  let tiedPersonas: Persona[] = [];

  for (const persona in scores) {
    const score = scores[persona as Persona];
    if (score > maxScore) {
      maxScore = score;
      topPersona = persona as Persona;
      tiedPersonas = [persona as Persona];
    } else if (score === maxScore) {
      tiedPersonas.push(persona as Persona);
    }
  }

  // Handle ties based on priority
  if (tiedPersonas.length > 1) {
    const moneySpentAnswer = answers[6]; // index 6
    if (moneySpentAnswer >= 3) {
      if (tiedPersonas.includes('Mãe Desacreditada ao Extremo')) return 'Mãe Desacreditada ao Extremo';
    }
    
    // Fallback to 'Mãe Guerreira Esgotada'
    if (tiedPersonas.includes('Mãe Guerreira Esgotada')) {
        return 'Mãe Guerreira Esgotada';
    }
    
    return tiedPersonas[0];
  }


  return topPersona;
}

export async function submitQuiz(answers: number[]) {
  if (answers.length !== 8) {
    redirect('/quiz?error=incomplete');
    return;
  }

  const persona = getPersona(answers);
  const personaSlug = persona.toLowerCase().replace(/ /g, '-');
  
  const answerValues = {
    q7: answers[6]
  }
  const params = new URLSearchParams(Object.entries(answerValues).map(([key, value]) => [key, value.toString()]));

  redirect(`/results/${personaSlug}?${params.toString()}`);
}
