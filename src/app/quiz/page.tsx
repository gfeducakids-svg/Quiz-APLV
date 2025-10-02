'use client';

import { useState, useTransition } from 'react';
import { quizQuestions } from './data';
import { submitQuiz } from './actions';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleAnswer = (answer: string) => {
    setSelectedOption(answer);
    const newAnswers = [...answers, answer];
    
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
    }, 300);
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

        <Card
          key={currentQuestionIndex}
          className="border-0 md:border shadow-none md:shadow-sm animate-in fade-in-50 duration-500 bg-transparent md:bg-card"
        >
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-headline text-center leading-tight">
              {currentQuestion.question}
            </CardTitle>
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
                    'text-base h-auto py-4 whitespace-normal justify-start text-left transition-all duration-300',
                    'hover:bg-accent hover:border-primary',
                    'focus:bg-accent focus:border-primary focus:ring-2 focus:ring-ring',
                    selectedOption === option && 'bg-primary text-primary-foreground border-primary'
                  )}
                  onClick={() => handleAnswer(option)}
                >
                  {isPending && selectedOption === option ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {isPending && (
        <div className="fixed inset-0 bg-background/80 flex flex-col items-center justify-center z-50">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg font-semibold">Analisando suas respostas...</p>
        </div>
      )}
    </div>
  );
}
