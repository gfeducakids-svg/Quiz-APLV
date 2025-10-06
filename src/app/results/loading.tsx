
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Loader2 } from 'lucide-react'

const loadingMessages = [
  "Analisando suas respostas...",
  "Identificando seu perfil...",
  "Preparando suas recomendações personalizadas...",
  "Selecionando as melhores receitas para você...",
  "Quase pronto! Finalizando seu diagnóstico..."
]

const testimonialImages = [
  'https://i.imgur.com/PtA6PhP.png',
  'https://i.imgur.com/mNwm5uk.png',
  'https://i.imgur.com/CN8VhOY.png'
]

export default function LoadingPage() {
  const [messageIndex, setMessageIndex] = useState(0)
  
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  )
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length)
    }, 1500)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col items-center justify-center z-50 p-4">
      {/* Seção de loading */}
      <div className="space-y-4 text-center mb-8">
        <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto" />
        <p className="text-lg font-semibold text-gray-900 transition-opacity duration-300">
          {loadingMessages[messageIndex]}
        </p>
      </div>

      {/* Texto acima do carrossel */}
      <div className="mb-6">
        <p className="text-xl font-semibold text-green-700 text-center">
          Veja quem já conseguiu. Você será a próxima!
        </p>
      </div>

      {/* Carrossel */}
      <div className="w-full max-w-2xl mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonialImages.map((src, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 px-2">
                <div className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-4">
                  <Image
                    src={src}
                    alt={`Depoimento ${index + 1}`}
                    width={600}
                    height={400}
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Indicadores (dots) */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonialImages.map((_, index) => (
            <div
              key={index}
              className="h-2 w-2 rounded-full bg-green-600 opacity-50"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
