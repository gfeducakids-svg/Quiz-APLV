
// src/components/results/ResultPageContent.tsx
'use client';

import { useEffect } from 'react';
import { Check, Shield, Gift, X, ArrowRight, CheckCircle, BookOpen, LifeBuoy, Heart, ArrowDown, HelpCircle, Smartphone, Mail, Clock } from 'lucide-react';
import CountdownTimer from '@/components/results/CountdownTimer';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ImageCarousel from '@/components/ImageCarousel';


interface ResultPageProps {
    persona: string;
    theme: string;
    badgeText: string;
    title: React.ReactNode;
    subtitle: string;
    errors: { title: string; description: string; consequence: string }[];
    transitionCopy: { title: string; text: React.ReactNode };
    solutionTitle: string;
    solutionSections: { title: string; benefit: string; items: string[] }[];
    investment: {
      price: string;
      anchorPrice: string;
    };
    countdown: {
      minutes: number;
      justification: string;
    },
    missionStatement: { title: string; text: React.ReactNode };
    faq: { question: string; answer: React.ReactNode }[];
    guarantee: {
      title: string;
      text: React.ReactNode;
      impact: string;
    };
}

const defaultSolutionSections = [
    { title: '1000 RECEITAS SEGURAS', benefit: 'Variedade sem medo de errar', items: ['Receitas para todas as idades e refeições.', 'Passo a passo simples, testado e validado.', 'Ingredientes fáceis de achar e substituir.'] },
    { title: 'CARDÁPIOS PRONTOS', benefit: 'Nunca mais pensar "o que fazer hoje?"', items: ['Cardápios semanais prontos para seguir.', 'Lista de compras automática para economizar tempo.', 'Equilíbrio nutricional garantido por especialistas.'] },
    { title: 'GUIA SOS REAÇÃO', benefit: 'Saber exatamente o que fazer na crise', items: ['O que fazer passo a passo em caso de reação.', 'Como diferenciar reações e quando ir ao médico.', 'Sua "cola" para agir com calma e segurança.'] }
];

const pagesData: Record<string, Omit<ResultPageProps, 'persona' | 'theme'>> = {
  'mae-em-panico-inicial': {
    badgeText: 'MÃE EM PÂNICO INICIAL',
    title: "O medo que você sente agora é real. Mas não precisa durar para sempre.",
    subtitle: "Você vai reconhecer alguns erros abaixo. E descobrir que tem saída para todos eles.",
    errors: [
      { title: 'Confiar em rótulos "sem lactose"', description: 'Você compra achando que é seguro. A reação vem mesmo assim - lactose e proteína do leite são diferentes.', consequence: 'Cada erro rouba sua confiança e aumenta o medo.' },
      { title: 'Repetir as mesmas 3 receitas', description: 'Frango, arroz, batata. Sempre. Você tem medo de testar algo novo. Ele enjoa e recusa.', consequence: 'A refeição vira batalha, não momento de carinho.' },
      { title: 'Ceder "só um pouquinho"', description: 'Na festa, você cede. Três horas depois: cólica, noite sem dormir.', consequence: 'A culpa consome e o intestino volta à estaca zero.' },
    ],
    transitionCopy: {
        title: "",
        text: "Eu sei que você se identificou com os 3 erros mas calma existe uma saída segura."
    },
    solutionTitle: 'O que você recebe:',
    solutionSections: defaultSolutionSections,
    investment: {
        price: '35,90',
        anchorPrice: '97',
    },
    countdown: {
      minutes: 14,
      justification: "Este valor especial de R$ 35,90 expira em:"
    },
    missionStatement: {
        title: "Por que este preço?",
        text: (<>Criei este cardápio depois de ver meu filho reagir 6 vezes em uma semana. Sei o que é o desespero de não saber o que dar. Por isso este sistema custa menos que UMA consulta nutricional - para que toda mãe tenha acesso à segurança que eu não tive no início.</>)
    },
    faq: [
        { question: "Como recebo o acesso? Funciona no celular?", answer: "Você recebe imediatamente por email após o pagamento. É um otimizado para que funcione perfeitamente em celular, tablet e computador. Pode baixar e usar offline, sem precisar de internet." },
        { question: "Tem receitas para a idade do meu filho?", answer: "Sim. O cardápio cobre de 6 meses a 13+ anos, com receitas organizadas por faixa etária. Cada receita indica a idade mínima recomendada." },
        { question: "As receitas são difíceis? Sou péssima cozinheira?", answer: "Não. As receitas são fáceis e categorizadas de acordo com seu tempo. Cada receita tem passo a passo detalhado com ingredientes." },
        { question: "Vou gastar mais com ingredientes especiais?", answer: 'Não. As receitas usam ingredientes comuns de supermercado. Você vai ECONOMIZAR parando de comprar produtos industrializados "sem leite" que custam R$ 300-500/mês.' }
    ],
    guarantee: {
      title: 'GARANTIA INCONDICIONAL',
      text: (<>Nós sabemos o MEDO que você sente. Por isso, teste o cardápio por 7 dias. Se não se sentir mais segura, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.</>),
      impact: "Você literalmente NÃO TEM NADA A PERDER."
    },
  },
  'mae-guerreira-esgotada': {
    badgeText: 'MÃE GUERREIRA ESGOTADA',
    title: "Você carrega essa luta sozinha há tempo demais.",
    subtitle: "Os três erros abaixo não são culpa sua - são sintomas de quem nunca teve as ferramentas certas.",
    errors: [
      { title: 'O looping do "frango, arroz e batata"', description: 'A mesma combinação há meses. Você vê a carinha de desânimo dele e seu coração aperta.', consequence: 'Refeição vira campo de batalha, não nutrição.' },
      { title: 'Improviso na lancheira escolar', description: 'Correria todo dia para pensar em algo seguro. Ele leva sempre a mesma fruta.', consequence: 'Ele se sente diferente. Você se sente que não dá conta.' },
      { title: 'O "pesadelo" das festinhas', description: 'Última festa: ele chorou porque não podia comer o bolo. Você saiu mais cedo.', consequence: 'Alegria vira estresse e exclusão.' },
    ],
    transitionCopy: {
        title: "",
        text: "Eu sei que você se identificou com os 3 erros mas calma existe uma saída segura."
    },
    solutionTitle: 'O que você recebe:',
    solutionSections: defaultSolutionSections,
    investment: {
        price: '35,90',
        anchorPrice: '97',
    },
    countdown: {
      minutes: 11,
      justification: "Este valor especial de R$ 35,90 expira em:"
    },
    missionStatement: {
        title: "Por que este preço?",
        text: "Porque você já luta demais. Este preço é nosso jeito de estender a mão e estar ao seu lado nessa jornada, tornando a solução acessível, não um novo fardo financeiro."
    },
    faq: [
        { question: "Como recebo o acesso? Funciona no celular?", answer: "Você recebe imediatamente por email após o pagamento. É um otimizado para que funcione perfeitamente em celular, tablet e computador. Pode baixar e usar offline, sem precisar de internet." },
        { question: "Tem receitas para a idade do meu filho?", answer: "Sim. O cardápio cobre de 6 meses a 13+ anos, com receitas organizadas por faixa etária. Cada receita indica a idade mínima recomendada." },
        { question: "As receitas são difíceis? Sou péssima cozinheira?", answer: "Não. As receitas são fáceis e categorizadas de acordo com seu tempo. Cada receita tem passo a passo detalhado com ingredientes." },
        { question: "Vou gastar mais com ingredientes especiais?", answer: 'Não. As receitas usam ingredientes comuns de supermercado. Você vai ECONOMIZAR parando de comprar produtos industrializados "sem leite" que custam R$ 300-500/mês.' }
    ],
    guarantee: {
      title: 'GARANTIA SEM ENROLAÇÃO',
      text: (<>Teste por 7 dias. Não achou as receitas práticas? Não resolveu seu problema de variedade? Devolvemos 100% do seu dinheiro. Simples assim.</>),
      impact: "Seu único risco é continuar como está."
    },
  },
  'mae-desacreditada-ao-extremo': {
    badgeText: 'MÃE DESACREDITADA AO EXTREMO',
    title: "A frustração que você sente tem nome: falta de sistema.",
    subtitle: "Abaixo estão os três padrões que mantêm você presa. Depois, a solução completa.",
    errors: [
      { title: 'Overdose de informação conflitante', description: 'Noites no Google, 15 grupos. Cada um diz uma चीज diferente. Mais confusa que antes.', consequence: 'Paralisia total. Você não confia em nada e não faz nada.' },
      { title: 'Coleção de "soluções" que falharam', description: 'E-book da influencer, dieta da nutri famosa... nada mudou. Prateleira cheia de promessas vazias.', consequence: 'Você acha que o problema é você, não os métodos.' },
      { title: 'Ceticismo com qualquer promessa nova', description: "Você vê '1000 receitas' e pensa 'lá vem mais um...'. Recusa-se a ter esperança.", consequence: 'Você se fecha para o que pode funcionar, por medo.' },
    ],
    transitionCopy: {
        title: "",
        text: "Eu sei que você se identificou com os 3 erros mas calma existe uma saída segura."
    },
    solutionTitle: 'O que você recebe:',
    solutionSections: defaultSolutionSections,
    investment: {
        price: '35,90',
        anchorPrice: '97',
    },
    countdown: {
      minutes: 9,
      justification: "Este valor especial de R$ 35,90 expira em:"
    },
    missionStatement: {
        title: "Por que este preço?",
        text: (<>Não é barato porque é ruim. É acessível porque eu ODEIO quando a solução só está disponível para quem pode pagar R$ 400 em uma consulta. Toda mãe merece ter tranquilidade, não apenas quem tem mais dinheiro.</>)
    },
    faq: [
        { question: "Como recebo o acesso? Funciona no celular?", answer: "Você recebe imediatamente por email após o pagamento. É um otimizado para que funcione perfeitamente em celular, tablet e computador. Pode baixar e usar offline, sem precisar de internet." },
        { question: "Tem receitas para a idade do meu filho?", answer: "Sim. O cardápio cobre de 6 meses a 13+ anos, com receitas organizadas por faixa etária. Cada receita indica a idade mínima recomendada." },
        { question: "As receitas são difíceis? Sou péssima cozinheira?", answer: "Não. As receitas são fáceis e categorizadas de acordo com seu tempo. Cada receita tem passo a passo detalhado com ingredientes." },
        { question: "Vou gastar mais com ingredientes especiais?", answer: 'Não. As receitas usam ingredientes comuns de supermercado. Você vai ECONOMIZAR parando de comprar produtos industrializados "sem leite" que custam R$ 300-500/mês.' }
    ],
    guarantee: {
      title: 'GARANTIA REFORÇADA PARA VOCÊ',
      text: (<>Nós sabemos que você já foi decepcionada. Por isso, nossa garantia é diferente. Se em 7 dias você não sentir que FINALMENTE encontrou a solução completa, devolvemos seu dinheiro e te damos R$50 no PIX pelo seu tempo perdido.</>),
      impact: "É isso mesmo. Nosso risco, seu ganho. Confiamos no que temos."
    },
  },
  'mae-racional-estrategica': {
    badgeText: 'MÃE RACIONAL ESTRATÉGICA',
    title: 'Você sabe que improviso tem custo. Aqui está por quê.',
    subtitle: "Os três erros abaixo são caros em tempo, dinheiro e paz de espírito. Todos evitáveis com informação estruturada.",
    errors: [
      { title: 'Desperdício por falta de sistema', description: 'Ingredientes caros estragam. Produtos não ideais porque são os únicos que encontra.', consequence: 'R$ 300/mês em compras ineficientes.' },
      { title: 'Incerteza nutricional', description: 'Receitas seguras, mas você não sabe se a dieta está balanceada em vitaminas e minerais.', consequence: 'Risco de deficiências no desenvolvimento.' },
      { title: 'Tempo não otimizado', description: '4-5 horas por semana pesquisando receitas e planejando.', consequence: 'Horas que você poderia estar com sua família.' },
    ],
    transitionCopy: {
        title: "",
        text: "Eu sei que você se identificou com os 3 erros mas calma existe uma saída segura."
    },
    solutionTitle: 'O que você recebe:',
    solutionSections: defaultSolutionSections,
    investment: {
        price: '35,90',
        anchorPrice: '97',
    },
    countdown: {
      minutes: 11,
      justification: "Este valor especial de R$ 35,90 expira em:"
    },
    missionStatement: {
        title: "Um retorno sobre investimento Imediato",
        text: "O cálculo é simples: o custo mensal com produtos APLV industrializados varia de R$ 300 a R$ 500. Este sistema custa R$ 35,90, uma única vez. Ele se paga em menos de uma semana de economia no supermercado."
    },
    faq: [
        { question: "Como recebo o acesso? Funciona no celular?", answer: "Você recebe imediatamente por email após o pagamento. É um otimizado para que funcione perfeitamente em celular, tablet e computador. Pode baixar e usar offline, sem precisar de internet." },
        { question: "Tem receitas para a idade do meu filho?", answer: "Sim. O cardápio cobre de 6 meses a 13+ anos, com receitas organizadas por faixa etária. Cada receita indica a idade mínima recomendada." },
        { question: "As receitas são difíceis? Sou péssima cozinheira?", answer: "Não. As receitas são fáceis e categorizadas de acordo com seu tempo. Cada receita tem passo a passo detalhado com ingredientes." },
        { question: "Vou gastar mais com ingredientes especiais?", answer: 'Não. As receitas usam ingredientes comuns de supermercado. Você vai ECONOMIZAR parando de comprar produtos industrializados "sem leite" que custam R$ 300-500/mês.' }
    ],
    guarantee: {
      title: 'GARANTIA DE PERFORMANCE',
      text: "7 dias. Se o sistema não otimizar seu tempo e orçamento, devolvemos 100% do seu investimento. Sem burocracia.",
      impact: "Uma decisão lógica: ou funciona, ou é de graça."
    },
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

  const recipesImages = [
    { url: 'https://i.imgur.com/u6LYNWY.jpeg', alt: 'Receita sem leite 1' },
    { url: 'https://i.imgur.com/0h340zj.jpeg', alt: 'Receita sem leite 2' },
    { url: 'https://i.imgur.com/DebYcZC.jpeg', alt: 'Receita sem leite 3' },
    { url: 'https://i.imgur.com/2f79XUl.jpeg', alt: 'Receita sem leite 4' },
    { url: 'https://i.imgur.com/4UL6HUP.jpeg', alt: 'Receita sem leite 5' },
    { url: 'https://i.imgur.com/ApG6nNb.jpeg', alt: 'Receita sem leite 6' },
    { url: 'https://i.imgur.com/jeSGdKm.jpeg', alt: 'Receita sem leite 7' }
  ];
  
  const cakesImages = [
    { url: 'https://i.imgur.com/hDs4tiz.jpeg', alt: 'Bolo sem leite 1' },
    { url: 'https://i.imgur.com/4U4jN0U.jpeg', alt: 'Bolo sem leite 2' },
    { url: 'https://i.imgur.com/nmlQnZw.jpeg', alt: 'Bolo sem leite 3' }
  ];
  
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
              className={cn("inline-block text-white text-sm font-bold py-2 px-5 rounded-full shadow-md mb-4 font-poppins", theme.gradient)}
          >
            🎯 SEU DIAGNÓSTICO: {pageData.badgeText}
          </div>
          <h1 className={cn("text-3xl md:text-4xl font-bold !leading-tight max-w-3xl mx-auto font-poppins", theme.text)}>
            {pageData.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {pageData.subtitle}
          </p>
        </header>
        
        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-3 text-red-700 font-poppins">
                    <X className="h-7 w-7"/> OS 3 ERROS QUE ESTÃO TE IMPEDINDO DE TER PAZ
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
                             {error.title}
                          </p>
                           <p className="text-base text-gray-800 mt-2">
                            "{error.description}"
                          </p>
                          <p className="text-base text-red-800 font-semibold mt-2">
                            <ArrowRight className="inline h-4 w-4 mr-1" /> {error.consequence}
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
                {pageData.transitionCopy.title && <h3 className={cn("text-xl font-bold font-poppins mb-2", theme.text)}>{pageData.transitionCopy.title}</h3>}
                <div className="text-base text-gray-700 leading-relaxed space-y-3">{pageData.transitionCopy.text}</div>
            </div>
        </section>

        <section className="py-8 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border-x-2 border-gray-200 bg-white shadow-xl">
              <div className={cn("p-8 text-white rounded-t-2xl text-center", theme.gradient)}>
                  <p className="text-xl md:text-2xl font-bold font-poppins">Cardápio sem Leite da Mãe Prevenida</p>
                  <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 font-poppins mt-2">
                    <Gift className="h-9 w-9"/>{pageData.solutionTitle}
                  </h2>
              </div>
              <div className="bg-gray-50 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pageData.solutionSections.map((section, index) => (
                      <div 
                        key={index} 
                        className={cn(
                          "p-6 rounded-xl border-2 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all flex flex-col",
                          "bg-gradient-to-br",
                          index === 0 && "from-blue-100 to-indigo-100 border-blue-400",
                          index === 1 && "from-purple-100 to-pink-100 border-purple-400",
                          index === 2 && "from-green-100 to-emerald-100 border-green-400"
                        )}
                      >
                          <div className="flex items-center gap-3 mb-3">
                            {index === 0 && <BookOpen className="w-8 h-8 text-blue-600" />}
                            {index === 1 && <Gift className="w-8 h-8 text-purple-600" />}
                            {index === 2 && <LifeBuoy className="w-8 h-8 text-green-600" />}
                            <div>
                              <h4 className={cn(
                                "font-bold text-lg font-poppins",
                                index === 0 && "text-blue-900",
                                index === 1 && "text-purple-900",
                                index === 2 && "text-green-900"
                              )}>
                                {section.title}
                              </h4>
                                <p className={cn(
                                "text-sm font-semibold",
                                index === 0 && "text-blue-700",
                                index === 1 && "text-purple-700",
                                index === 2 && "text-green-700"
                              )}>
                                {section.benefit}
                              </p>
                            </div>
                          </div>
                          {section.items.length > 0 && 
                              <ul className={cn(
                                "space-y-2 flex-grow",
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
                          {index === 0 && (
                            <div className='mt-4'>
                                <ImageCarousel 
                                    images={recipesImages}
                                    autoplayDelay={2500}
                                    containerClassName="py-2 bg-transparent"
                                    itemClassName="flex-[0_0_50%] sm:flex-[0_0_33.33%] lg:flex-[0_0_25%]"
                                />
                            </div>
                          )}
                      </div>
                  ))}
              </div>
              <div className="my-6 h-[1px] bg-gray-200 max-w-lg mx-auto"></div>
              <div className="p-4 md:p-6">
                <div className="text-center">
                  <div className="flex justify-center items-baseline gap-2">
                    <span className="text-sm uppercase text-gray-400 tracking-wide">DE</span>
                    <span className="text-2xl font-bold text-gray-400 line-through decoration-red-500 decoration-2">
                      R$ {pageData.investment.anchorPrice}
                    </span>
                  </div>
                  
                  <p className="text-sm uppercase text-gray-500 tracking-wide my-1">POR APENAS</p>
                  
                  <div className={cn("leading-none text-emerald-600")}>
                    <span className="text-4xl md:text-5xl align-super mr-1">R$</span>
                    <span className="font-black text-7xl md:text-8xl">{pageData.investment.price}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-3">
                    <span className="font-bold text-emerald-600">R$ {dailyPrice}</span> por dia
                  </p>
                </div>
                
                <div className="text-center mt-6">
                    <Link 
                      href="https://pay.kiwify.com.br/v2XN6QB" 
                      className={cn(
                        'w-full block text-center text-xl md:text-2xl font-bold uppercase text-white py-5 px-8 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 font-poppins',
                        theme.buttonGradient
                      )}
                    >
                      <Check className="inline-block h-7 w-7 mr-2"/>
                      SIM, QUERO O SISTEMA COMPLETO!
                    </Link>
                  <p className="mt-3 text-sm text-gray-600 flex items-center justify-center gap-2"><Shield className="h-4 w-4 text-gray-500" /> Pagamento Seguro • Acesso Imediato • 7 Dias de Garantia</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      
        <ImageCarousel 
            title="🎂 Bolos e Recheios Especiais"
            images={cakesImages}
            autoplayDelay={4000}
        />

        <div className="bg-gray-50 py-8 px-4">
          <div className="max-w-2xl mx-auto space-y-8">

              <section className="relative text-center bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-400 rounded-2xl p-8 shadow-xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg">OFERTA RELÂMPAGO</div>
                  <Clock className="h-10 w-10 mx-auto mb-4 text-red-600" />
                  <h3 className="text-2xl md:text-3xl font-bold text-red-800 font-poppins">⚠️ DECISÃO IMPORTANTE</h3>
                   <p className="text-red-900 mt-3 max-w-md mx-auto">O preço de R$ 35,90 é exclusivo para quem age AGORA. Após o timer, volta para o valor integral de R$ 97,00.</p>
                  <div className="my-4">
                      <CountdownTimer initialMinutes={pageData.countdown.minutes} />
                  </div>
                  <p className="text-xs text-gray-600">Após este período, o sistema ajusta automaticamente para o preço padrão.</p>
              </section>

              <section className={cn("text-center p-8 rounded-2xl")}>
                  <Heart className={cn("h-10 w-10 mx-auto mb-3", theme.text)} />
                  <h3 className={cn("text-xl md:text-2xl font-bold mb-3 font-poppins", theme.text)}>
                    {pageData.missionStatement.title}
                  </h3>
                  <div className="text-gray-700 leading-relaxed max-w-lg mx-auto space-y-3">{pageData.missionStatement.text}</div>
              </section>
              
              <section className={cn("text-center p-8 rounded-2xl border-2 shadow-md", theme.border, theme.bg)}>
                  <Shield className={cn("h-12 w-12 mx-auto mb-2", theme.text)}/>
                  <h3 className={cn("text-xl md:text-2xl font-bold mb-4 font-poppins", theme.text)}>
                    {pageData.guarantee.title}
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">{pageData.guarantee.text}</div>
                  <div className={cn("mt-6 p-4 rounded-lg font-bold text-lg", theme.bg, theme.text)}>
                      {pageData.guarantee.impact}
                  </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-center mb-6 font-poppins text-gray-800">Dúvidas Frequentes</h2>
                 <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
                  {pageData.faq.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-white/50 border-gray-200 rounded-lg mb-3 shadow-sm">
                      <AccordionTrigger className="p-4 font-semibold text-base text-left font-poppins text-gray-800 hover:no-underline">
                        <div className="flex items-center gap-3">
                          <HelpCircle className={cn("h-6 w-6", theme.text)} />
                          {item.question}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-4 pt-0 text-base text-gray-700">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <p className="text-center mt-4 text-gray-600">
                  <strong>Ainda tem dúvidas?</strong> Nosso suporte responde IMEDIATAMENTE. Chama no chat!
                </p>
              </section>

          </div>
        </div>
      </div>
  );
}
