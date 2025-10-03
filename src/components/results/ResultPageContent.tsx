'use client';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import CountdownTimer from './CountdownTimer';
import { Button } from '../ui/button';

interface ResultPageProps {
    badgeText: string;
    socialProof: string;
    title: React.ReactNode;
    errors: { title: string; description: string }[];
    testimonial: { text: string; author: string };
    solutionTitle: string;
    solutionSections: { title: string; items: string[], details?: string[] }[];
    investmentText: string;
    investmentReason: React.ReactNode;
    offerRemainingText: string;
    countdownMinutes: number;
    guaranteeText: React.ReactNode;
    ctaButton: {
        text: string;
        className: string;
    };
    ctaSubtitle: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};


export function ResultPageContent({
  badgeText,
  socialProof,
  title,
  errors,
  testimonial,
  solutionTitle,
  solutionSections,
  investmentText,
  investmentReason,
  offerRemainingText,
  countdownMinutes,
  guaranteeText,
  ctaButton,
  ctaSubtitle,
}: ResultPageProps) {
  return (
    <motion.div 
        className="container mx-auto max-w-3xl py-8 md:py-12 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
      <header className="text-center mb-10">
        <motion.div variants={itemVariants}>
            <Badge variant="outline" className="text-lg py-2 px-4 border-2 border-primary text-primary font-bold">
            🎯 SEU DIAGNÓSTICO: {badgeText}
            </Badge>
        </motion.div>
        <motion.p variants={itemVariants} className="text-lg text-foreground/80 mt-4">{socialProof}</motion.p>
      </header>

      <motion.hr variants={itemVariants} className="border-border border-dashed my-8" />

      <motion.section variants={itemVariants} className="mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-headline font-bold leading-tight">
          {title}
        </h2>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-10">
        <h3 className="text-xl md:text-2xl font-headline font-bold text-center mb-6">
          ❌ OS 3 ERROS QUE VOCÊ ESTÁ COMETENDO:
        </h3>
        <div className="space-y-4">
          {errors.map((error, index) => (
            <div key={index} className="p-4 rounded-lg bg-card border border-destructive/20">
              <p className="font-bold text-destructive">ERRO #{index + 1}: {error.title}</p>
              <p className="text-foreground/80 mt-1">→ {error.description}</p>
            </div>
          ))}
        </div>
      </motion.section>
      
      <motion.hr variants={itemVariants} className="border-border border-dashed my-8" />

      <motion.section variants={itemVariants} className="mb-10 text-center bg-card p-6 rounded-lg border">
          <p className="text-yellow-500 text-2xl">⭐⭐⭐⭐⭐</p>
          <p className="text-lg italic text-foreground/90 my-2">"{testimonial.text}"</p>
          <p className="font-semibold text-foreground">— {testimonial.author}</p>
      </motion.section>

      <motion.hr variants={itemVariants} className="border-border border-dashed my-8" />
      
      <motion.section variants={itemVariants} className="mb-10">
        <h3 className="text-xl md:text-2xl font-headline font-bold text-center mb-6 text-primary">
        🎁 {solutionTitle}
        </h3>
        <div className="space-y-6">
            {solutionSections.map((section, index) => (
                <div key={index} className="p-4 rounded-lg bg-card border">
                    <h4 className="font-bold text-lg text-primary">{section.title}</h4>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-foreground/90">
                        {section.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                    {section.details && section.details.length > 0 && (
                         <div className="mt-4 border-t pt-4">
                            <p className="font-semibold">📊 Cada receita inclui:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-foreground/80">
                                {section.details.map((detail, i) => <li key={i}>{detail}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
      </motion.section>

      <motion.hr variants={itemVariants} className="border-border border-dashed my-8" />

      <motion.section variants={itemVariants} className="mb-10 text-center">
        <h3 className="text-xl md:text-2xl font-headline font-bold mb-4">💰 INVESTIMENTO</h3>
        <p className="text-5xl font-bold text-primary">{investmentText}</p>
        <div className="mt-4 text-foreground/80 max-w-xl mx-auto">{investmentReason}</div>
      </motion.section>

      <motion.hr variants={itemVariants} className="border-border border-dashed my-8" />

      <motion.section variants={itemVariants} className="text-center bg-destructive/10 border border-destructive rounded-lg p-6 mb-10">
        <h3 className="text-xl md:text-2xl font-headline font-bold text-destructive">⏰ OFERTA POR TEMPO LIMITADO</h3>
        <p className="text-lg mt-2">🔥 {offerRemainingText}</p>
        <p className="text-2xl font-bold mt-2">⏱️ Oferta expira em: <CountdownTimer initialMinutes={countdownMinutes} /></p>
      </motion.section>
      
      <motion.hr variants={itemVariants} className="border-border border-dashed my-8" />

      <motion.section variants={itemVariants} className="text-center bg-card p-6 rounded-lg border border-primary/50 mb-10">
        <h3 className="text-xl md:text-2xl font-headline font-bold mb-4">🛡️ GARANTIA 7 DIAS</h3>
        <div className="text-foreground/90">{guaranteeText}</div>
      </motion.section>

      <motion.hr variants={itemVariants} className="border-border border-dashed my-8" />
      
      <motion.section variants={itemVariants} className="text-center">
        <Button size="lg" className={`h-auto text-xl font-bold w-full md:w-auto py-4 px-8 shadow-lg animate-pulse ${ctaButton.className}`}>
            {ctaButton.text}
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">{ctaSubtitle}</p>
      </motion.section>

    </motion.div>
  );
}
