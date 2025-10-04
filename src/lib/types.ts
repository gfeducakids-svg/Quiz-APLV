export type Persona =
  | 'Mãe em Pânico Inicial'
  | 'Mãe Guerreira Esgotada'
  | 'Mãe Racional Estratégica'
  | 'Mãe Desacreditada ao Extremo';

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  options: {
    text: string;
    icon: string; // Now a string to hold the Lucide icon name
  }[];
}

export interface QuizResult {
  persona: Persona;
  diagnosis: string;
  errors: string[];
  cta: string;
}
