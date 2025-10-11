
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import ImageCarousel from '@/components/ImageCarousel';

export default function Home() {
  const recipesImages = [
    { url: 'https://i.imgur.com/u6LYNWY.jpeg', alt: 'Receita sem leite 1' },
    { url: 'https://i.imgur.com/0h340zj.jpeg', alt: 'Receita sem leite 2' },
    { url: 'https://i.imgur.com/DebYcZC.jpeg', alt: 'Receita sem leite 3' },
    { url: 'https://i.imgur.com/2f79XUl.jpeg', alt: 'Receita sem leite 4' },
    { url: 'https://i.imgur.com/4UL6HUP.jpeg', alt: 'Receita sem leite 5' },
    { url: 'https://i.imgur.com/ApG6nNb.jpeg', alt: 'Receita sem leite 6' },
    { url: 'https://i.imgur.com/jeSGdKm.jpeg', alt: 'Receita sem leite 7' }
  ];
  
  const cakesImages = [
    { url: 'https://i.imgur.com/hDs4tiz.jpeg', alt: 'Bolo sem leite 1' },
    { url: 'https://i.imgur.com/4U4jN0U.jpeg', alt: 'Bolo sem leite 2' },
    { url: 'https://i.imgur.com/nmlQnZw.jpeg', alt: 'Bolo sem leite 3' }
  ];

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground pt-8 pb-12 px-6 md:px-10 relative overflow-hidden">
      <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 w-1/2 text-gray-200/10 -z-1" />
      <div className="relative w-full max-w-4xl mx-auto text-center">
        <div
          style={{
            background: 'linear-gradient(to right, #FF8C6B, #FF6B9D)',
            boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)',
          }}
          className="inline-flex items-center rounded-full text-white px-2 py-1 text-xs font-semibold"
        >
          DIAGNÓSTICO GRATUITO - POR TEMPO LIMITADO
        </div>

        <h1 className="text-[32px] md:text-[52px] font-extrabold text-foreground !leading-tight font-headline mt-4">
          Descubra Por Que Seu Filho com APLV Ainda{' '}
          <span className="text-destructive font-bold">Não Come Sem MEDO</span>{' '}
          (E Como Mudar Isso em 7 Dias)
        </h1>

        <p className="mt-4 text-base md:text-xl text-[#5D6D7E] max-w-3xl mx-auto">
          Junte-se a +8000 mães que descobriram os <span className="font-bold text-destructive">3 erros</span> que estavam cometendo - e o sistema que resolveu tudo.
        </p>

        <div className="mt-6 max-w-2xl mx-auto">
          <Image
            src="https://i.imgur.com/uvWtFwo.jpeg"
            alt="Mãe com filho"
            width={700}
            height={400}
            priority
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>

        <Card className="mt-6 max-w-2xl mx-auto bg-card/80 p-6 rounded-lg text-left shadow-sm border-0">
          <p className="text-sm md:text-base mb-6 text-[#6B7280]">
            Este diagnóstico de 8 perguntas vai revelar exatamente o que você
            não está vendo na sua luta contra a APLV — e te dar um{' '}
            <span className="text-primary font-semibold">
              plano de ação imediato
            </span>
            .
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-[#E8F5E9] rounded-full p-1 mr-3 flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-foreground/90 pt-0.5">
                Qual o seu <span className="font-bold text-primary">perfil</span> de mãe
                APLV (e o cardápio ideal para você)
              </span>
            </li>
            <li className="flex items-start">
              <div className="bg-[#E8F5E9] rounded-full p-1 mr-3 flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-foreground/90 pt-0.5">
                Receba{' '}
                <span className="font-bold text-primary">
                  receitas seguras
                </span>{' '}
                específicas para sua situação
              </span>
            </li>
            <li className="flex items-start">
              <div className="bg-[#E8F5E9] rounded-full p-1 mr-3 flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-foreground/90 pt-0.5">
                Pare de ter{' '}
                <span className="font-bold text-primary">medo na hora de alimentar</span> seu filho
              </span>
            </li>
          </ul>
        </Card>

        <div className="mt-8">
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
              FAZER MEU DIAGNÓSTICO GRATUITO <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-3 text-sm text-[#94A3B8]">
            Resultado Imediato e Preciso | Leva 1 Minuto
          </p>
        </div>
        
        <div className="my-6 h-[1px] bg-border max-w-sm mx-auto"></div>

        <div className="mt-8 flex items-center justify-center gap-3 text-sm font-semibold group bg-accent p-4 rounded-lg border-l-4 border-destructive max-w-xl mx-auto">
          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 transition-transform group-hover:scale-125" />
          <p className="text-accent-foreground text-left">
            Cada dia que você continua cometendo esses erros pode estar
            prejudicando a saúde e o desenvolvimento do seu filho.
          </p>
        </div>
      </div>
    </div>
    
      <ImageCarousel 
        title="📚 1000 Receitas Testadas e Aprovadas"
        images={recipesImages}
        autoplayDelay={3500}
      />
      
      <ImageCarousel 
        title="🎂 Bolos e Recheios Especiais"
        images={cakesImages}
        autoplayDelay={4000}
      />
    </>
  );
}
