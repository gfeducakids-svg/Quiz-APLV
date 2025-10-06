// src/app/results/[persona]/page.tsx
// NÃO coloque 'use client' aqui

import { ResultPageContent } from '@/components/results/ResultPageContent'

export default function PersonaResultPage({ 
  params,
  searchParams,
}: { 
  params: { persona: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // O delay na action do quiz garante que o loading.tsx seja exibido.
  return (
    <ResultPageContent persona={params.persona} searchParams={searchParams} />
  )
}
