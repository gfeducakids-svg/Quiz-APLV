
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-red-600 text-white text-center py-2 text-sm font-bold">
        DIAGNÓSTICO GRATUITO - POR TEMPO LIMITADO
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground pt-[calc(2rem+3px)] pb-12 px-6 md:px-10 relative overflow-hidden">
        <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 w-1/2 text-gray-200/10 -z-1" />
        <div className="relative w-full max-w-4xl mx-auto text-center">
          <h1 className="text-[32px] md:text-[52px] font-extrabold text-foreground !leading-tight font-headline">
            DESCUBRA por que SEU FILHO com APLV ainda <span className="text-destructive">NÃO COME SEM MEDO</span> (E como MUDAR isso em 7 Dias).
          </h1>

          <div className="mt-4 max-w-2xl mx-auto">
            <Link href="/quiz">
              <Image
                src="https://i.imgur.com/uvWtFwo.jpeg"
                alt="Mãe com filho"
                width={700}
                height={400}
                priority
                className="rounded-lg shadow-lg mx-auto"
              />
            </Link>
          </div>

          <Card className="mt-4 max-w-2xl mx-auto bg-card/80 p-4 rounded-lg text-left shadow-sm border-0">
            <p className="text-base md:text-lg mb-0 text-foreground font-semibold">
              Este diagnóstico de 8 perguntas vai revelar exatamente o que você
              não está vendo na sua luta contra a APLV e te dar um{' '}
              <span className="text-primary font-semibold">
                plano de ação imediato
              </span>
              .
            </p>
          </Card>

          <div className="mt-6">
            <Button
              asChild
              variant="default"
              className="w-full md:w-auto h-auto text-base md:text-lg font-bold shadow-lg transform hover:scale-105 transition-transform text-white px-6 md:px-10 py-4 md:py-5"
              style={{
                background: 'linear-gradient(to right, #2ECC71, #28B463)',
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(46, 204, 113, 0.4)',
              }}
            >
              <Link href="/quiz">
                FAZER MEU DIAGNÓSTICO GRATUITO{' '}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="mt-2 text-sm text-muted-foreground">
              Resultado Imediato e Preciso | Leva 1 Minuto
            </p>
            <p className="mt-3 text-base md:text-lg text-foreground max-w-3xl mx-auto">
              Junte-se a +8000 mães que descobriram os{' '}
              <span className="font-bold text-destructive">3 erros</span> que
              estavam cometendo e a solução que mudou suas vidas.
            </p>
          </div>

          <div className="my-4 h-[1px] bg-border max-w-sm mx-auto"></div>

          <div className="mt-6 flex items-center justify-center gap-3 text-sm font-semibold group bg-accent p-4 rounded-lg border-l-4 border-destructive max-w-xl mx-auto">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 transition-transform group-hover:scale-125" />
            <p className="text-accent-foreground text-left">
              Cada dia que você continua cometendo esses erros pode estar
              prejudicando a saúde e o desenvolvimento do seu filho.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
