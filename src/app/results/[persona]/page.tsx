// src/app/results/[persona]/page.tsx
// NÃO coloque 'use client' aqui

import { ResultPageContent } from '@/components/results/ResultPageContent'
import { Suspense } from 'react';

export default async function PersonaResultPage({ 
  params,
  searchParams,
}: { 
  params: { persona: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // ESTA LINHA FAZ O LOADING APARECER POR 5 SEGUNDOS
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Depois renderiza o resultado
  return (
    <Suspense>
      <ResultPageContent persona={params.persona} searchParams={searchParams} />
    </Suspense>
  )
}
