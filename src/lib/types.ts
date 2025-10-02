export type Persona =
  | 'Mãe em Pânico Inicial'
  | 'Mãe Guerreira Esgotada'
  | 'Mãe Racional Estratégica'
  | 'Mãe Desacreditada ao Extremo';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

export interface QuizResult {
  persona: Persona;
  diagnosis: string;
  errors: string[];
  cta: string;
}
