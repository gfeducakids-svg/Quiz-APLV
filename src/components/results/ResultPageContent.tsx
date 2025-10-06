
// src/components/results/ResultPageContent.tsx
'use client';

import { useEffect } from 'react';
import { Check, Shield, Gift, X, ArrowRight, CheckCircle, BookOpen, LifeBuoy, Heart, ArrowDown } from 'lucide-react';
import CountdownTimer from '@/components/results/CountdownTimer';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ResultPageProps {
    persona: string;
    theme: string;
    badgeText: string;
    title: React.ReactNode;
    socialProof: string;
    errors: { title: string; description: string }[];
    transitionCopy: { title: string; text: React.ReactNode };
    solutionTitle: string;
    solutionSections: { title: string; items: string[], details?: string[] }[];
    countdownMinutes: number;
    investment: {
      price: string;
      anchorPrice: string;
      justifications: string[];
    };
    missionStatement: { title: string; text: React.ReactNode };
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
    transitionCopy: {
        title: "MAS CALMA... TEM SOLUÇÃO",
        text: "Esses 3 erros podem ser evitados HOJE com o sistema certo nas suas mãos. Você não precisa mais ter medo de cada refeição."
    },
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
    missionStatement: {
        title: "Por Que R$ 35,90?",
        text: "Porque você já está sobrecarregada. Nossa missão é tornar a alimentação segura ACESSÍVEL, não adicionar um peso financeiro à sua jornada."
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
    transitionCopy: {
        title: "VOCÊ JÁ LUTOU DEMAIS",
        text: "Esses erros acontecem porque você está sozinha improvisando. Com as ferramentas certas, a luta acaba hoje."
    },
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
    missionStatement: {
        title: "Por Que R$ 35,90?",
        text: "Você já luta demais. Este preço é nosso jeito de estar ao seu lado nessa jornada, tornando a solução acessível, não um privilégio."
    },
    ctaButton: { text: 'QUERO TER PAZ E VARIEDADE' },
    ctaSubtitle: 'Risco zero. Retorno comprovado.',
    guaranteeTitle: 'GARANTIA SEM ENROLAÇÃO',
    guaranteeText: (<>Teste por 7 dias. Não achou as receitas práticas? Não resolveu seu problema de variedade? Devolvemos 100% do seu dinheiro. Simples assim.</>),
    guaranteeImpact: "Seu único risco é continuar como está."
  },
  'mae-desacreditada-ao-extremo': {
    badgeText: 'MÃE DESACREDITADA AO EXTREMO',
    title: `Eu sei que você já tentou de TUDO. Mas você ainda não tentou do jeito certo.`,
    socialProof: 'Para as mães que, como você, já tinham perdido a esperança e hoje vivem uma nova realidade.',
    errors: [
      { title: 'Informação espalhada e conflitante', description: 'Perde horas caçando receitas que não sabe se são seguras.' },
      { title: 'Receitas sem validação nutricional', description: 'Não sabe se a alimentação está balanceada para a idade.' },
      { title: 'Achar que "já viu tudo"', description: 'Das 1000 receitas, garantimos que 850+ você nunca viu.' },
    ],
    transitionCopy: {
        title: "DESTA VEZ É DIFERENTE",
        text: "Você foi atrás de informação antes e se frustrou. Esses erros mostram exatamente o que faltava: um sistema COMPLETO e VALIDADO."
    },
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
    missionStatement: {
        title: "Por Que R$ 35,90?",
        text: "Não é barato porque é ruim. É acessível porque acreditamos que TODA mãe merece ter essa tranquilidade, e não vamos deixar o preço ser um impeditivo."
    },
    ctaButton: { text: 'DAR UMA ÚLTIMA CHANCE (COM GARANTIA)' },
    ctaSubtitle: 'Risco zero. Retorno comprovado.',
    guaranteeTitle: 'GARANTIA REFORÇADA PARA VOCÊ',
    guaranteeText: (<>Nós sabemos que você já foi decepcionada. Por isso, nossa garantia é diferente. Se em 7 dias você não sentir que FINALMENTE encontrou a solução completa, devolvemos seu dinheiro e te damos R$50 no PIX pelo seu tempo perdido.</>),
    guaranteeImpact: "É isso mesmo. Nosso risco, seu ganho. Confiamos no que temos."
  },-
  'mae-racional-estrategica': {
    badgeText: 'MÃE RACIONAL ESTRATÉGICA',
    title: 'Você sabe que precisa de um sistema. Parar de improvisar é a decisão mais inteligente.',
    socialProof: 'Junte-se às mães que trocaram a incerteza por um sistema com ROI de tempo e dinheiro comprovado.',
    errors: [
      { title: 'Improvisar sem um sistema validado', description: 'Custo estimado: R$ 300/mês em produtos errados e desperdício.' },
      { title: 'Receitas sem dados nutricionais', description: 'Risco: Incerteza sobre o balanço nutricional do seu filho.' },
      { title: 'Pagar caro por informação desorganizada', description: 'Custo: Consultas avulsas (R$400) vs. sistema vitalício (R$97).' },
    ],
    transitionCopy: {
        title: "A SOLUÇÃO É SISTEMÁTICA",
        text: "Esses erros são resultado de falta de informação estruturada. O sistema abaixo elimina todos eles de forma mensurável."
    },
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
    missionStatement: {
        title: "Por Que R$ 35,90?",
        text: "Preço justo, missão clara: democratizar alimentação segura e nutritiva para todas as famílias, com um ROI claro para a sua."
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

export function ResultPageContent({ persona }: { persona: string, searchParams: any }) {
  const pageData = pagesData[persona as keyof typeof pagesData];
  const theme = personaThemes[persona] || personaThemes['mae-em-panico-inicial'];
  
  useEffect(() => {
    document.body.style.backgroundColor = theme.bg;
    return () => {
      document.body.style.backgroundColor = '';
    }
  }, [theme.bg]);

  if (!pageData) {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
        <h1 className="text-3xl font-bold text-red-600 mb-4 font-poppins">Resultado não encontrado</h1>
        <p className="text-lg text-gray-700 mb-8">Ocorreu um erro ao calcular seu perfil. Por favor, tente refazer o quiz.</p>
        <Link href="/quiz" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
          Refazer Quiz
        </Link>
      </div>
    );
  }

  const dailyPrice = (parseFloat(pageData.investment.price.replace(',', '.')) / 30).toFixed(2).replace('.', ',');

  return (
    <div className={cn('min-h-screen', theme.bg)}>
        <header
          className="text-center py-8 px-6 bg-white"
        >
          <div
              className={cn("inline-block text-white text-sm font-bold py-2 px-5 rounded-full shadow-md mb-6 font-poppins", theme.gradient)}
          >
            🎯 SEU DIAGNÓSTICO: {pageData.badgeText}
          </div>
          <h1 className={cn("text-3xl md:text-4xl font-bold !leading-tight max-w-3xl mx-auto font-poppins", theme.text)}>
            {pageData.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            "{pageData.socialProof}"
          </p>
        </header>
        
        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-3 text-red-700 font-poppins">
                    <X className="h-7 w-7"/> OS 3 ERROS QUE VOCÊ ESTÁ COMETENDO:
                  </h2>
              </div>
              <div className="space-y-6">
              {pageData.errors.map((error, index) => (
                  <div
                      key={index}
                      className="bg-gradient-to-br from-red-100 to-orange-100 border-2 border-red-300 rounded-xl shadow-md hover:shadow-xl transition-all p-6"
                  >
                      <div className="flex items-start">
                        <div className="bg-red-200 p-2 rounded-full mr-4">
                            <X className="h-6 w-6 text-red-700 flex-shrink-0"/>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900 font-poppins">
                              ERRO #{index + 1}: {error.title}
                          </p>
                          <p className="text-base text-gray-700 mt-1">
                            <ArrowRight className="inline h-4 w-4 mr-1 text-red-500" /> {error.description}
                          </p>
                        </div>
                      </div>
                  </div>
              ))}
              </div>
          </div>
        </section>

        <section className={cn("py-6 px-6 border-y", theme.bg, theme.border)}>
            <div className="max-w-3xl mx-auto text-center">
                <ArrowDown className={cn("h-8 w-8 mx-auto mb-3", theme.text)} />
                <h3 className={cn("text-xl font-bold font-poppins mb-2", theme.text)}>{pageData.transitionCopy.title}</h3>
                <p className="text-base text-gray-600">{pageData.transitionCopy.text}</p>
            </div>
        </section>

        <section className="py-8 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
              <div className={cn("p-8 text-white rounded-t-2xl text-center", theme.gradient)}>
                  <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 font-poppins">
                    <Gift className="h-9 w-9"/>{pageData.solutionTitle}
                  </h2>
              </div>
              <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-b-2xl border-x-2 border-b-2", theme.border)}>
                  {pageData.solutionSections.map((section, index) => (
                      <div 
                        key={index} 
                        className={cn(
                          "p-6 rounded-xl border-2 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all",
                          "bg-gradient-to-br",
                          index === 0 && "from-blue-100 to-indigo-100 border-blue-400",
                          index === 1 && "from-purple-100 to-pink-100 border-purple-400",
                          index === 2 && "from-green-100 to-emerald-100 border-green-400"
                        )}
                      >
                          <div className="flex items-center gap-2 mb-3">
                            {index === 0 && <BookOpen className="w-6 h-6 text-blue-600" />}
                            {index === 1 && <Gift className="w-6 h-6 text-purple-600" />}
                            {index === 2 && <LifeBuoy className="w-6 h-6 text-green-600" />}
                            <h4 className={cn(
                              "font-bold text-lg font-poppins",
                              index === 0 && "text-blue-900",
                              index === 1 && "text-purple-900",
                              index === 2 && "text-green-900"
                            )}>
                              {section.title}
                            </h4>
                          </div>
                          {section.items.length > 0 && 
                              <ul className={cn(
                                "space-y-2",
                                index === 0 && "text-blue-800",
                                index === 1 && "text-purple-800",
                                index === 2 && "text-green-800"
                              )}>
                                  {section.items.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                      <CheckCircle className={cn(
                                          "h-5 w-5 mr-2 mt-0.5 flex-shrink-0",
                                          index === 0 && "text-blue-600",
                                          index === 1 && "text-purple-600", 
                                          index === 2 && "text-green-600"
                                        )} />
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
                      </div>
                  ))}
              </div>
          </div>
        </section>

        <div className="bg-gray-50 py-8 px-4">
          <div className="max-w-2xl mx-auto space-y-8">
              <section className="text-center bg-gradient-to-br from-red-200 to-orange-200 border-2 border-red-300 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl md:text-2xl font-bold text-red-700 font-poppins">⏰ OFERTA POR TEMPO LIMITADO</h3>
                  <div className="mt-4">
                      <CountdownTimer initialMinutes={pageData.countdownMinutes} />
                  </div>
              </section>
              
              <div
                className={cn("bg-gradient-to-br from-white via-gray-50 to-white border-2 rounded-2xl p-6 md:p-8 shadow-2xl max-w-md mx-auto ring-4 ring-offset-4", theme.border, "ring-" + theme.border.replace('border-', ''), theme.bg)}
              >
                  <div className="flex justify-center items-baseline gap-2 mb-3">
                    <span className="text-sm font-medium uppercase text-gray-500 tracking-wide">DE</span>
                    <span className="text-2xl font-bold text-gray-400 line-through decoration-red-500 decoration-2">
                      R$ {pageData.investment.anchorPrice}
                    </span>
                    <span className="text-sm font-medium uppercase text-gray-500 tracking-wide">POR APENAS</span>
                  </div>

                  <div className={cn("py-6 px-4 rounded-2xl", theme.bg)}>
                      <div className={cn("font-black leading-none text-center font-poppins", theme.text)}>
                          <span className="text-4xl md:text-5xl align-super mr-1">R$</span>
                          <span className="text-7xl md:text-8xl">{pageData.investment.price}</span>
                      </div>
                      <p className={cn("text-center font-bold mt-2", theme.text)}>
                        R$ {dailyPrice} por dia
                        <span className="text-xs font-normal text-gray-600"> / em um período de 30 dias</span>
                      </p>
                  </div>
                  
                  <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                    <p className="font-bold text-gray-900 mb-3 text-base font-poppins">O que você recebe:</p>
                    <ul className="space-y-2">
                      {pageData.investment.justifications.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm font-medium text-gray-800">
                          <CheckCircle className={cn("h-5 w-5 flex-shrink-0 mt-0.5", theme.text)} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                <div className="text-center mt-8">
                    <Link 
                      href="https://pay.kiwify.com.br/v2XN6QB" 
                      className={cn(
                        'w-full block text-center text-xl md:text-2xl font-bold uppercase text-white py-5 px-8 rounded-xl shadow-2xl transition-all duration-300 font-poppins',
                        theme.buttonGradient
                      )}
                    >
                      <Check className="inline-block h-7 w-7 mr-2"/>
                      {pageData.ctaButton.text}
                    </Link>
                  <p className="mt-3 text-sm text-gray-600">{pageData.ctaSubtitle}</p>
                </div>
              </div>

              <section className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                  <Heart className={cn("h-10 w-10 mx-auto mb-3", theme.text)} />
                  <h3 className={cn("text-xl md:text-2xl font-bold mb-3 font-poppins", theme.text)}>
                    {pageData.missionStatement.title.replace('[PREÇO]', pageData.investment.price)}
                  </h3>
                  <p className="text-gray-700 leading-relaxed max-w-lg mx-auto">
                    {pageData.missionStatement.text}
                  </p>
              </section>

              <section className={cn("text-center p-8 rounded-2xl border-2 shadow-md", theme.border, theme.bg)}>
                  <Shield className={cn("h-12 w-12 mx-auto mb-2", theme.text)}/>
                  <h3 className={cn("text-xl md:text-2xl font-bold mb-4 font-poppins", theme.text)}>
                    {pageData.guaranteeTitle}
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">{pageData.guaranteeText}</div>
                  <div className={cn("mt-6 p-4 rounded-lg font-bold", theme.bg, theme.text)}>
                      {pageData.guaranteeImpact}
                  </div>
              </section>
          </div>
        </div>
      </div>
  );
}

