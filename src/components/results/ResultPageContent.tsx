
// src/components/results/ResultPageContent.tsx
'use client';

import { useEffect } from 'react';
import { Check, Shield, Gift, X, ArrowRight, CheckCircle, BookOpen, LifeBuoy, Heart, ArrowDown, HelpCircle, Smartphone, Mail } from 'lucide-react';
import CountdownTimer from '@/components/results/CountdownTimer';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


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
      justifications: string[];
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

const pagesData: Record<string, Omit<ResultPageProps, 'persona' | 'theme'>> = {
  'mae-em-panico-inicial': {
    badgeText: 'MÃE EM PÂNICO INICIAL',
    title: "Você está assustada. É normal. Mas existe um caminho seguro e você vai encontrá-lo agora.",
    subtitle: "Respira. 8.347 mães estavam onde você está. Hoje elas alimentam os filhos com segurança e paz.",
    errors: [
      { title: 'Confiar em rótulos "sem lactose"', description: 'Você compra um produto "sem lactose" achando que é seguro, mas a reação vem. É que lactose e proteína do leite são coisas diferentes.', consequence: 'A cada erro, a confiança para cozinhar diminui e o medo aumenta.' },
      { title: 'Cozinhar sempre as mesmas 3 coisas', description: 'Você faz sempre frango, arroz e batata porque tem medo de testar algo novo e seu filho reagir mal. Ele enjoa, recusa a comida, e você se sente uma péssima mãe, presa num looping.', consequence: 'A refeição vira uma batalha, não um momento de carinho.' },
      { title: 'Ceder "só um pouquinho"', description: 'Na festinha da família, você cede "só um pouquinho" do bolo. Três horas depois, ele está com cólica e você não dorme a noite toda.', consequence: 'A culpa te consome e o processo de cura do intestino volta à estaca zero.' },
    ],
    transitionCopy: {
        title: "NÃO É CULPA SUA. É FALTA DE UM SISTEMA.",
        text: (<>Respira fundo. Isso que você está sentindo? Outras 8.000 mães sentiram. E elas superaram. Não sozinhas, mas com o sistema certo. Você não precisa ter medo a cada refeição. Precisa ter um mapa seguro. E ele existe.</>)
    },
    solutionTitle: 'O que você recebe:',
    solutionSections: [
        { title: '1000 RECEITAS SEGURAS', benefit: 'Variedade sem medo de errar', items: ['Receitas para todas as idades e refeições.', 'Passo a passo simples, testado e validado.', 'Ingredientes fáceis de achar e substituir.'] },
        { title: 'CARDÁPIOS PRONTOS', benefit: 'Nunca mais pensar "o que fazer hoje?"', items: ['Cardápios semanais prontos para seguir.', 'Lista de compras automática para economizar tempo.', 'Equilíbrio nutricional garantido por especialistas.'] },
        { title: 'GUIA SOS REAÇÃO', benefit: 'Saber exatamente o que fazer na crise', items: ['O que fazer passo a passo em caso de reação.', 'Como diferenciar reações e quando ir ao médico.', 'Sua "cola" para agir com calma e segurança.'] }
    ],
    investment: {
        price: '35,90',
        anchorPrice: '97',
        justifications: [
          '1000 receitas com informação nutricional completa',
          'Organizadas por idade, tempo e refeição',
          'Inclui receitas de FESTA (seu filho nunca fica de fora)',
          'Guia SOS para agir rápido em reações',
          'Acesso vitalício por um pagamento único'
        ]
    },
    countdown: {
      minutes: 14,
      justification: "Após o fim do timer, o investimento volta para o valor padrão de R$ 97,00."
    },
    missionStatement: {
        title: "Por que este preço?",
        text: (<>Criei este cardápio depois de ver meu filho reagir 6 vezes em uma semana. Sei o que é o desespero de não saber o que dar. Por isso este sistema custa menos que UMA consulta nutricional - para que toda mãe tenha acesso à segurança que eu não tive no início.</>)
    },
    faq: [
      { question: "Como recebo o acesso?", answer: "Imediatamente por email após o pagamento. É um arquivo PDF que funciona em qualquer celular, tablet ou computador." },
      { question: "Funciona no celular?", answer: "Sim. O PDF foi desenhado para ser 100% legível e fácil de navegar na tela do celular, mesmo offline." },
      { question: "E se eu não gostar?", answer: "Você tem 7 dias de garantia incondicional. É só enviar um email e devolvemos 100% do valor, sem perguntas ou burocracia." }
    ],
    guarantee: {
      title: 'GARANTIA INCONDICIONAL',
      text: (<>Nós sabemos o MEDO que você sente. Por isso, teste o cardápio por 7 dias. Se não se sentir mais segura, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.</>),
      impact: "Você literalmente NÃO TEM NADA A PERDER."
    },
  },
  'mae-guerreira-esgotada': {
    badgeText: 'MÃE GUERREIRA ESGOTADA',
    title: "Você já fez demais com tão pouco. Merece ter as ferramentas certas.",
    subtitle: "Chega de carregar o mundo nas costas. Veja como 8.347 mães como você encontraram alívio e variedade.",
    errors: [
      { title: 'O looping do "frango, arroz e batata"', description: 'Você serve a mesma combinação há meses. Você vê a carinha de desânimo dele na mesa e seu coração aperta de culpa.', consequence: 'A refeição vira um campo de batalha, não um momento de nutrição e carinho.' },
      { title: 'Improviso na lancheira escolar', description: 'Todo dia é uma correria para pensar em algo seguro. Muitas vezes, ele leva a mesma fruta de sempre por falta de opção.', consequence: 'Ele se sente diferente dos amigos e você se sente uma mãe que não dá conta.' },
      { title: 'O "pesadelo" das festinhas', description: 'Na última festa, seu filho chorou porque não podia comer o bolo dos Vingadores. Você inventou uma desculpa e saiu mais cedo.', consequence: 'Momentos que deveriam ser de alegria viram fontes de estresse e exclusão.' },
    ],
    transitionCopy: {
        title: "VOCÊ NÃO DEVERIA ESTAR SOZINHA NISSO.",
        text: (<>Você merecia ter tido um sistema desde o dia 1. Não é sua culpa não ter encontrado antes - essas informações estão espalhadas de propósito para vender produtos caros. A luta do improviso pode (e vai) acabar hoje.</>)
    },
    solutionTitle: 'O que você recebe:',
    solutionSections: [
        { title: 'VARIEDADE INFINITA', benefit: 'Fim da monotonia alimentar', items: ['+200 cafés da manhã', '+300 lanches escolares', '+400 almoços e jantares', 'Filtros por tempo de preparo.'] },
        { title: 'RECEITAS DE FESTA', benefit: 'Seu filho incluído em TODOS os momentos', items: ['Bolos de aniversário, docinhos e salgados seguros.', 'Instruções para evitar contaminação cruzada.'] },
        { title: 'ECONOMIA DE TEMPO', benefit: 'Mais tempo para você e sua família', items: ['+340 receitas prontas em menos de 15 minutos.', 'Lista de compras semanal inteligente.'] },
    ],
    investment: {
        price: '35,90',
        anchorPrice: '97',
        justifications: [
          '1000 receitas com informação nutricional completa',
          'Organizadas por idade, tempo e refeição',
          'Inclui receitas de FESTA (seu filho nunca fica de fora)',
          'Guia SOS para agir rápido em reações',
          'Acesso vitalício por um pagamento único'
        ]
    },
    countdown: {
      minutes: 11,
      justification: "Após o fim do timer, o investimento volta para o valor padrão de R$ 97,00."
    },
    missionStatement: {
        title: "Por que este preço?",
        text: "Porque você já luta demais. Este preço é nosso jeito de estender a mão e estar ao seu lado nessa jornada, tornando a solução acessível, não um novo fardo financeiro."
    },
    faq: [
      { question: "Como recebo o acesso?", answer: "Imediatamente por email após o pagamento. É um arquivo PDF que funciona em qualquer celular, tablet ou computador." },
      { question: "Funciona no celular?", answer: "Sim. O PDF foi desenhado para ser 100% legível e fácil de navegar na tela do celular, mesmo offline." },
      { question: "E se eu não gostar?", answer: "Você tem 7 dias de garantia incondicional. É só enviar um email e devolvemos 100% do valor, sem perguntas ou burocracia." }
    ],
    guarantee: {
      title: 'GARANTIA SEM ENROLAÇÃO',
      text: (<>Teste por 7 dias. Não achou as receitas práticas? Não resolveu seu problema de variedade e cansaço? Devolvemos 100% do seu dinheiro. Simples assim.</>),
      impact: "Seu único risco é continuar na exaustão que você está hoje."
    },
  },
  'mae-desacreditada-ao-extremo': {
    badgeText: 'MÃE DESACREDITADA AO EXTREMO',
    title: `Sei que você já tentou de tudo e se decepcionou. Esta vez é diferente. E eu vou provar.`,
    subtitle: "Para as mães que já perderam a esperança, mas que no fundo, merecem uma última chance que funcione de verdade.",
    errors: [
      { title: 'A "overdose" de informação conflitante', description: 'Você passou noites no Google, entrou em 15 grupos, e cada lugar diz uma coisa. Está mais confusa do que quando começou.', consequence: 'Paralisia por análise. Você não confia em mais nenhuma informação e acaba não fazendo nada.' },
      { title: 'Coleção de "soluções" que não funcionaram', description: 'Comprou o e-book da influencer, a dieta da nutri famosa... e nada mudou de verdade. Sua prateleira está cheia de promessas vazias.', consequence: 'Você acredita que o problema é com você ou seu filho, e não com os métodos incompletos.' },
      { title: 'Ceticismo com qualquer nova promessa', description: 'Você vê "1000 receitas" e pensa "ah, lá vem mais um...". Você já viu de tudo e se recusa a criar qualquer expectativa.', consequence: 'Você se fecha para uma solução que pode realmente funcionar, por medo de mais uma frustração.' },
    ],
    transitionCopy: {
        title: "A DIFERENÇA DESTA VEZ É O MÉTODO.",
        text: (<>A questão não é ter 'mais receitas', é ter o SISTEMA certo. É ter informação validada e centralizada. Você não está apostando no escuro. Está seguindo um caminho que 8.347 mães já trilharam com sucesso. Desta vez, você não está sozinha.</>)
    },
    solutionTitle: 'O que você recebe:',
    solutionSections: [
        { title: 'UM ÚNICO LUGAR', benefit: 'Fim da confusão de informações', items: ['Tudo o que você precisa em um único PDF.', 'Sem informações conflitantes e duvidosas.', 'Acesso offline para consultar em qualquer lugar.'] },
        { title: 'VALIDAÇÃO NUTRICIONAL', benefit: 'Confiança no que você serve', items: ['Criado por nutricionistas especialistas em APLV.', 'Testado e aprovado por mais de 8.000 mães.', 'Balanceamento de macros e micros pensado para APLV.'] },
        { title: 'ACESSO VITALÍCIO', benefit: 'Um investimento para a vida toda', items: ['Seu para sempre. Pague uma vez, use por anos.', 'Recebe todas as atualizações futuras sem custo extra.'] },
    ],
    investment: {
        price: '35,90',
        anchorPrice: '97',
        justifications: [
          '1000 receitas com informação nutricional completa',
          'Organizadas por idade, tempo e refeição',
          'Inclui receitas de FESTA (seu filho nunca fica de fora)',
          'Guia SOS para agir rápido em reações',
          'Acesso vitalício por um pagamento único'
        ]
    },
    countdown: {
      minutes: 9,
      justification: "Após o fim do timer, o investimento volta para o valor padrão de R$ 97,00."
    },
    missionStatement: {
        title: "Por que este preço?",
        text: (<>Não é barato porque é ruim. É acessível porque eu ODEIO quando a solução só está disponível para quem pode pagar R$ 400 em uma consulta. Toda mãe merece ter tranquilidade, não apenas quem tem mais dinheiro.</>)
    },
    faq: [
      { question: "Como recebo o acesso?", answer: "Imediatamente por email após o pagamento. É um arquivo PDF que funciona em qualquer celular, tablet ou computador." },
      { question: "Funciona no celular?", answer: "Sim. O PDF foi desenhado para ser 100% legível e fácil de navegar na tela do celular, mesmo offline." },
      { question: "E se eu não gostar?", answer: "Você tem 7 dias de garantia incondicional. É só enviar um email e devolvemos 100% do valor, sem perguntas ou burocracia." }
    ],
    guarantee: {
      title: 'GARANTIA REFORÇADA PARA VOCÊ',
      text: (<>Nós sabemos que você já foi decepcionada. Por isso, nossa garantia é diferente. Se em 7 dias você não sentir que FINALMENTE encontrou a solução completa, devolvemos seu dinheiro e te damos R$50 no PIX pelo seu tempo perdido.</>),
      impact: "É isso mesmo. Nosso risco, seu ganho. Confiamos no que temos."
    },
  },
  'mae-racional-estrategica': {
    badgeText: 'MÃE RACIONAL ESTRATÉGICA',
    title: 'Você sabe que improvisar custa caro. Aqui está o sistema que sua lógica pedia.',
    subtitle: "Dados, não achismos. Um sistema com ROI comprovado para otimizar o tempo e o orçamento da sua família.",
    errors: [
      { title: 'Desperdício por falta de sistema', description: 'Você compra ingredientes caros que acabam estragando ou usa produtos que não são ideais, mas são os únicos que encontra.', consequence: 'Custo estimado: R$ 300/mês em compras ineficientes e desperdício.' },
      { title: 'Incerteza nutricional', description: 'Você até consegue fazer receitas seguras, mas não tem certeza se a dieta está balanceada em vitaminas e minerais para a idade dele.', consequence: 'Risco: Deficiências nutricionais que podem impactar o desenvolvimento a longo prazo.' },
      { title: 'Custo de oportunidade do tempo', description: 'Você gasta, em média, 4-5 horas por semana pesquisando receitas e planejando o que cozinhar.', consequence: 'Custo: Seu tempo vale dinheiro. Essas são horas que você poderia estar com sua família ou trabalhando.' },
    ],
    transitionCopy: {
        title: "A SOLUÇÃO É UM SISTEMA, NÃO UM 'JEITINHO'.",
        text: "Esses custos e riscos são o resultado direto da falta de um sistema de informação estruturada. O método abaixo não é sobre 'dicas', é sobre um processo validado que elimina essas três falhas de forma mensurável."
    },
    solutionTitle: 'O que você recebe:',
    solutionSections: [
        { title: 'BANCO DE DADOS COM 1000 RECEITAS', benefit: 'Eficiência e variedade', items: ['PDF otimizado com filtros inteligentes.', 'Busca por ingrediente, tempo de preparo e idade.', 'Funciona 100% offline no seu celular.'] },
        { title: 'DASHBOARD NUTRICIONAL', benefit: 'Decisões baseadas em dados', items: ['Informação nutricional completa para cada receita.', 'Calorias, proteínas, carboidratos e gorduras.', 'Garante uma dieta balanceada sem achismos.'] },
        { title: 'MÓDULOS DE OTIMIZAÇÃO', benefit: 'ROI de tempo e dinheiro', items: ['Listas de compra semanais para evitar desperdício.', 'Protocolo SOS para gerenciar crises sem pânico.'] },
    ],
    investment: {
        price: '35,90',
        anchorPrice: '97',
        justifications: [
          '1000 receitas com informação nutricional completa',
          'Organizadas por idade, tempo e refeição',
          'Inclui receitas de FESTA (seu filho nunca fica de fora)',
          'Guia SOS para agir rápido em reações',
          'Acesso vitalício por um pagamento único'
        ]
    },
    countdown: {
      minutes: 11,
      justification: "Após o fim do timer, o investimento volta para o valor padrão de R$ 97,00."
    },
    missionStatement: {
        title: "Um ROI Imediato",
        text: "O cálculo é simples: o custo mensal com produtos APLV industrializados varia de R$ 300 a R$ 500. Este sistema custa R$ 35,90, uma única vez. Ele se paga em menos de uma semana de economia no supermercado."
    },
    faq: [
      { question: "Como recebo o acesso?", answer: "Imediatamente por email após o pagamento. É um arquivo PDF que funciona em qualquer celular, tablet ou computador." },
      { question: "Funciona no celular?", answer: "Sim. O PDF foi desenhado para ser 100% legível e fácil de navegar na tela do celular, mesmo offline." },
      { question: "E se eu não gostar?", answer: "Você tem 7 dias de garantia incondicional. É só enviar um email e devolvemos 100% do valor, sem perguntas ou burocracia." }
    ],
    guarantee: {
      title: 'GARANTIA DE PERFORMANCE',
      text: "Nossa garantia é baseada em performance. Se em 7 dias o sistema não otimizar seu tempo e seu orçamento de forma clara, devolvemos 100% do seu investimento. Sem burocracia.",
      impact: "É uma decisão lógica: ou o sistema entrega o resultado prometido, ou ele sai de graça."
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
    <div className={cn('min-h-screen font-body', theme.bg)}>
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
                <h3 className={cn("text-xl font-bold font-poppins mb-2", theme.text)}>{pageData.transitionCopy.title}</h3>
                <div className="text-base text-gray-700 leading-relaxed space-y-3">{pageData.transitionCopy.text}</div>
            </div>
        </section>

        <section className="py-8 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
              <div className={cn("p-8 text-white rounded-t-2xl text-center", theme.gradient)}>
                  <p className="text-xl md:text-2xl font-bold font-poppins">Cardápio sem Leite da Mãe Prevenida</p>
                  <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 font-poppins mt-2">
                    <Gift className="h-9 w-9"/>{pageData.solutionTitle}
                  </h2>
              </div>
              <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50 p-6", theme.border)}>
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
                      </div>
                  ))}
              </div>
              <div
                className={cn("bg-white border-2 rounded-b-2xl p-6 md:p-8 shadow-2xl max-w-md mx-auto ring-4 ring-offset-4", theme.border, "ring-" + theme.border.replace('border-', ''))}
              >
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <p className="font-bold text-gray-900 mb-3 text-base font-poppins">O que você recebe:</p>
                    <ul className="space-y-2">
                      {pageData.investment.justifications.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center items-baseline gap-2 mb-1">
                      <span className="text-sm uppercase text-gray-400 tracking-wide font-poppins">DE</span>
                      <span className="text-2xl font-bold text-gray-400 line-through decoration-red-500 decoration-2">
                        R$ {pageData.investment.anchorPrice}
                      </span>
                    </div>
                    
                    <p className="text-sm uppercase text-gray-500 tracking-wide mb-1 font-poppins">POR APENAS</p>
                    
                    <div className={cn("font-black leading-none font-poppins", theme.text)}>
                      <span className="text-4xl md:text-5xl align-super mr-1">R$</span>
                      <span className="text-7xl md:text-8xl">{pageData.investment.price}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-2">
                      (R$ {dailyPrice} por dia em um período de 30 dias)
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
        </section>

        <div className="bg-gray-50 py-8 px-4">
          <div className="max-w-2xl mx-auto space-y-8">
              

               <section className="text-center bg-gradient-to-br from-red-200 to-orange-200 border-2 border-red-300 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl md:text-2xl font-bold text-red-700 font-poppins">⏰ PREÇO PROMOCIONAL POR TEMPO LIMITADO</h3>
                   <p className="text-red-800 mt-2">{pageData.countdown.justification}</p>
                  <div className="mt-4">
                      <CountdownTimer initialMinutes={pageData.countdown.minutes} />
                  </div>
              </section>

              <section className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-200">
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

    