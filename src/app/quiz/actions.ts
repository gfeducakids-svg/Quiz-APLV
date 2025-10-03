'use server';

import { redirect } from 'next/navigation';
import type { Persona } from '@/lib/types';
import { scoringMatrix } from './scoring';

function getPersona(answers: number[]): Persona {
  const scores: Record<Persona, number> = {
    'Mãe Iniciante Insegura': 0,
    'Mãe Estrategista Prática': 0,
    'Mãe Veterana Cansada': 0,
    'Mãe Racional Científica': 0,
  };

  answers.forEach((answerIndex, questionIndex) => {
    const questionScores = scoringMatrix[questionIndex]?.[answerIndex];
    if (questionScores) {
      scores['Mãe Iniciante Insegura'] += questionScores.I;
      scores['Mãe Estrategista Prática'] += questionScores.E;
      scores['Mãe Veterana Cansada'] += questionScores.V;
      scores['Mãe Racional Científica'] += questionScores.R;
    }
  });

  let topPersona: Persona = 'Mãe Estrategista Prática';
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
    // Priority 1: Pergunta 7 (Gasto)
    const moneySpentAnswer = answers[6]; // index 6
    if (moneySpentAnswer >= 3) { // > R$3000 ou "Nem quero calcular"
      if (tiedPersonas.includes('Mãe Veterana Cansada')) return 'Mãe Veterana Cansada';
    }
    
    // Priority 2: Pergunta 1 (Idade)
    const ageAnswer = answers[0]; // index 0
    // No specific tie-breaker rule for age in the new spec, but let's keep it just in case.

    // Priority 3: Default to 'Mãe Estrategista Prática'
    if (tiedPersonas.includes('Mãe Estrategista Prática')) {
        return 'Mãe Estrategista Prática';
    }
    
    // Fallback to the first tied persona if the default is not an option
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
  
  // Pass answers to results page via encoded search params
  const answerValues = {
    q7: answers[6] // Gasto
  }
  const params = new URLSearchParams(Object.entries(answerValues).map(([key, value]) => [key, value.toString()]));

  redirect(`/results/${personaSlug}?${params.toString()}`);
}