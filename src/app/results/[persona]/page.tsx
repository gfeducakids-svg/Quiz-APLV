// src/app/results/[persona]/page.tsx
// NÃO coloque 'use client' aqui

import { ResultPageContent } from '@/components/results/ResultPageContent'
import { Suspense } from 'react';

export default function PersonaResultPage({ 
  params,
  searchParams,
}: { 
  params: { persona: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // SEM await aqui - o delay está no quiz agora
  return (
    <Suspense>
      <ResultPageContent persona={params.persona} searchParams={searchParams} />
    </Suspense>
  )
}
