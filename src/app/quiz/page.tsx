'use client';

import { useState, useTransition } from 'react';
import { quizQuestions } from './data';
import { submitQuiz } from './actions';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const cardVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;

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

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-6 h-6 text-primary" /> : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-zebra-3d.png')] opacity-20"></div>

      <div className="container mx-auto max-w-2xl py-8 md:py-12 relative z-10">
        <div className="space-y-6">
          <div className="px-4">
            <p className="text-center text-sm font-semibold text-secondary mb-2">
              Pergunta {currentQuestionIndex + 1} de {quizQuestions.length}
            </p>
            <div className="relative h-3 bg-primary/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
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
              <Card
                className="border-0 shadow-xl bg-white backdrop-blur-md rounded-2xl"
              >
                <CardHeader className="text-center pt-8 pb-6">
                  <CardTitle className="font-headline text-3xl md:text-4xl font-bold text-gray-800 !leading-tight">
                    {currentQuestion.question}
                  </CardTitle>
                  {currentQuestion.subtitle && (
                    <CardDescription className="text-base pt-2 text-foreground-secondary">{currentQuestion.subtitle}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isPending || selectedOption !== null}
                        onClick={() => handleAnswer(index)}
                        className={cn(
                          'group relative w-full p-5 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-4',
                          'bg-white hover:bg-gradient-to-br hover:from-white hover:to-primary/5',
                          'border-gray-200 hover:border-primary hover:shadow-lg',
                          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                          selectedOption === index && 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-md'
                        )}
                      >
                        <div className={cn(
                          'flex items-center justify-center w-12 h-12 rounded-lg transition-colors flex-shrink-0',
                          'bg-gray-100 group-hover:bg-primary/10',
                          selectedOption === index && 'bg-primary/20'
                        )}>
                          {getIcon(option.icon)}
                        </div>
                        
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
                            <CheckCircle2 className="w-6 h-6 text-primary fill-primary/20" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
        {isPending && (
          <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="text-lg font-semibold mt-4">Analisando suas respostas...</p>
          </div>
        )}
      </div>
    </div>
  );
}
