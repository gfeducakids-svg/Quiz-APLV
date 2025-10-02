import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] text-center p-4">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tight">
          Você Está Cometendo Esses 3 Erros Fatais na Alimentação do Seu Filho
          com APLV?
        </h1>
        <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
          Este quiz rápido de 8 perguntas vai revelar os pontos cegos na sua
          jornada com a APLV e te dar um plano de ação imediato. Chega de medo,
          culpa e exaustão.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="font-bold text-lg">
            <Link href="/quiz">
              <Leaf className="mr-2 h-5 w-5" />
              Começar o Quiz e Descobrir
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Leva menos de 2 minutos.
          </p>
        </div>
      </div>
    </div>
  );
}
