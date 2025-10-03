'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import CountdownTimer from '@/components/results/CountdownTimer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
      delayChildren: 0.3,
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

const pagesData = {
  'mae-iniciante-insegura': {
    badgeText: 'MÃE INICIANTE INSEGURA',
    socialProof: '8.243 mães saíram do pânico que você está sentindo',
    title: 'Você está no início. Cada refeição é um campo minado. Pesquisa sem parar mas fica mais confusa.',
    errors: [
      {
        title: 'Confiar em receitas "sem lactose" aleatórias',
        description: '73% têm traços de leite escondidos',
      },
      {
        title: 'Testar receitas sem saber se são seguras',
        description: 'Seu filho vira experimento',
      },
      {
        title: 'Não ter variedade (sempre as mesmas 3 receitas)',
        description: 'Seu filho enjoa, você se desespera',
      },
    ],
    testimonial: {
      text: 'Tinha 3 receitas. Passava mal de ansiedade. Com as 1000 receitas do Cardápio, já fiz 47 receitas diferentes. Meu filho come FELIZ.',
      author: 'Ana Paula, SP (filho 16 meses)',
    },
    solutionTitle: 'O CARDÁPIO SEM LEITE DA MÃE PREVENIDA',
    solutionSections: [
        {
            title: '✅ 1000 RECEITAS TESTADAS organizadas por:',
            items: [
                'Idade (6 meses a 18+ anos)',
                'Refeição (café, lanche, almoço, jantar, sobremesa)',
                'Tempo de preparo (5min a 60min)',
                'Dificuldade (fácil, média, avançada)',
            ],
            details: [
                'Calorias (kcal)',
                'Proteínas, carboidratos, gorduras',
                'Passo a passo detalhado',
                'Ingredientes exatos',
            ]
        },
        {
            title: '✅ RECEITAS DE FESTA',
            items: ['Bolos de aniversário', 'Docinhos', 'Salgados', 'Para seu filho nunca ficar de fora']
        },
        {
            title: '✅ GUIA SOS REAÇÃO',
            items: ['O que fazer se acontecer reação', 'Quando ir ao médico', 'Como identificar gatilhos']
        }
    ],
    investmentText: 'R$ 97',
    investmentReason: (
      <div className="text-left max-w-md mx-auto space-y-1">
        <p className="font-bold text-center">Por que vale a pena?</p>
        <p>→ R$ 97 uma vez vs R$ 800/mês produtos errados</p>
        <p>→ 1000 receitas = R$ 0,10 por receita</p>
        <p>→ Economia de 6 meses de sofrimento</p>
      </div>
    ),
    offerRemainingText: 'Restam 23 acessos com desconto hoje',
    countdownMinutes: 14,
    guaranteeText: (
      <p>
        Teste por 7 dias. Se não eliminar 80% das suas dúvidas, devolvemos 100%
        do valor. Sem perguntas.
      </p>
    ),
    ctaButton: {
      text: '✅ QUERO AS 1000 RECEITAS AGORA',
      className: 'bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white',
    },
    ctaSubtitle: 'Acesso imediato • Pagamento seguro • Garantia total',
  },
  'mae-estrategista-pratica': {
    badgeText: 'MÃE ESTRATEGISTA PRÁTICA',
    socialProof: 'Você precisa de VARIEDADE, não mais improviso',
    title: 'Você já sabe o básico. Tem 8-10 receitas que funcionam. Mas seu filho enjoou. Lancheira sempre igual. Festas são difíceis.',
    errors: [
      {
        title: 'Falta de variedade estratégica',
        description: 'Sempre as mesmas receitas porque não conhece outras',
      },
      {
        title: 'Não ter receitas rápidas catalogadas',
        description: 'Improvisa quando está sem tempo',
      },
      {
        title: 'Festas sem solução pronta',
        description: 'Seu filho fica triste ou você se estressa preparando',
      },
    ],
    testimonial: {
      text: 'Tinha 12 receitas. Minha filha enjoou de TODAS. Com 1000 opções organizadas por tempo e dificuldade, nunca mais repeti. Lancheira diferente TODO DIA.',
      author: 'Fernanda, RJ (filha 6 anos)',
    },
    solutionTitle: 'O CARDÁPIO SEM LEITE - 1000 RECEITAS',
    solutionSections: [
        {
            title: '✅ ORGANIZAÇÃO INTELIGENTE:',
            items: [],
            details: [
                'Kcal por porção',
                'Proteínas, carboidratos, gorduras',
                'Para você planejar refeições balanceadas'
            ]
        },
        { title: '📂 Por categoria:', items: ['Café da manhã (120 opções)', 'Lanches escolares (200 opções)', 'Almoços (250 opções)', 'Jantares (180 opções)', 'Sobremesas (100 opções)', 'Festas (150 opções)'] },
        { title: '⏱️ Por tempo:', items: ['Rápidas: 5-15min (340 receitas)', 'Médias: 15-30min (450 receitas)', 'Elaboradas: 30-60min (210 receitas)'] },
        { title: '🎉 RECEITAS DE FESTA separadas:', items: ['Nunca mais improvise em aniversários', 'Seu filho participa igual todo mundo'] },
        { title: '🆘 GUIA SOS REAÇÃO:', items: ['Protocolo completo', 'Para você agir rápido se necessário'] },
    ],
    investmentText: 'R$ 97',
    investmentReason: (
      <>
        <p className="font-bold">ROI: Você economiza R$ 300-500/mês não comprando produtos errados ou jogando comida fora.</p>
      </>
    ),
    offerRemainingText: '18 acessos restantes hoje',
    countdownMinutes: 11,
    guaranteeText: (
      <p>
        Teste. Se não encontrar pelo menos 50 receitas novas que você ame, devolução total.
      </p>
    ),
    ctaButton: {
      text: '✅ QUERO VARIEDADE INFINITA AGORA',
      className: 'bg-[#FF9800] hover:bg-[#FF9800]/90 text-white',
    },
    ctaSubtitle: 'Risco zero. Retorno comprovado.',
  },
  'mae-veterana-cansada': {
    badgeText: 'MÃE VETERANA CANSADA',
    socialProof: 'Você já tentou muito. Mas nunca teve TUDO em um só lugar',
    title: (q7:string) => {
        const moneySpentMap: { [key: string]: string } = {
            '0': "pelo menos R$ 500",
            '1': "entre R$ 500 e R$ 1.500",
            '2': "entre R$ 1.500 e R$ 3.000",
            '3': "mais de R$ 3.000",
            '4': "uma quantia que nem quer calcular",
        }
        const spent = moneySpentMap[q7] || "muito";
        return `Você já gastou ${spent}. Já tentou nutricionista, grupos, cursos. Ainda não resolveu. A verdade? Você teve PEDAÇOS. Nunca o mapa completo.`
    },
    errors: [
      {
        title: 'Ter receitas espalhadas (caderno, WhatsApp, Google)',
        description: 'Perde tempo procurando',
      },
      {
        title: 'Receitas sem info nutricional',
        description: 'Não sabe se está balanceado',
      },
      {
        title: 'Achar que "já viu tudo"',
        description: 'Das 1000 receitas, 850+ você nunca viu',
      },
    ],
    testimonial: {
      text: 'Gastei R$ 5.000 em 3 anos. NADA funcionou completamente. Este foi diferente: TUDO em um lugar. Organizado. Completo. Finalmente posso respirar.',
      author: 'Juliana, BH (filho 13 anos)',
    },
    solutionTitle: 'O QUE VOCÊ NUNCA TEVE - O CARDÁPIO SEM LEITE - COMPLETO',
    solutionSections: [
        { title: '✅ 1000 RECEITAS EM UM SÓ LUGAR', items: ['Organizadas por idade, refeição, tempo', 'Com info nutricional completa (kcal + macros)', 'Para toda fase da vida do seu filho'] },
        { title: '✅ INCLUINDO FESTAS', items: ['150 receitas específicas para eventos', 'Seu filho nunca mais fica de fora'] },
        { title: '✅ GUIA SOS REAÇÃO', items: ['Protocolo profissional', 'Para emergências'] },
        { title: '✅ ACESSO VITALÍCIO', items: ['Seu para sempre', 'Acesse de qualquer lugar'] },
    ],
    investmentText: 'R$ 97',
    investmentReason: (q7:string) => {
        const moneySpentMap: { [key: string]: string } = {
            '0': "R$ 500",
            '1': "R$ 1.500",
            '2': "R$ 3.000",
            '3': "mais de R$ 3.000",
            '4': "rios de dinheiro",
        }
        const spent = moneySpentMap[q7] || "muito";
        return <p className="font-bold">R$ 97 (vs {spent} que você já gastou). Com garantia de 7 dias. Você literalmente NÃO TEM NADA A PERDER.</p>
    },
    offerRemainingText: '15 vagas',
    countdownMinutes: 9,
    guaranteeText: (
      <p>
        7 dias para testar. Se não sentir que DESTA VEZ é diferente, devolução 100%. Zero risco.
      </p>
    ),
    ctaButton: {
      text: '✅ DAR UMA ÚLTIMA CHANCE',
      className: 'bg-[#F44336] hover:bg-[#F44336]/90 text-white animate-pulse',
    },
 ctaSubtitle: 'Risco zero. Retorno comprovado.',
  },
  'mae-racional-cientifica': {
    badgeText: 'MÃE RACIONAL CIENTÍFICA',
    socialProof: 'Você quer dados. Aqui estão.',
    title: (
        <div className="text-left max-w-md mx-auto">
            <p className="font-bold text-lg">OS NÚMEROS:</p>
            <ul className="list-disc list-inside ml-4">
                <li>1000 receitas catalogadas</li>
                <li>100% com informação nutricional (kcal + macros)</li>
                <li>12.347 clientes (98.2% satisfação)</li>
                <li>1.8% taxa devolução (muito abaixo da média 15%)</li>
            </ul>
             <p className="font-bold mt-4 text-lg">O ROI:</p>
            <ul className="list-disc list-inside ml-4">
                <li>Investimento: R$ 97</li>
                <li>Economia ano 1: R$ 3.600+ (vs nutricionista)</li>
                <li>ROI: 3.700%</li>
            </ul>
        </div>
    ),
    errors: [
      {
        title: 'Improvisar sem sistema',
        description: 'Custo: R$ 800/mês produtos errados',
      },
      {
        title: 'Receitas sem dados nutricionais',
        description: 'Custo: Não sabe se está balanceado',
      },
      {
        title: 'Pagar nutricionista por info sistematizada',
        description: 'Custo: R$ 3.600/ano vs R$ 97 uma vez',
      },
    ],
    testimonial: {
      text: 'Eu sou engenheira. Queria dados, não promessas. O sistema me entregou exatamente isso. ROI absurdo. Decisão mais inteligente que fiz pela alimentação do meu filho.',
      author: 'Patrícia, Curitiba (filho 4 anos)',
    },
    solutionTitle: 'O PRODUTO - O CARDÁPIO SEM LEITE',
    solutionSections: [
        {
            title: 'ESPECIFICAÇÕES TÉCNICAS:',
            items: [],
            details: [
                'Calorias (kcal)',
                'Proteínas (g)',
                'Carboidratos (g)',
                'Gorduras (g)',
                'Tempo de preparo',
                'Ingredientes quantificados'
            ]
        },
        { title: '📂 ORGANIZAÇÃO:', items: ['Por idade (6m a 18+ anos)', 'Por refeição (5 categorias)', 'Por tempo (3 níveis)', 'Por dificuldade (3 níveis)'] },
        { title: '🎉 SEÇÃO FESTA:', items: ['150 receitas eventos sociais'] },
        { title: '🆘 PROTOCOLO SOS:', items: ['Guia ação emergencial'] },
    ],
    investmentText: '',
    investmentReason: (
        <div className='max-w-lg mx-auto'>
        <h3 className="text-xl md:text-2xl font-headline font-bold mb-4">ANÁLISE CUSTO-BENEFÍCIO</h3>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='font-bold'>OPÇÃO</TableHead>
                    <TableHead className='font-bold'>CUSTO/ANO</TableHead>
                    <TableHead className='font-bold'>RECEITAS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Nutricionista</TableCell>
                    <TableCell>R$ 3.600</TableCell>
                    <TableCell>20-30</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Produtos Prontos</TableCell>
                    <TableCell>R$ 4.800</TableCell>
                    <TableCell>-</TableCell>
                </TableRow>
                <TableRow className="bg-primary/10">
                    <TableCell className="font-bold text-primary">ESTE SISTEMA</TableCell>
                    <TableCell className="font-bold text-primary">R$ 97</TableCell>
                    <TableCell className="font-bold text-primary">1000</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <p className='mt-2 font-semibold'>Decisão lógica: Este sistema.</p>
        </div>
    ),
    offerRemainingText: 'Válida',
    countdownMinutes: 11,
    guaranteeText: <p>7 dias. ROI negativo? Devolução total.</p>,
    ctaButton: {
      text: '✅ ADQUIRIR AGORA',
      className: 'bg-[#2196F3] hover:bg-[#2196F3]/90 text-white',
    },
    ctaSubtitle: 'Risco zero. Retorno comprovado.',
  },
};


function ResultPageContent({
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
            <motion.div key={index} variants={itemVariants} className="p-4 rounded-lg bg-card border border-destructive/20 shadow-sm">
              <p className="font-bold text-destructive">ERRO #{index + 1}: {error.title}</p>
              <p className="text-foreground/80 mt-1">→ {error.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      <motion.hr variants={itemVariants} className="border-border border-dashed my-8" />

      <motion.section variants={itemVariants} className="mb-10 text-center bg-card p-6 rounded-lg border shadow-sm">
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
                <motion.div key={index} variants={itemVariants} className="p-4 rounded-lg bg-card border shadow-sm">
                    <h4 className="font-bold text-lg text-primary">{section.title}</h4>
                    {section.items.length > 0 && 
                        <ul className="list-disc list-inside mt-2 space-y-1 text-foreground/90">
                            {section.items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    }
                    {section.details && section.details.length > 0 && (
                         <div className="mt-4 border-t pt-4">
                            <p className="font-semibold">{section.items.length > 0 ? '📊 Cada receita inclui:' : '📊 Informações:'}</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-foreground/80">
                                {section.details.map((detail, i) => <li key={i}>{detail}</li>)}
                            </ul>
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
      </motion.section>

      <motion.hr variants={itemVariants} className="border-border border-dashed my-8" />

      <motion.section variants={itemVariants} className="mb-10 text-center">
        {investmentText && <>
            <h3 className="text-xl md:text-2xl font-headline font-bold mb-4">💰 INVESTIMENTO</h3>
            <p className="text-5xl font-bold text-primary">{investmentText}</p>
        </>}
        <div className="mt-4 text-foreground/80 max-w-xl mx-auto">{investmentReason}</div>
      </motion.section>

      <motion.hr variants={itemVariants} className="border-border border-dashed my-8" />

      <motion.section variants={itemVariants} className="text-center bg-destructive/10 border border-destructive rounded-lg p-6 mb-10 shadow-lg">
        <h3 className="text-xl md:text-2xl font-headline font-bold text-destructive">⏰ OFERTA POR TEMPO LIMITADO</h3>
        <p className="text-lg mt-2">🔥 {offerRemainingText}</p>
        <p className="text-2xl font-bold mt-2">⏱️ Oferta expira em: <CountdownTimer initialMinutes={countdownMinutes} /></p>
      </motion.section>
      
      <motion.hr variants={itemVariants} className="border-border border-dashed my-8" />

      <motion.section variants={itemVariants} className="text-center bg-card p-6 rounded-lg border border-primary/50 mb-10 shadow-sm">
        <h3 className="text-xl md:text-2xl font-headline font-bold mb-4">🛡️ GARANTIA 7 DIAS</h3>
        <div className="text-foreground/90">{guaranteeText}</div>
      </motion.section>

      <motion.hr variants={itemVariants} className="border-border border-dashed my-8" />
      
      <motion.section variants={itemVariants} className="text-center">
        <Button size="lg" className={cn(`h-auto text-xl font-bold w-full md:w-auto py-4 px-8 shadow-lg transform transition-transform hover:scale-105`, ctaButton.className)}>
            {ctaButton.text}
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">{ctaSubtitle}</p>
      </motion.section>

    </motion.div>
  );
}


export default function PersonaResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const persona = params.persona as string;
  const pageData = pagesData[persona as keyof typeof pagesData];

  if (!pageData) {
    // This could redirect to a fallback page or show a generic error.
    return <div className="text-center py-10">Resultado não encontrado. Por favor, refaça o quiz.</div>;
  }
  
  const q7 = searchParams.get('q7') || '0';

  const finalTitle = typeof pageData.title === 'function' ? pageData.title(q7) : pageData.title;
  const finalInvestmentReason = typeof pageData.investmentReason === 'function' ? pageData.investmentReason(q7) : pageData.investmentReason;

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" variants={containerVariants}>
      <ResultPageContent
        {...pageData}
        title={finalTitle}
        investmentReason={finalInvestmentReason}
      />
    </motion.div>
  );
}