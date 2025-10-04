'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { loadingCarouselImages } from '@/lib/placeholder-images';
import Autoplay from "embla-carousel-autoplay";


const loadingTexts = [
  'Estamos processando suas respostas...',
  'Criando um Resultado Preciso para você...',
  'Analisando seus maiores desafios...',
  'Cruzando dados com mais de 5.000 mães...'
];

export default function ResultsLoading() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
   const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12 flex flex-col items-center justify-center min-h-[70vh]">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />
      <p className="text-xl font-semibold text-foreground/80 mb-12 text-center h-8 transition-opacity duration-500">
        {loadingTexts[currentTextIndex]}
      </p>

      <div className="w-full max-w-xl">
        <h3 className="text-center text-2xl font-headline font-bold text-primary mb-6">
          Enquanto isso, veja o que te espera:
        </h3>
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {loadingCarouselImages.map((image) => (
              <CarouselItem key={image.id}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6 bg-background">
                      <div className="w-full h-64 relative rounded-lg overflow-hidden">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          priority
                          className="object-contain"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
