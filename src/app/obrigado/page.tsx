// src/app/obrigado/page.tsx
import { ObrigadoPageContent } from '@/components/obrigado/ObrigadoPageContent';
import type { Metadata } from 'next';

// Add metadata for SEO and social sharing
export const metadata: Metadata = {
  title: 'Obrigado! Seu Cardápio Está Pronto 🎉',
  description:
    'Acesse agora suas 1000 receitas sem leite e transforme a alimentação do seu filho.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ObrigadoPage() {
  return <ObrigadoPageContent />;
}
