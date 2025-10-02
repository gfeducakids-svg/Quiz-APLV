import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground py-12 px-4">
      <div className="relative w-full max-w-4xl mx-auto text-center">
        <div className="absolute -top-12 sm:-top-8 right-0 left-0 mx-auto w-fit">
          <Badge
            variant="destructive"
            className="text-xs py-1 px-3 shadow-lg font-semibold"
          >
            DIAGNÓSTICO GRATUITO - POR TEMPO LIMITADO
          </Badge>
        </div>

        <h1 className="text-3xl md:text-5xl font-headline font-extrabold text-black !leading-tight">
          Você Está Cometendo Esses <span className="text-destructive">3 Erros Fatais</span> <br className="hidden md:block" />
          na Alimentação do Seu Filho com APLV?
        </h1>

        <p className="mt-4 text-lg md:text-2xl text-foreground/80 max-w-3xl mx-auto">
          Cada erro pode estar causando reações, traumas alimentares e noites de
          pânico que você NEM IMAGINA.
        </p>

        <Card className="mt-8 max-w-2xl mx-auto bg-card/80 p-6 rounded-lg text-left shadow-sm border-0">
          <p className="text-base md:text-lg mb-4 text-foreground/90">
            Este diagnóstico de 8 perguntas vai revelar exatamente o que você não
            está vendo na sua luta contra a APLV — e te dar um plano de ação
            imediato.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <span className="text-foreground/90">
                Descubra qual o seu <span className="font-bold">perfil</span> de
                mãe APLV
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <span className="text-foreground/90">
                Receba <span className="font-bold">receitas seguras</span> específicas para sua situação
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <span className="text-foreground/90">
                Pare de ter <span className="font-bold">medo na hora de alimentar</span> seu filho
              </span>
            </li>
          </ul>
        </Card>

        <div className="mt-8">
          <Button
            asChild
            size="lg"
            variant="destructive"
            className="w-full md:w-auto h-16 text-lg font-bold shadow-lg transform hover:scale-105 transition-transform"
          >
            <Link href="/quiz">DESCOBRIR MEUS ERROS AGORA</Link>
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">
            Leva 1 Minuto Resultado imediato e preciso
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-base font-medium text-muted-foreground/90">
          ⭐ Mais de 12.347 mães já descobriram seus erros e transformaram a
          alimentação dos filhos
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-destructive font-semibold group">
          <AlertTriangle className="h-4 w-4 transition-transform group-hover:scale-125" />
          <p>
            Cada dia que você continua cometendo esses erros pode estar
            prejudicando a saúde e o desenvolvimento do seu filho.
          </p>
        </div>
      </div>
    </div>
  );
}
