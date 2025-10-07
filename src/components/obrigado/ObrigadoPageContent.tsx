// src/components/obrigado/ObrigadoPageContent.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Gift,
  Download,
  ShieldCheck,
  LifeBuoy,
  Mail,
  Heart,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export function ObrigadoPageContent() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const productLink =
    'https://drive.google.com/drive/folders/1J8E8L5jShNTgX98Q_R6atm8t7Eeqpi5a?usp=sharing';

  useEffect(() => {
    // Component has mounted, we are on the client
    setIsClient(true);
    
    // Show confetti for 8 seconds
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  const steps = [
    {
      text: 'Clique no botão verde e salve o link nos favoritos.',
      icon: Download,
    },
    {
      text: 'Explore as receitas organizadas por idade do seu filho.',
      icon: LifeBuoy,
    },
    { text: 'Escolha 3 receitas para fazer esta semana.', icon: CheckCircle },
    { text: 'Veja seu filho comer e sorrir 💚', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 text-gray-800 font-body relative overflow-hidden">
      {isClient && showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={300}
        />
      )}

      <main className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <motion.section
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-7xl md:text-8xl mb-4 animate-bounce">🎉</div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-green-800 font-headline !leading-tight">
            PARABÉNS!
          </h1>
          <p className="mt-4 text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Você acabou de dar o passo mais importante para transformar a
            alimentação do seu filho. Agora vamos começar!
          </p>
        </motion.section>

        <motion.section
          className="max-w-2xl mx-auto mt-10"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <div className="bg-white border-4 border-green-500 rounded-2xl p-6 md:p-8 shadow-2xl text-center">
            <Gift className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-headline">
              Seu Cardápio Está Pronto!
            </h2>

            <a
              href={productLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 md:py-5 rounded-xl text-lg md:text-xl font-bold uppercase shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse"
            >
              🚀 ACESSAR MINHAS 1000 RECEITAS AGORA
            </a>

            <p className="mt-4 text-xs text-gray-500">
              ou copie e cole este link:
              <br />
              <span className="font-mono text-green-700 break-all">
                {productLink}
              </span>
            </p>
          </div>
        </motion.section>

        <motion.section
          className="max-w-3xl mx-auto mt-12"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <h3 className="text-2xl font-bold text-center mb-6 font-headline text-gray-800">
            Próximos Passos Para o Sucesso
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-5 rounded-lg shadow-md flex items-start gap-4"
              >
                <div className="flex-shrink-0 bg-green-200 text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="max-w-2xl mx-auto mt-12"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 rounded-r-lg shadow-md">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 mr-4" />
              <div>
                <h4 className="font-bold text-lg">⚠️ SALVE ESTE LINK!</h4>
                <p className="mt-1 text-sm">
                  Você terá acesso vitalício, mas precisa guardar este endereço.
                  Adicione aos favoritos do seu navegador agora mesmo para não
                  perder.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="max-w-2xl mx-auto mt-12 text-center"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-bold text-gray-800 font-headline">
              Precisa de Ajuda?
            </h3>
            <p className="mt-2 text-gray-600">
              Problema para acessar? Dúvida sobre as receitas?
            </p>
            <p className="mt-4 font-semibold">
              <a
                href="mailto:gf.educakids@gmail.com"
                className="text-green-600 hover:underline flex items-center justify-center gap-2"
              >
                <Mail className="h-5 w-5" /> Responda o email de confirmação ou
                clique no chat.
              </a>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Respondemos em minutos. ⚡
            </p>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
