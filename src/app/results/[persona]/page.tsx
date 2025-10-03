'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Gift, X, Star, Zap } from 'lucide-react';
import CountdownTimer from '@/components/results/CountdownTimer';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ResultPageProps {
    persona: string;
    theme: string;
    badgeText: string;
    title: React.ReactNode;
    errors: { title: string; description: string }[];
    solutionTitle: string;
    solutionSections: { title: string; items: string[], details?: string[] }[];
    countdownMinutes: number;
    investmentText: string;
    investmentReason: React.ReactNode;
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
    errors: [
      { title: 'Confiar em rótulos "sem lactose" que ainda contêm leite.', description: '73% têm traços de leite escondidos' },
      { title: 'Repetir as mesmas 3 receitas por medo de errar e causar reações.', description: 'Seu filho vira experimento' },
      { title: 'Acreditar que "só um pouquinho" não vai fazer mal.', description: 'Seu filho enjoa, você se desespera' },
    ],
    solutionTitle: 'O CARDÁPIO SEM LEITE DA MÃE PREVENIDA',
    solutionSections: [
        { title: '✅ 1000 RECEITAS TESTADAS organizadas por:', items: ['Idade (6 meses a 18+ anos)', 'Refeição (café, lanche, almoço, jantar, sobremesa)', 'Tempo de preparo (5min a 60min)', 'Dificuldade (fácil, média, avançada)'], details: ['Calorias (kcal)', 'Proteínas, carboidratos, gorduras', 'Passo a passo detalhado', 'Ingredientes exatos'] },
        { title: '✅ RECEITAS DE FESTA', items: ['Bolos de aniversário', 'Docinhos', 'Salgados', 'Para seu filho nunca ficar de fora'] },
        { title: '✅ GUIA SOS REAÇÃO', items: ['O que fazer se acontecer reação', 'Quando ir ao médico', 'Como identificar gatilhos'] }
    ],
    countdownMinutes: 14,
    investmentText: 'R$ 97',
    investmentReason: (<> <p className="font-bold text-lg mb-2">Por que vale a pena?</p> <ul className='text-left space-y-1'><li className='flex items-center'><Zap className='inline-block mr-2 h-4 w-4 text-primary' />R$ 97 uma vez vs R$ 800/mês produtos errados</li><li className='flex items-center'><Zap className='inline-block mr-2 h-4 w-4 text-primary' />1000 receitas = R$ 0,10 por receita</li><li className='flex items-center'><Zap className='inline-block mr-2 h-4 w-4 text-primary' />Economia de 6 meses de sofrimento</li></ul></>),
    ctaButton: { text: 'QUERO AS 1000 RECEITAS AGORA' },
    ctaSubtitle: 'Acesso imediato • Pagamento seguro • Garantia total',
    guaranteeTitle: 'GARANTIA INCONDICIONAL DE 7 DIAS',
    guaranteeText: (<><p className="mb-4">Nós sabemos o MEDO que você sente antes de investir em algo novo para o seu filho. Por isso: Teste o Cardápio Sem Leite por 7 dias inteiros.</p><ul className="space-y-2 text-left mb-4"><li>Não eliminou suas dúvidas?</li><li>Não se sentiu mais segura?</li><li>Não encontrou receitas que funcionaram?</li><li>Simplesmente mudou de ideia?</li></ul><p className="font-bold">Devolvemos 100% do seu dinheiro. SEM perguntas. SEM burocracia. SEM julgamentos.</p></>),
    guaranteeImpact: "Você literalmente NÃO TEM NADA A PERDER. Só tem a GANHAR paz de espírito."
  },
  'mae-guerreira-esgotada': {
    badgeText: 'MÃE GUERREIRA ESGOTADA',
    title: 'Você já lutou demais sozinha. Cada dia que passa, a culpa só cresce...',
    errors: [
      { title: 'Falta de variedade estratégica', description: 'Sempre as mesmas receitas porque não conhece outras' },
      { title: 'Não ter receitas rápidas catalogadas', description: 'Improvisa quando está sem tempo' },
      { title: 'Festas sem solução pronta', description: 'Seu filho fica triste ou você se estressa preparando' },
    ],
    solutionTitle: 'O CARDÁPIO SEM LEITE - 1000 RECEITAS',
    solutionSections: [
        { title: '📂 ORGANIZAÇÃO INTELIGENTE', items: ['Café da manhã (120 opções)', 'Lanches escolares (200 opções)', 'Almoços (250 opções)', 'Jantares (180 opções)', 'Sobremesas (100 opções)', 'Festas (150 opções)']},
        { title: '⏱️ FILTRO POR TEMPO', items: ['Rápidas: 5-15min (340 receitas)', 'Médias: 15-30min (450 receitas)', 'Elaboradas: 30-60min (210 receitas)'] },
        { title: '📊 INFORMAÇÃO NUTRICIONAL', items: [], details: ['Kcal por porção', 'Proteínas, carboidratos, gorduras', 'Para você planejar refeições balanceadas'] },
        { title: '🆘 GUIA SOS REAÇÃO', items: ['Protocolo completo para você agir rápido se necessário'] },
    ],
    countdownMinutes: 11,
    investmentText: 'R$ 97',
    investmentReason: <p className='font-bold'>ROI: Você economiza R$ 300-500/mês não comprando produtos errados ou jogando comida fora.</p>,
    ctaButton: { text: 'QUERO VARIEDADE INFINITA AGORA' },
    ctaSubtitle: 'Risco zero. Retorno comprovado.',
    guaranteeTitle: 'GARANTIA SEM ENROLAÇÃO - 7 DIAS',
    guaranteeText: (<><p className="mb-4">Nós entregamos resultados. E sabemos disso. Por isso oferecemos garantia INCONDICIONAL:</p><ul className="space-y-2 text-left mb-4"><li><X className="inline-block text-destructive mr-2 h-5 w-5"/>Não achou as receitas práticas o suficiente?</li><li><X className="inline-block text-destructive mr-2 h-5 w-5"/>Não resolveu seu problema de variedade?</li><li><X className="inline-block text-destructive mr-2 h-5 w-5"/>Não economizou tempo como esperava?</li><li><X className="inline-block text-destructive mr-2 h-5 w-5"/>Qualquer motivo?</li></ul><p className="font-bold">→ 100% do dinheiro de volta. Sem questionário.</p></>),
    guaranteeImpact: "Simples assim. Você testa, decide, pronto. Zero risco. Só benefícios."
  },
  'mae-desacreditada-ao-extremo': {
    badgeText: 'MÃE DESACREDITADA AO EXTREMO',
    title: (q7:string) => {
        return `Eu sei... você já tentou TUDO. Mas e se DESTA VEZ for diferente?`;
    },
    errors: [
      { title: 'Ter receitas espalhadas (caderno, WhatsApp, Google)', description: 'Perde tempo procurando' },
      { title: 'Receitas sem info nutricional', description: 'Não sabe se está balanceado' },
      { title: 'Achar que "já viu tudo"', description: 'Das 1000 receitas, 850+ você nunca viu' },
    ],
    solutionTitle: 'O QUE VOCÊ NUNCA TEVE - O CARDÁPIO COMPLETO',
    solutionSections: [
        { title: '✅ 1000 RECEITAS EM UM SÓ LUGAR', items: ['Organizadas por idade, refeição, tempo', 'Com info nutricional completa (kcal + macros)', 'Para toda fase da vida do seu filho'] },
        { title: '✅ INCLUINDO FESTAS', items: ['150 receitas específicas para eventos', 'Seu filho nunca mais fica de fora'] },
        { title: '✅ ACESSO VITALÍCIO', items: ['Seu para sempre. Acesse de qualquer lugar, a qualquer hora'] },
    ],
    countdownMinutes: 9,
    investmentText: 'R$ 97',
    investmentReason: (q7:string) => {
      const moneySpentMap: { [key: string]: string } = { '0': "R$ 500", '1': "R$ 1.500", '2': "R$ 3.000", '3': "mais de R$ 3.000", '4': "rios de dinheiro" };
      const spent = moneySpentMap[q7] || "muito";
      return <p className="font-bold">R$ 97 (vs {spent} que você já gastou). Com garantia. Você literally NÃO TEM NADA A PERDER.</p>
    },
    ctaButton: { text: 'DAR UMA ÚLTIMA CHANCE' },
    ctaSubtitle: 'Risco zero. Retorno comprovado.',
    guaranteeTitle: 'GARANTIA REFORÇADA - 7 DIAS',
    guaranteeText: (<><p className="mb-4">Nós sabemos que você já foi decepcionada antes. Já confiou. Já investiu. Já se frustrou.</p><p className='font-bold mb-4'>Desta vez é DIFERENTE. E provamos:</p><p className='font-bold mb-4'>Garantia INCONDICIONAL de 7 dias completos.</p><ul className="space-y-2 text-left mb-4"><li>Não sentiu que FINALMENTE encontrou a solução completa?</li><li>Não viu diferença das outras coisas que tentou?</li><li>Ainda está cansada e sem respostas?</li><li>Simplesmente não se conectou com o material?</li></ul><p className='font-bold'>→ Devolução TOTAL. Sem perguntas. Sem constrangimento.</p></>),
    guaranteeImpact: "Dê uma última chance, com risco zero. Se não for a solução, seu dinheiro volta 100%."
  },
  'mae-racional-estrategica': {
    badgeText: 'MÃE RACIONAL ESTRATÉGICA',
    title: 'Você SABE que precisa de um sistema. Parar de improvisar está custando caro.',
    errors: [
      { title: 'Improvisar sem sistema', description: 'Custo estimado: R$ 800/mês em produtos errados' },
      { title: 'Receitas sem dados nutricionais', description: 'Custo: Incerteza sobre o balanço nutricional' },
      { title: 'Pagar por informação sistematizada', description: 'Custo: R$ 3.600/ano (nutri) vs R$ 97 (acesso vitalício)' },
    ],
    solutionTitle: 'O PRODUTO: O CARDÁPIO SEM LEITE',
    solutionSections: [
        { title: 'ESPECIFICAÇÕES TÉCNICAS', items: [], details: ['Calorias (kcal)', 'Proteínas (g)', 'Carboidratos (g)', 'Gorduras (g)', 'Tempo de preparo', 'Ingredientes quantificados'] },
        { title: 'ORGANIZAÇÃO', items: ['Por idade (6m a 18+ anos)', 'Por refeição (5 categorias)', 'Por tempo (3 níveis)', 'Por dificuldade (3 níveis)'] },
        { title: 'MÓDULOS', items: ['Seção Festa: 150 receitas para eventos sociais', 'Protocolo SOS: Guia de ação emergencial'] },
    ],
    countdownMinutes: 11,
    investmentText: '',
    investmentReason: (<div className='max-w-lg mx-auto'><h3 className="text-2xl font-bold mb-4 text-primary-dark">ANÁLISE CUSTO-BENEFÍCIO</h3><Table>
            <TableHeader><TableRow><TableHead className='font-bold'>OPÇÃO</TableHead><TableHead className='font-bold text-center'>CUSTO/ANO</TableHead><TableHead className='font-bold text-center'>RECEITAS</TableHead></TableRow></TableHeader>
            <TableBody>
                <TableRow><TableCell>Nutricionista</TableCell><TableCell className='text-center'>R$ 3.600</TableCell><TableCell className='text-center'>~30</TableCell></TableRow>
                <TableRow><TableCell>Produtos Prontos</TableCell><TableCell className='text-center'>R$ 4.800</TableCell><TableCell className='text-center'>-</TableCell></TableRow>
                <TableRow className="bg-primary-light"><TableCell className="font-bold text-primary-dark">ESTE SISTEMA</TableCell><TableCell className="font-bold text-primary-dark text-center">R$ 97</TableCell><TableCell className="font-bold text-primary-dark text-center">1000</TableCell></TableRow>
            </TableBody>
        </Table><p className='mt-4 font-semibold text-lg'>Decisão lógica: Este sistema.</p></div>),
    ctaButton: { text: 'ADQUIRIR SISTEMA' },
    ctaSubtitle: 'Risco zero. Retorno comprovado.',
    guaranteeTitle: 'GARANTIA DE PERFORMANCE',
    guaranteeText: "",
    guaranteeImpact: "7 dias. ROI negativo? Devolução total."
  },
};

const personaThemes: Record<string, string> = {
  'mae-em-panico-inicial': 'theme-iniciante',
  'mae-guerreira-esgotada': 'theme-estrategista',
  'mae-desacreditada-ao-extremo': 'theme-veterana',
  'mae-racional-estrategica': 'theme-racional',
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 }}};
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 }}};

const StarRating = () => (
  <div className="flex justify-center gap-1 text-star">
    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5" fill="currentColor" />)}
  </div>
);

export default function PersonaResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const persona = params.persona as string;
  
  const pageData = pagesData[persona as keyof typeof pagesData];
  const themeClass = personaThemes[persona] || 'theme-iniciante';

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(themeClass);
    return () => {
      document.body.classList.remove(themeClass);
    };
  }, [themeClass]);

  if (!pageData) {
    return <div className="text-center py-10">Resultado não encontrado. Por favor, refaça o quiz.</div>;
  }
  
  const q7 = searchParams.get('q7') || '0';
  const finalTitle = typeof pageData.title === 'function' ? pageData.title(q7) : pageData.title;
  const finalInvestmentReason = typeof pageData.investmentReason === 'function' ? pageData.investmentReason(q7) : pageData.investmentReason;

  return (
    <motion.div 
      className="bg-background-light"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="bg-background-light" ref={
        (el) => {
          // workaround for a bug in framer-motion
          if (!el) return;
          el.style.opacity = '1';
        }
      }>
        <motion.header
          variants={itemVariants}
          className="text-center py-12 px-6 md:px-10 bg-gradient-to-b from-primary-light/50 to-background-light"
        >
          <motion.div
              variants={itemVariants}
              className="inline-block bg-primary text-primary-foreground text-sm font-bold py-3 px-6 rounded-lg shadow-md mb-4"
          >
            🎯 SEU DIAGNÓSTICO: {pageData.badgeText}
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark uppercase tracking-tight !leading-tight font-headline">
            {finalTitle}
          </h1>
        </motion.header>
        <div className="h-px bg-border"></div>
        
        <motion.section variants={itemVariants} className="py-10 px-6 bg-background">
          <div className="max-w-3xl mx-auto">
              <div className="p-6 md:p-8 bg-destructive-light border-l-4 border-destructive text-destructive-dark mb-8 rounded-r-lg">
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center"><X className="h-7 w-7 mr-3 flex-shrink-0"/> OS 3 ERROS QUE VOCÊ ESTÁ COMETENDO:</h2>
              </div>
              <div className="space-y-5">
              {pageData.errors.map((error, index) => (
                  <motion.div 
                      key={index}
                      variants={itemVariants}
                      className="bg-background border-2 border-red-100 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
                  >
                      <div className="flex items-start">
                        <X className="h-6 w-6 text-destructive mr-3 mt-1 flex-shrink-0"/>
                        <div>
                          <p className="text-lg font-bold text-foreground">
                              ERRO #{index + 1}: {error.title}
                          </p>
                          <p className="text-base text-foreground-secondary mt-1">→ {error.description}</p>
                        </div>
                      </div>
                  </motion.div>
              ))}
              </div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="py-10 px-6 bg-background-light">
          <div className="max-w-4xl mx-auto">
              <div className="p-8 md:p-10 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground rounded-t-2xl text-center">
                  <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center"><Gift className="h-9 w-9 mr-3"/>{pageData.solutionTitle}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-background p-6 rounded-b-2xl border-x-2 border-b-2 border-primary-light">
                  {pageData.solutionSections.map((section, index) => (
                      <motion.div key={index} variants={itemVariants} className={cn(
                          "p-6 bg-background rounded-xl border-2 border-primary-light shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all",
                          index === 0 && "md:col-span-2 lg:col-span-1 border-l-4 border-l-primary"
                      )}>
                          <h4 className="font-bold text-lg text-primary-dark mb-2 flex items-center">{section.title}</h4>
                          {section.items.length > 0 && 
                              <ul className="space-y-2 text-foreground-secondary">
                                  {section.items.map((item, i) => <li key={i} className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" /><span>{item}</span></li>)}
                              </ul>
                          }
                          {section.details && section.details.length > 0 && (
                              <div className={cn(section.items.length > 0 && "mt-4 border-t pt-4")}>
                                  <h5 className="font-semibold text-foreground">📊 Cada receita inclui:</h5>
                                  <ul className="mt-2 space-y-1 text-sm text-foreground-secondary">
                                      {section.details.map((detail, i) => <li key={i} className="flex items-center"><Zap className="h-4 w-4 text-primary/70 mr-2 flex-shrink-0" />{detail}</li>)}
                                  </ul>
                              </div>
                          )}
                      </motion.div>
                  ))}
              </div>
          </div>
        </motion.section>

        <div className="bg-background py-10 px-6">
          <div className="max-w-2xl mx-auto space-y-8">
              <motion.section variants={itemVariants} className="text-center bg-destructive-light border-2 border-red-200 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl md:text-2xl font-bold text-destructive-dark">⏰ OFERTA POR TEMPO LIMITADO</h3>
                  <div className="mt-4">
                    <div className="text-2xl md:text-3xl font-bold text-destructive-dark">
                        <CountdownTimer initialMinutes={pageData.countdownMinutes} />
                    </div>
                  </div>
              </motion.section>

              {pageData.investmentText &&
              <motion.section variants={itemVariants} className="text-center bg-gradient-to-b from-primary-light/30 to-background p-8 border-2 border-primary rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold text-foreground mb-2">💰 INVESTIMENTO</h3>
                  <p className="text-5xl md:text-7xl font-black text-primary-dark">{pageData.investmentText}</p>
                  <div className="mt-4 text-foreground-secondary max-w-xl mx-auto">{finalInvestmentReason}</div>
              </motion.section>}
              {!pageData.investmentText && <motion.section variants={itemVariants}>{finalInvestmentReason}</motion.section>}

              <motion.section variants={itemVariants} className="text-center">
                  <button
                      onClick={() => {
                          // TODO: add link to checkout
                      }}
                      className={cn(
                      'w-full max-w-lg mx-auto text-center text-xl md:text-2xl font-bold uppercase text-primary-foreground py-5 px-8 rounded-xl shadow-2xl transition-all duration-300',
                      'bg-gradient-to-r from-primary to-primary-dark',
                      'hover:shadow-[0_10px_30px_hsla(var(--primary),0.4)] hover:-translate-y-1',
                      'animate-pulse'
                  )}>
                      <Check className="inline-block h-7 w-7 mr-2"/>
                      {pageData.ctaButton.text}
                  </button>
                  <p className="mt-3 text-sm text-foreground-secondary">{pageData.ctaSubtitle}</p>
              </motion.section>

              <motion.section variants={itemVariants} className="text-center bg-background p-8 rounded-2xl border-2 border-primary shadow-md">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-2"/>
                  <h3 className="text-xl md:text-2xl font-bold text-primary-dark mb-1">{pageData.guaranteeTitle}</h3>
                  <div className="text-foreground-secondary leading-relaxed space-y-3">{pageData.guaranteeText}</div>
                  <div className="mt-4 p-4 bg-primary-light rounded-lg font-bold text-primary-dark">
                      {pageData.guaranteeImpact}
                  </div>
              </motion.section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
