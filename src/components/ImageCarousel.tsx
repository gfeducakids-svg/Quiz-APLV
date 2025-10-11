'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselImage {
  url: string;
  alt: string;
}

interface ImageCarouselProps {
  title?: string;
  images: CarouselImage[];
  autoplayDelay?: number;
  containerClassName?: string;
  itemClassName?: string;
}

export default function ImageCarousel({ 
  title, 
  images, 
  autoplayDelay = 3500,
  containerClassName,
  itemClassName
}: ImageCarouselProps) {
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      skipSnaps: false
    },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={cn("w-full py-12 bg-gradient-to-b from-white to-green-50", containerClassName)}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título da seção */}
        {title && <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 font-headline">
          {title}
        </h3>}
        
        {/* Container do carrossel */}
        <div className="relative">
          
          {/* Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={cn("flex-[0_0_80%] sm:flex-[0_0_40%] lg:flex-[0_0_25%] min-w-0 pl-4", itemClassName)}
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
                      priority
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                      quality={80}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Botões de navegação */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 -translate-x-1/2"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 translate-x-1/2"
            aria-label="Próximo slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
        </div>
        
      </div>
    </div>
  );
}

    