'use client';

import { useState, useTransition, useEffect } from 'react';
import { quizQuestions } from './data';
import { submitQuiz } from './actions';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const cardVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const questionThemes = {
  0: {
    primary: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    hover: 'hover:bg-blue-50/50',
    iconBg: 'bg-blue-100',
    gradient: 'from-blue-400 to-blue-600'
  },
  1: {
    primary: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-500',
    hover: 'hover:bg-orange-50/50',
    iconBg: 'bg-orange-100',
    gradient: 'from-orange-400 to-orange-600'
  },
  2: {
    options: [
      { primary: 'text-red-500', bg: 'bg-red-50', border: 'border-red-500', iconBg: 'bg-red-100' },
      { primary: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-500', iconBg: 'bg-amber-100' },
      { primary: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-500', iconBg: 'bg-yellow-100' },
      { primary: 'text-green-500', bg: 'bg-green-50', border: 'border-green-500', iconBg: 'bg-green-100' },
    ]
  },
  3: {
    primary: 'text-purple-500',
    bg: 'bg-purple-50',
    border: 'border-purple-500',
    hover: 'hover:bg-purple-50/50',
    iconBg: 'bg-purple-100',
    gradient: 'from-purple-400 to-purple-600'
  },
  4: {
    primary: 'text-pink-500',
    bg: 'bg-pink-50',
    border: 'border-pink-500',
    hover: 'hover:bg-pink-50/50',
    iconBg: 'bg-pink-100',
    gradient: 'from-pink-400 to-pink-600'
  },
  5: {
    primary: 'text-emerald-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-500',
    hover: 'hover:bg-emerald-50/50',
    iconBg: 'bg-emerald-100',
    gradient: 'from-emerald-400 to-emerald-600'
  },
  6: {
    options: [
      { primary: 'text-green-500', bg: 'bg-green-50', border: 'border-green-500', iconBg: 'bg-green-100' },
      { primary: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-500', iconBg: 'bg-amber-100' },
      { primary: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-500', iconBg: 'bg-orange-100' },
      { primary: 'text-red-500', bg: 'bg-red-50', border: 'border-red-500', iconBg: 'bg-red-100' },
      { primary: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-500', iconBg: 'bg-gray-100' },
    ]
  },
  7: {
    primary: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-600',
    hover: 'hover:bg-green-50/50',
    iconBg: 'bg-green-100',
    gradient: 'from-green-500 to-emerald-600'
  },
};

const loadingMessages = [
  "Analisando suas respostas...",
  "Identificando seu perfil...",
  "Preparando suas recomendações personalizadas...",
  "Selecionando as melhores receitas para você...",
  "Quase pronto! Finalizando seu diagnóstico..."
];

const testimonialImages = [
  'https://i.imgur.com/PtA6PhP.png',
  'https://i.imgur.com/mNwm5uk.png',
  'https://i.imgur.com/CN8VhOY.png'
];

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (isPending) {
      const interval = setInterval(() => {
        setMessageIndex(prev => (prev + 1) % loadingMessages.length);
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [isPending]);

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || null;
  };
  
  const getTheme = (questionIndex: number, optionIndex?: number) => {
    const theme = questionThemes[questionIndex as keyof typeof questionThemes];
    if (theme && 'options' in theme && optionIndex !== undefined) {
      return (theme as { options: any[] }).options[optionIndex];
    }
    return theme || { primary: 'text-primary', iconBg: 'bg-gray-100' };
  };

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const newAnswers = [...answers, optionIndex];
    
    setTimeout(() => {
        setAnswers(newAnswers);
        if (currentQuestionIndex < quizQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption(null);
        } else {
          startTransition(() => {
            submitQuiz(newAnswers);
          });
        }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-zebra-3d.png')] opacity-20"></div>

      <div className="container mx-auto max-w-2xl py-8 md:py-12 relative z-10">
        <div className="space-y-6">
          <div className="w-full px-4 mb-8">
            <p className="text-center text-base font-bold text-gray-700 mb-2">
              Pergunta {currentQuestionIndex + 1} de {quizQuestions.length}
            </p>
            <div className="flex gap-1.5">
              {Array.from({ length: quizQuestions.length }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'h-2 rounded-full flex-1 transition-all duration-500',
                    index < currentQuestionIndex 
                      ? 'bg-green-400' 
                      : index === currentQuestionIndex 
                      ? 'bg-blue-500 animate-pulse' 
                      : 'bg-gray-200'
                  )}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <Card className="border-0 shadow-xl bg-white backdrop-blur-md rounded-2xl">
                <CardHeader className="text-center pt-8 pb-6">
                  <CardTitle className="font-headline text-3xl md:text-4xl font-bold text-gray-800 !leading-tight">
                    {currentQuestion.question}
                  </CardTitle>
                  {currentQuestion.subtitle && (
                    <CardDescription className="text-base pt-2 text-foreground-secondary">
                      {currentQuestion.subtitle}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    {currentQuestion.options.map((option, index) => {
                      const IconComponent = getIcon(option.icon);
                      const optionTheme = getTheme(currentQuestionIndex, index);

                      return (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isPending || selectedOption !== null}
                          onClick={() => handleAnswer(index)}
                          className={cn(
                            'group relative w-full p-5 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-4',
                            'bg-white hover:bg-gradient-to-br from-white',
                            'border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
                            'hover:to-primary/5 hover:border-primary',
                            selectedOption === index 
                              ? `${optionTheme.border} ${optionTheme.bg} shadow-md`
                              : 'focus:ring-primary',
                            'hover:' + optionTheme.border
                          )}
                        >
                          {IconComponent && (
                            <div className={cn(
                              'flex items-center justify-center w-12 h-12 rounded-lg transition-colors flex-shrink-0',
                              selectedOption === index ? optionTheme.iconBg : 'bg-gray-100',
                              `group-hover:${optionTheme.iconBg}`
                            )}>
                              <IconComponent className={cn("w-6 h-6", optionTheme.primary)} />
                            </div>
                          )}
                          
                          <div className="flex-1">
                            <p className="font-semibold text-base text-gray-800">
                              {option.text}
                            </p>
                          </div>
                          
                          {selectedOption === index && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              className="absolute top-3 right-3"
                            >
                              <CheckCircle2 className={cn("w-6 h-6", optionTheme.primary)} />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* LOADING COM CARROSSEL */}
      {isPending && (
        <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col items-center justify-center z-50 p-4">
          <div className="space-y-4 text-center mb-8">
            <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto" />
            <p className="text-lg font-semibold text-gray-900 transition-opacity duration-300">
              {loadingMessages[messageIndex]}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-xl font-semibold text-green-700 text-center">
              Veja quem já conseguiu. Você será a próxima!
            </p>
          </div>

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
      )}
    </div>
  );
}