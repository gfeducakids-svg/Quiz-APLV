'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import type { QuizResult } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  HeartPulse,
  ShieldAlert,
  ShieldOff,
  Sparkles,
} from 'lucide-react';
import ResultsLoading from './loading';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const personaDetails = {
  'Mãe em Pânico Inicial': {
    icon: HeartPulse,
    title: 'Diagnóstico: Mãe em Pânico Inicial',
  },
  'Mãe Guerreira Esgotada': {
    icon: ShieldOff,
    title: 'Diagnóstico: Mãe Guerreira Esgotada',
  },
  'Mãe Racional Estratégica': {
    icon: BrainCircuit,
    title: 'Diagnóstico: Mãe Racional Estratégica',
  },
  'Mãe Desacreditada ao Extremo': {
    icon: Sparkles,
    title: 'Diagnóstico: Mãe Desacreditada ao Extremo',
  },
};

export default function ResultsClient() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = searchParams.get('data');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      if (errorParam === 'ai_failed') {
        setError(
          'Não foi possível analisar suas respostas no momento. Por favor, tente novamente mais tarde.'
        );
      } else {
        setError('Ocorreu um erro inesperado. Por favor, tente refazer o quiz.');
      }
      setLoading(false);
      return;
    }

    if (data) {
      try {
        const decodedResult = JSON.parse(decodeURIComponent(data));
        setResult(decodedResult);
      } catch (e) {
        setError('Houve um problema ao carregar seus resultados.');
      }
    } else {
      setError('Nenhum resultado encontrado. Por favor, complete o quiz primeiro.');
    }
    setLoading(false);
  }, [searchParams]);

  const details = useMemo(() => {
    if (!result) return null;
    return personaDetails[result.persona];
  }, [result]);
  
  const IconComponent = details?.icon;

  if (loading) {
    return <ResultsLoading />;
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-3xl py-8 md:py-12">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erro ao Carregar Resultados</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
            <Button asChild>
                <a href="/quiz">Tentar Novamente</a>
            </Button>
        </div>
      </div>
    );
  }

  if (!result || !details || !IconComponent) {
    return <ResultsLoading />;
  }

  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12 animate-in fade-in-50 duration-500">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Seu Diagnóstico Emocional
        </h1>
        <p className="mt-3 text-lg text-foreground/80">
          Baseado nas suas respostas, aqui está o que identificamos.
        </p>
      </div>

      <Card className="mb-10 shadow-lg">
        <CardHeader className="items-center text-center">
          <IconComponent className="h-12 w-12 text-secondary" />
          <CardTitle className="text-2xl font-headline mt-2">
            {details.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-xl font-medium text-foreground/90 leading-relaxed">
            "{result.diagnosis}"
          </p>
        </CardContent>
      </Card>

      <div className="text-center mb-6">
        <h2 className="text-3xl font-headline font-bold">
          Os 3 Erros Fatais Que Você Provavelmente Está Cometendo
        </h2>
      </div>

      <div className="space-y-4 mb-12">
        {result.errors.map((error, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-card border border-primary/20">
            <ShieldAlert className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <p className="text-lg text-foreground/90">{error}</p>
          </div>
        ))}
      </div>

      <Card className="bg-secondary/20 border-secondary text-center shadow-xl">
        <CardContent className="p-8">
          <p className="text-2xl md:text-3xl font-bold font-headline text-secondary-foreground leading-tight">
            {result.cta}
          </p>
          <Button asChild size="lg" className="mt-6 w-full md:w-auto font-bold text-lg bg-primary hover:bg-primary/90">
            <a href="#">
              {result.persona === 'Mãe Guerreira Esgotada' ? 'Acessar as Receitas Agora' : 'Garantir Meu Acesso com Desconto'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
