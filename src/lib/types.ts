export type Persona =
  | 'Mãe Iniciante Insegura'
  | 'Mãe Estrategista Prática'
  | 'Mãe Veterana Cansada'
  | 'Mãe Racional Científica';

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  options: {
    text: string;
    icon: string;
  }[];
}

export interface QuizResult {
  persona: Persona;
  diagnosis: string;
  errors: string[];
  cta: string;
}
