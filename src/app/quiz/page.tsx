'use client';

import { useState, useTransition } from 'react';
import { quizQuestions } from './data';
import { submitQuiz } from './actions';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

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

  const cardVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 md:py-12">
      <div className="space-y-4">
        <div className="px-4">
          <p className="text-center text-sm font-medium text-primary">
            Pergunta {currentQuestionIndex + 1} de {quizQuestions.length}
          </p>
          <Progress value={progress} className="mt-2 h-2" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card
              className="border-0 md:border shadow-none md:shadow-sm bg-transparent md:bg-card"
            >
              <CardHeader className="text-center">
                <CardTitle className="text-2xl md:text-3xl font-headline leading-tight">
                  {currentQuestion.question}
                </CardTitle>
                {currentQuestion.subtitle && (
                  <CardDescription className="text-base pt-2">{currentQuestion.subtitle}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="lg"
                      disabled={isPending || selectedOption !== null}
                      className={cn(
                        'text-base h-auto py-4 whitespace-normal justify-start text-left transition-all duration-300 relative',
                        'hover:bg-primary/10 hover:border-primary',
                        'focus:bg-primary/10 focus:border-primary focus:ring-2 focus:ring-ring',
                        selectedOption === index && 'bg-primary text-primary-foreground border-primary hover:bg-primary hover:text-primary-foreground'
                      )}
                      onClick={() => handleAnswer(index)}
                    >
                      <span className="mr-4 text-2xl">{option.icon}</span>
                      <span className="flex-1">{option.text}</span>
                      {selectedOption === index && (
                          <motion.div 
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="absolute right-4 bg-white rounded-full p-0.5">
                              <CheckCircle className="h-5 w-5 text-primary" />
                          </motion.div>
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
      {isPending && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 space-y-2">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-semibold">Analisando suas respostas...</p>
          <p className="text-sm text-muted-foreground">Identificando seu perfil...</p>
          <p className="text-sm text-muted-foreground">Preparando suas recomendações personalizadas...</p>
        </div>
      )}
    </div>
  );
}
