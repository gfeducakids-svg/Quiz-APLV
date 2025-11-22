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

declare global {
  interface Window {
    gtag: (
      type: 'event',
      action: string,
      params: { [key: string]: string | number | undefined }
    ) => void;
  }
}

export type GtagEvent = {
  action: string;
  params: { [key: string]: string | number | undefined };
};
