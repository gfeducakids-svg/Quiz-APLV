'use client';

import { useState, useEffect } from 'react';
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
import { testimonials } from '@/lib/placeholder-images';

const loadingTexts = [
  'Estamos processando suas respostas...',
  'Criando um resultado preciso para você...',
  'Analisando seu perfil emocional...',
  'Identificando os erros mais comuns...',
];

export default function ResultsLoading() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12 flex flex-col items-center justify-center min-h-[70vh]">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />
      <p className="text-xl font-semibold text-foreground/80 mb-12 text-center h-8">
        {loadingTexts[currentTextIndex]}
      </p>

      <div className="w-full max-w-xl">
        <h3 className="text-center text-2xl font-headline font-bold text-primary mb-6">
          Enquanto isso, veja o que outras mães dizem:
        </h3>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="w-full h-64 relative rounded-lg overflow-hidden">
                        <Image
                          src={testimonial.imageUrl}
                          alt={testimonial.description}
                          fill
                          className="object-cover"
                          data-ai-hint={testimonial.imageHint}
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
