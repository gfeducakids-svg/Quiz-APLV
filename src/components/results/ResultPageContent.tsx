// src/components/results/ResultPageContent.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Gift, X, ArrowRight, CheckCircle, BookOpen, LifeBuoy } from 'lucide-react';
import CountdownTimer from '@/components/results/CountdownTimer';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { identifyPersonaErrors, type IdentifyPersonaErrorsOutput } from '@/ai/flows/identify-persona-errors';
import { generateUrgentCTA, type GenerateUrgentCTAOutput } from '@/ai/flows/generate-urgent-cta';

interface ResultPageProps {
    persona: string;
    theme: string;
    badgeText: string;
    title: React.ReactNode;
    socialProof: string;
    errors: { title: string; description: string }[];
    solutionTitle: string;
    solutionSections: { title: string; items: string[], details?: string[] }[];
    countdownMinutes: number;
    investment: {
      price: string;
      anchorPrice: string;
      justifications: string[];
    };
    ctaButton: {
        text: string;
    };
    ctaSubtitle: string;
    guaranteeTitle: string;
    guaranteeText: React.ReactNode;
    guaranteeImpact: string;
}

const pagesData: Record<string, Omit<ResultPageProps, 'persona' | 'theme'>> = {
  'mae-em-panico-inicial': {
    badgeText: 'MÃE EM PÂNICO INICIAL',
    title: "Você está no olho do furacão... e isso pode marcar seu filho PRA SEMPRE.",
    socialProof: 'Mães como você eliminaram 90% das reações em 7 dias ao corrigir esses 3 pontos.',
    errors: [
      { title: 'Confiar em rótulos "sem lactose" que ainda contêm leite.', description: '73% têm traços de leite escondidos' },
      { title: 'Repetir as mesmas 3 receitas por medo de errar e causar reações.', description: 'Seu filho enjoa, você se desespera' },
      { title: 'Acreditar que "só um pouquinho" não vai fazer mal.', description: 'Inflama o intestino e atrasa a cura' },
    ],
    solutionTitle: 'O CARDÁPIO SEM LEITE DA MÃE PREVENIDA',
    solutionSections: [
        { title: '1000 RECEITAS TESTADAS', items: ['Organizadas por idade, refeição e tempo de preparo', 'Informação nutricional completa para cada receita', 'Passo a passo detalhado e ingredientes exatos'], details: ['Calorias (kcal)', 'Proteínas, carboidratos, gorduras'] },
        { title: 'RECEITAS DE FESTA', items: ['Bolos de aniversário, docinhos e salgados', 'Para seu filho nunca mais se sentir excluído'] },
        { title: 'GUIA SOS REAÇÃO', items: ['O que fazer passo a passo em caso de reação', 'Quando procurar um médico imediatamente'] }
    ],
    countdownMinutes: 14,
    investment: {
        price: '35,90',
        anchorPrice: '97,00',
        justifications: [
            '1000 receitas com informação nutricional completa',
            'Organizadas por idade, tempo e refeição',
            'Inclui receitas de FESTA (seu filho nunca fica de fora)',
            'Guia SOS para agir rápido em reações',
            'Acesso vitalício por um pagamento único'
        ]
    },
    ctaButton: { text: 'QUERO AS 1000 RECEITAS AGORA' },
    ctaSubtitle: 'Acesso imediato • Pagamento seguro • Risco zero',
    guaranteeTitle: 'GARANTIA INCONDICIONAL',
    guaranteeText: (<>Nós sabemos o MEDO que você sente. Por isso, teste o cardápio por 7 dias. Se não se sentir mais segura, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.</>),
    guaranteeImpact: "Você literalmente NÃO TEM NADA A PERDER."
  },
  'mae-guerreira-esgotada': {
    badgeText: 'MÃE GUERREIRA ESGOTADA',
    title: 'Você já lutou demais sozinha. Chegou a hora de ter um arsenal completo.',
    socialProof: 'Mais de 5.000 mães como você hoje têm paz e variedade para alimentar seus filhos.',
    errors: [
      { title: 'Falta de variedade estratégica', description: 'Repete as mesmas 5 coisas porque é seguro, mas cansativo.' },
      { title: 'Não ter receitas rápidas catalogadas', description: 'Improvisa quando está sem tempo, aumentando o risco de erro.' },
      { title: 'Festas e eventos são um pesadelo', description: 'Seu filho fica triste ou você se estressa por dias.' },
    ],
    solutionTitle: 'SEU ARSENAL: O CARDÁPIO SEM LEITE',
    solutionSections: [
        { title: 'ORGANIZAÇÃO INTELIGENTE', items: ['Café da manhã (200+)', 'Lanches escolares (300+)', 'Almoços e Jantares (400+)', 'Sobremesas e Festas (100+)'], details: ['Filtre por tempo de preparo', 'Filtre por dificuldade'] },
        { title: 'ECONOMIA DE TEMPO', items: ['340+ receitas em menos de 15 minutos', 'Lista de compras inteligente para a semana'] },
        { title: 'PAZ DE ESPÍRITO', items: ['Todas as receitas testadas e seguras', 'Guia SOS Reação para agir rápido'] },
    ],
    countdownMinutes: 11,
    investment: {
        price: '35,90',
        anchorPrice: '97,00',
        justifications: [
           '1000 receitas com informação nutricional completa',
            'Organizadas por idade, tempo e refeição',
            'Inclui receitas de FESTA (seu filho nunca fica de fora)',
            'Guia SOS para agir rápido em reações',
            'Acesso vitalício por um pagamento único'
        ]
    },
    ctaButton: { text: 'QUERO TER PAZ E VARIEDADE' },
    ctaSubtitle: 'Risco zero. Retorno comprovado.',
    guaranteeTitle: 'GARANTIA SEM ENROLAÇÃO',
    guaranteeText: (<>Teste por 7 dias. Não achou as receitas práticas? Não resolveu seu problema de variedade? Devolvemos 100% do seu dinheiro. Simples assim.</>),
    guaranteeImpact: "Seu único risco é continuar como está."
  },
  'mae-desacreditada-ao-extremo': {
    badgeText: 'MÃE DESACREDITada AO EXTREMO',
    title: `Eu sei que você já tentou de TUDO. Mas você ainda não tentou do jeito certo.`,
    socialProof: 'Para as mães que, como você, já tinham perdido a esperança e hoje vivem uma nova realidade.',
    errors: [
      { title: 'Informação espalhada e conflitante', description: 'Perde horas caçando receitas que não sabe se são seguras.' },
      { title: 'Receitas sem validação nutricional', description: 'Não sabe se a alimentação está balanceada para a idade.' },
      { title: 'Achar que "já viu tudo"', description: 'Das 1000 receitas, garantimos que 850+ você nunca viu.' },
    ],
    solutionTitle: 'O QUE VOCÊ NUNCA TEVE: O SISTEMA COMPLETO',
    solutionSections: [
        { title: '1000 RECEITAS EM UM SÓ LUGAR', items: ['Organizadas por idade, refeição, tempo', 'Com info nutricional completa (kcal + macros)', 'Para toda fase da vida do seu filho'] },
        { title: 'VALIDAÇÃO PROFISSIONAL', items: ['Criado por nutricionistas especialistas em APLV', 'Testado por mais de 10.000 mães'] },
        { title: 'ACESSO VITALÍCIO E ATUALIZAÇÕES', items: ['Seu para sempre. Novas receitas adicionadas sem custo extra.'] },
    ],
    countdownMinutes: 9,
    investment: {
        price: '35,90',
        anchorPrice: '97,00',
        justifications: [
            '1000 receitas com informação nutricional completa',
            'Organizadas por idade, tempo e refeição',
            'Inclui receitas de FESTA (seu filho nunca fica de fora)',
            'Guia SOS para agir rápido em reações',
            'Acesso vitalício por um pagamento único'
        ]
    },
    ctaButton: { text: 'DAR UMA ÚLTIMA CHANCE (COM GARANTIA)' },
    ctaSubtitle: 'Risco zero. Retorno comprovado.',
    guaranteeTitle: 'GARANTIA REFORÇADA PARA VOCÊ',
    guaranteeText: (<>Nós sabemos que você já foi decepcionada. Por isso, nossa garantia é diferente. Se em 7 dias você não sentir que FINALMENTE encontrou a solução completa, devolvemos seu dinheiro e te damos R$50 no PIX pelo seu tempo perdido.</>),
    guaranteeImpact: "É isso mesmo. Nosso risco, seu ganho. Confiamos no que temos."
  },
  'mae-racional-estrategica': {
    badgeText: 'MÃE RACIONAL ESTRATÉGICA',
    title: 'Você sabe que precisa de um sistema. Parar de improvisar é a decisão mais inteligente.',
    socialProof: 'Junte-se às mães que trocaram a incerteza por um sistema com ROI de tempo e dinheiro comprovado.',
    errors: [
      { title: 'Improvisar sem um sistema validado', description: 'Custo estimado: R$ 300/mês em produtos errados e desperdício.' },
      { title: 'Receitas sem dados nutricionais', description: 'Risco: Incerteza sobre o balanço nutricional do seu filho.' },
      { title: 'Pagar caro por informação desorganizada', description: 'Custo: Consultas avulsas (R$400) vs. sistema vitalício (R$97).' },
    ],
    solutionTitle: 'O PRODUTO: O CARDÁPIO SEM LEITE',
    solutionSections: [
        { title: 'ESPECIFICAÇÕES TÉCNICAS', items: ['1000+ receitas em formato JSON e PDF', 'API de busca por ingrediente, tempo e idade'], details: ['Calorias (kcal)', 'Proteínas (g)', 'Carboidratos (g)', 'Gorduras (g)'] },
        { title: 'MÓDULOS INCLUSOS', items: ['Seção Festa: 150 receitas para eventos', 'Protocolo SOS: Guia de ação emergencial'] },
        { title: 'ORGANIZAÇÃO E FILTROS', items: ['Por idade (6m a 18+)', 'Por refeição (5 categorias)', 'Por tempo (3 níveis)'] },
    ],
    countdownMinutes: 11,
    investment: {
        price: '35,90',
        anchorPrice: '97,00',
        justifications: [
            '1000 receitas com informação nutricional completa',
            'Organizadas por idade, tempo e refeição',
            'Inclui receitas de FESTA (seu filho nunca fica de fora)',
            'Guia SOS para agir rápido em reações',
            'Acesso vitalício por um pagamento único'
        ]
    },
    ctaButton: { text: 'ADQUIRIR O SISTEMA COMPLETO' },
    ctaSubtitle: 'Risco zero. Retorno comprovado.',
    guaranteeTitle: 'GARANTIA DE PERFORMANCE',
    guaranteeText: "7 dias. Se o sistema não otimizar seu tempo e orçamento, devolvemos 100% do seu investimento. Sem burocracia.",
    guaranteeImpact: "Uma decisão lógica: ou funciona, ou é de graça."
  },
};

const personaThemes: Record<string, { bg: string; text: string; border: string, gradient: string, buttonGradient: string }> = {
  'mae-em-panico-inicial': { 
    bg: 'bg-blue-50', 
    text: 'text-blue-700', 
    border: 'border-blue-500', 
    gradient: 'bg-gradient-to-r from-blue-500 to-blue-700',
    buttonGradient: 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
  },
  'mae-guerreira-esgotada': { 
    bg: 'bg-orange-50', 
    text: 'text-orange-700', 
    border: 'border-orange-500', 
    gradient: 'bg-gradient-to-r from-orange-500 to-orange-700',
    buttonGradient: 'bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900'
  },
  'mae-desacreditada-ao-extremo': { 
    bg: 'bg-purple-50', 
    text: 'text-purple-700', 
    border: 'border-purple-500', 
    gradient: 'bg-gradient-to-r from-purple-500 to-purple-700',
    buttonGradient: 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900'
  },
  'mae-racional-estrategica': { 
    bg: 'bg-emerald-50', 
    text: 'text-emerald-700', 
    border: 'border-emerald-500', 
    gradient: 'bg-gradient-to-r from-emerald-500 to-emerald-700',
    buttonGradient: 'bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900'
  },
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 }}};
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 }}};

export function ResultPageContent({ persona }: { persona: string, searchParams: any }) {
  const pageData = pagesData[persona as keyof typeof pagesData];
  const theme = personaThemes[persona] || personaThemes['mae-em-panico-inicial'];
  
  useEffect(() => {
    document.body.style.backgroundColor = theme.bg;
  }, [theme.bg]);

  if (!pageData) {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Resultado não encontrado</h1>
        <p className="text-lg text-gray-700 mb-8">Ocorreu um erro ao calcular seu perfil. Por favor, tente refazer o quiz.</p>
        <Link href="/quiz" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
          Refazer Quiz
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      className={cn('min-h-screen', theme.bg)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
        <motion.header
          variants={itemVariants}
          className="text-center py-12 px-6 bg-white"
        >
          <motion.div
              variants={itemVariants}
              className={cn("inline-block text-white text-sm font-bold py-2 px-5 rounded-full shadow-md mb-6", theme.gradient)}
          >
            🎯 SEU DIAGNÓSTICO: {pageData.badgeText}
          </motion.div>
          <h1 className={cn("text-3xl md:text-4xl font-bold !leading-tight max-w-3xl mx-auto", theme.text)}>
            {pageData.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            "{pageData.socialProof}"
          </p>
        </motion.header>
        
        <motion.section variants={itemVariants} className="py-12 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                  <h2 className={cn("text-2xl md:text-3xl font-bold flex items-center justify-center gap-3", "text-red-700")}>
                    <X className="h-7 w-7"/> OS 3 ERROS QUE VOCÊ ESTÁ COMETENDO:
                  </h2>
              </div>
              <div className="space-y-6">
              {pageData.errors.map((error, index) => (
                  <motion.div 
                      key={index}
                      variants={itemVariants}
                      className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-xl shadow-md hover:shadow-xl transition-all p-6"
                  >
                      <div className="flex items-start">
                        <div className="bg-red-100 p-2 rounded-full mr-4">
                            <X className="h-6 w-6 text-red-600 flex-shrink-0"/>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                              ERRO #{index + 1}: {error.title}
                          </p>
                          <p className="text-base text-gray-700 mt-1">
                            <ArrowRight className="inline h-4 w-4 mr-1 text-red-500" /> {error.description}
                          </p>
                        </div>
                      </div>
                  </motion.div>
              ))}
              </div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
              <div className={cn("p-8 text-white rounded-t-2xl text-center", theme.gradient)}>
                  <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
                    <Gift className="h-9 w-9"/>{pageData.solutionTitle}
                  </h2>
              </div>
              <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-b-2xl border-x-2 border-b-2", theme.border)}>
                  {pageData.solutionSections.map((section, index) => (
                      <motion.div 
                        key={index} 
                        variants={itemVariants} 
                        className={cn(
                          "p-6 rounded-xl border-2 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all",
                          "bg-gradient-to-br",
                          index === 0 && cn("from-blue-50 to-indigo-50", theme.border),
                          index === 1 && cn("from-purple-50 to-pink-50", theme.border),
                          index === 2 && cn("from-green-50 to-emerald-50", theme.border)
                        )}
                      >
                          <h4 className={cn("font-bold text-lg mb-4 flex items-center gap-2", theme.text)}>
                            {index === 0 && <BookOpen className={cn("w-6 h-6", theme.text)} />}
                            {index === 1 && <Gift className={cn("w-6 h-6", theme.text)} />}
                            {index === 2 && <LifeBuoy className={cn("w-6 h-6", theme.text)} />}
                            {section.title}
                          </h4>
                          {section.items.length > 0 && 
                              <ul className="space-y-2 text-gray-700">
                                  {section.items.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                      <CheckCircle className={cn("h-5 w-5 mr-2 mt-0.5 flex-shrink-0", theme.text)} />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                              </ul>
                          }
                          {section.details && section.details.length > 0 && (
                              <div className={cn(section.items.length > 0 && "mt-4 border-t pt-4")}>
                                  <h5 className="font-semibold text-gray-900">Cada receita inclui:</h5>
                                  <ul className="mt-2 space-y-1 text-sm text-gray-700">
                                      {section.details.map((detail, i) => (
                                        <li key={i} className="flex items-center">
                                          <Check className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
                                          {detail}
                                        </li>
                                      ))}
                                  </ul>
                              </div>
                          )}
                      </motion.div>
                  ))}
              </div>
          </div>
        </motion.section>

        <div className="bg-gray-50 py-12 px-4">
          <div className="max-w-2xl mx-auto space-y-8">
              <motion.section variants={itemVariants} className="text-center bg-red-50 border-2 border-red-300 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl md:text-2xl font-bold text-red-700">⏰ OFERTA POR TEMPO LIMITADO</h3>
                  <div className="mt-4">
                      <CountdownTimer initialMinutes={pageData.countdownMinutes} />
                  </div>
              </motion.section>
              
              <motion.div
                variants={itemVariants}
                className={cn("bg-gradient-to-br from-white via-gray-50 to-white border-2 rounded-2xl p-6 md:p-8 shadow-2xl max-w-md mx-auto ring-4 ring-offset-4", theme.border, "ring-" + theme.border.replace('border-', ''))}
              >
                  <div className="flex justify-center items-baseline gap-2 mb-3">
                    <span className="text-sm font-medium uppercase text-gray-500 tracking-wide">DE</span>
                    <span className="text-2xl font-bold text-gray-400 line-through decoration-red-500 decoration-2">
                      R$ {pageData.investment.anchorPrice}
                    </span>
                    <span className="text-sm font-medium uppercase text-gray-500 tracking-wide">POR APENAS</span>
                  </div>

                  <div className={cn("py-6 px-4 rounded-2xl", theme.bg)}>
                      <div className={cn("font-black leading-none text-center", theme.text)}>
                          <span className="text-4xl md:text-5xl align-super mr-1">R$</span>
                          <span className="text-7xl md:text-8xl">{pageData.investment.price}</span>
                      </div>
                  </div>
                  
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold text-gray-900 mb-3 text-base">O que você recebe:</p>
                    <ul className="space-y-2">
                      {pageData.investment.justifications.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm font-medium text-gray-800">
                          <CheckCircle className={cn("h-5 w-5 flex-shrink-0 mt-0.5", theme.text)} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                <motion.div variants={itemVariants} className="text-center mt-8">
                    <Link 
                      href="https://pay.kiwify.com.br/v2XN6QB" 
                      className={cn(
                        'w-full block text-center text-xl md:text-2xl font-bold uppercase text-white py-5 px-8 rounded-xl shadow-2xl transition-all duration-300',
                        theme.buttonGradient
                      )}
                    >
                      <Check className="inline-block h-7 w-7 mr-2"/>
                      {pageData.ctaButton.text}
                    </Link>
                  <p className="mt-3 text-sm text-gray-600">{pageData.ctaSubtitle}</p>
                </motion.div>
              </motion.div>

              <motion.section variants={itemVariants} className={cn("text-center bg-white p-8 rounded-2xl border-2 shadow-md", theme.border)}>
                  <Shield className={cn("h-12 w-12 mx-auto mb-2", theme.text)}/>
                  <h3 className={cn("text-xl md:text-2xl font-bold mb-4", theme.text)}>
                    {pageData.guaranteeTitle}
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">{pageData.guaranteeText}</div>
                  <div className={cn("mt-6 p-4 rounded-lg font-bold", theme.bg, theme.text)}>
                      {pageData.guaranteeImpact}
                  </div>
              </section>
          </div>
        </div>
      </motion.div>
  );
}
