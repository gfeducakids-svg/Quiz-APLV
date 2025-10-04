
'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Gift, X, Zap, ArrowRight, Wallet } from 'lucide-react';
import CountdownTimer from '@/components/results/CountdownTimer';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface ResultPageProps {
    persona: string;
    theme: string;
    badgeText: string;
    title: React.ReactNode;
    socialProof: string;
    validationText: string;
    errors: { title: string; description: string }[];
    testimonial: { text: string; author: string; detail:string; };
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
    validationText: "Você está no início. Cada refeição é um campo minado. Pesquisa sem parar mas fica mais confusa.",
    errors: [
      { title: 'Confiar em rótulos "sem lactose" que ainda contêm leite.', description: '73% têm traços de leite escondidos' },
      { title: 'Repetir as mesmas 3 receitas por medo de errar e causar reações.', description: 'Seu filho enjoa, você se desespera' },
      { title: 'Acreditar que "só um pouquinho" não vai fazer mal.', description: 'Inflama o intestino e atrasa a cura' },
    ],
    testimonial: { text: 'Tinha 3 receitas. Passava mal de ansiedade. Com as 1000 receitas do Cardápio, já fiz 47 receitas diferentes. Meu filho come FELIZ.', author: 'Ana Paula, SP', detail: '(filho 16 meses)' },
    solutionTitle: 'O CARDÁPIO SEM LEITE DA MÃE PREVENIDA',
    solutionSections: [
        { title: '✅ 1000 RECEITAS TESTADAS organizadas por:', items: ['Idade (6 meses a 18+ anos)', 'Refeição (café, lanche, almoço, jantar, sobremesa)', 'Tempo de preparo (5min a 60min)', 'Dificuldade (fácil, média, avançada)'], details: ['Calorias (kcal)', 'Proteínas, carboidratos, gorduras', 'Passo a passo detalhado', 'Ingredientes exatos'] },
        { title: '✅ RECEITAS DE FESTA', items: ['Bolos de aniversário', 'Docinhos', 'Salgados', 'Para seu filho nunca ficar de fora'] },
        { title: '✅ GUIA SOS REAÇÃO', items: ['O que fazer se acontecer reação', 'Quando ir ao médico', 'Como identificar gatilhos'] }
    ],
    countdownMinutes: 14,
    investment: {
        price: '97',
        anchorPrice: '197',
        justifications: ['1000 receitas = R$ 0,10 cada', 'Paz de espírito não tem preço', 'Menos que 1 semana errando']
    },
    ctaButton: { text: 'QUERO AS 1000 RECEITAS AGORA' },
    ctaSubtitle: 'Acesso imediato • Pagamento seguro • Garantia total',
    guaranteeTitle: 'GARANTIA INCONDICIONAL',
    guaranteeText: (<><p className="mb-4">Nós sabemos o MEDO que você sente antes de investir em algo novo para o seu filho. Por isso: Teste o Cardápio Sem Leite por 7 dias inteiros.</p><ul className="space-y-2 text-left mb-4 list-none pl-0"><li>Não eliminou suas dúvidas?</li><li>Não se sentiu mais segura?</li><li>Não encontrou receitas que funcionaram?</li><li>Simplesmente mudou de ideia?</li></ul><p className="font-bold">Devolvemos 100% do seu dinheiro. SEM perguntas. SEM burocracia. SEM julgamentos.</p></>),
    guaranteeImpact: "Você literalmente NÃO TEM NADA A PERDER. Só tem a GANHAR paz de espírito."
  },
  'mae-guerreira-esgotada': {
    badgeText: 'MÃE GUERREIRA ESGOTADA',
    title: 'Você já lutou demais sozinha. Cada dia que passa, a culpa só cresce...',
    socialProof: 'Mais de 5.000 mães esgotadas como você hoje têm paz para alimentar seus filhos.',
    validationText: "Você está cansada de pensar, cansada de cozinhar, cansada de se preocupar. A energia está no fim.",
    errors: [
      { title: 'Falta de variedade estratégica', description: 'Sempre as mesmas receitas porque não conhece outras' },
      { title: 'Não ter receitas rápidas catalogadas', description: 'Improvisa quando está sem tempo' },
      { title: 'Festas sem solução pronta', description: 'Seu filho fica triste ou você se estressa preparando' },
    ],
    testimonial: { text: 'Meu filho enjoava de tudo. Eu chorava de frustração. Hoje, ele pede pra ver o cardápio e escolher! É inacreditável.', author: 'Juliana, MG', detail: '(filho 4 anos)' },
    solutionTitle: 'O CARDÁPIO SEM LEITE - 1000 RECEITAS',
    solutionSections: [
        { title: '📂 ORGANIZAÇÃO INTELIGENTE', items: ['Café da manhã (200 opções)', 'Lanches escolares (200 opções)', 'Almoços (200 opções)', 'Jantares (200 opções)', 'Sobremesas (200 opções)', 'Festas (200 opções)']},
        { title: '⏱️ FILTRO POR TEMPO', items: ['Rápidas: 5-15min (340 receitas)', 'Médias: 15-30min (450 receitas)', 'Elaboradas: 30-60min (210 receitas)'] },
        { title: '📊 INFORMAÇÃO NUTRICIONAL', items: [], details: ['Kcal por porção', 'Proteínas, carboidratos, gorduras', 'Para você planejar refeições balanceadas'] },
        { title: '🆘 GUIA SOS REAÇÃO', items: ['Protocolo completo para você agir rápido se necessário'] },
    ],
    countdownMinutes: 11,
    investment: {
        price: '97',
        anchorPrice: '197',
        justifications: ['1000 receitas = R$ 0,10 cada', 'Economiza R$ 300-500/mês', 'Retorno em menos de 1 semana']
    },
    ctaButton: { text: 'QUERO VARIEDADE INFINITA AGORA' },
    ctaSubtitle: 'Risco zero. Retorno comprovado.',
    guaranteeTitle: 'GARANTIA SEM ENROLAÇÃO',
    guaranteeText: (<><p className="mb-4">Nós entregamos resultados. E sabemos disso. Por isso oferecemos garantia INCONDICIONAL:</p><ul className="space-y-2 text-left mb-4 list-none pl-0"><li><X className="inline-block text-destructive mr-2 h-5 w-5"/>Não achou as receitas práticas o suficiente?</li><li><X className="inline-block text-destructive mr-2 h-5 w-5"/>Não resolveu seu problema de variedade?</li><li><X className="inline-block text-destructive mr-2 h-5 w-5"/>Não economizou tempo como esperava?</li><li><X className="inline-block text-destructive mr-2 h-5 w-5"/>Qualquer motivo?</li></ul><p className="font-bold">→ 100% do dinheiro de volta. Sem questionário.</p></>),
    guaranteeImpact: "Simples assim. Você testa, decide, pronto. Zero risco. Só benefícios."
  },
  'mae-desacreditada-ao-extremo': {
    badgeText: 'MÃE DESACREDITADA AO EXTREMO',
    title: `Eu sei... você já tentou TUDO. Mas e se DESTA VEZ for diferente?`,
    socialProof: 'Para as mães que, como você, já tinham perdido a esperança e hoje vivem uma nova realidade.',
    validationText: "Você já gastou, já tentou, já se frustrou. A confiança em novas soluções está no zero. É compreensível.",
    errors: [
      { title: 'Ter receitas espalhadas (caderno, WhatsApp, Google)', description: 'Perde tempo procurando' },
      { title: 'Receitas sem info nutricional', description: 'Não sabe se está balanceado' },
      { title: 'Achar que "já viu tudo"', description: 'Das 1000 receitas, 850+ você nunca viu' },
    ],
    testimonial: { text: 'Eu era a cética. "Mais um curso". Mas a garantia me pegou. E em 3 dias eu vi que era diferente. Organizado, completo. Hoje, eu recomendo de olhos fechados.', author: 'Carla, RJ', detail: '(filho 13 anos)' },
    solutionTitle: 'O QUE VOCÊ NUNCA TEVE - O CARDÁPIO COMPLETO',
    solutionSections: [
        { title: '✅ 1000 RECEITAS EM UM SÓ LUGAR', items: ['Organizadas por idade, refeição, tempo', 'Com info nutricional completa (kcal + macros)', 'Para toda fase da vida do seu filho'] },
        { title: '✅ INCLUINDO FESTAS', items: ['150 receitas específicas para eventos', 'Seu filho nunca mais fica de fora'] },
        { title: '✅ ACESSO VITALÍCIO', items: ['Seu para sempre. Acesse de qualquer lugar, a qualquer hora'] },
    ],
    countdownMinutes: 9,
    investment: {
        price: '97',
        anchorPrice: '197',
        justifications: ['R$ 97 vs <strong>R$ 3.000+</strong> que você já gastou', 'Tudo em um lugar, finalmente', 'Última chance de acertar']
    },
    ctaButton: { text: 'DAR UMA ÚLTIMA CHANCE' },
    ctaSubtitle: 'Risco zero. Retorno comprovado.',
    guaranteeTitle: 'GARANTIA REFORÇADA',
    guaranteeText: (<><p className="mb-4">Nós sabemos que você já foi decepcionada antes. Já confiou. Já investiu. Já se frustrou.</p><p className='font-bold mb-4'>Desta vez é DIFERENTE. E provamos:</p><p className='font-bold mb-4'>Garantia INCONDICIONAL de 7 dias completos.</p><ul className="space-y-2 text-left mb-4 list-none pl-0"><li>Não sentiu que FINALMENTE encontrou a solução completa?</li><li>Não viu diferença das outras coisas que tentou?</li><li>Ainda está cansada e sem respostas?</li><li>Simplesmente não se conectou com o material?</li></ul><p className='font-bold'>→ Devolução TOTAL. Sem perguntas. Sem constrangimento.</p></>),
    guaranteeImpact: "Dê uma última chance, com risco zero. Se não for a solução, seu dinheiro volta 100%."
  },
  'mae-racional-estrategica': {
    badgeText: 'MÃE RACIONAL ESTRATÉGICA',
    title: 'Você SABE que precisa de um sistema. Parar de improvisar está custando caro.',
    socialProof: 'Junte-se às mães que trocaram a incerteza por um sistema de alimentação com ROI comprovado.',
    validationText: "Você analisa dados, busca eficiência e sabe que um sistema otimizado é a chave para resolver problemas complexos. A aleatoriedade te incomoda.",
    errors: [
      { title: 'Improvisar sem sistema', description: 'Custo estimado: R$ 800/mês em produtos errados' },
      { title: 'Receitas sem dados nutricionais', description: 'Custo: Incerteza sobre o balanço nutricional' },
      { title: 'Pagar por informação sistematizada', description: 'Custo: R$ 3.600/ano (nutri) vs R$ 97 (acesso vitalício)' },
    ],
    testimonial: { text: 'Planilhas, apps... tentei de tudo. Nada se compara a ter 1000 receitas já catalogadas por tempo, kcal e refeição. O ROI foi imediato, só no tempo que economizei.', author: 'Fernanda, PR', detail: '(pai também usa o sistema)' },
    solutionTitle: 'O PRODUTO: O CARDÁPIO SEM LEITE',
    solutionSections: [
        { title: 'ESPECIFICAÇÕES TÉCNICAS', items: [], details: ['Calorias (kcal)', 'Proteínas (g)', 'Carboidratos (g)', 'Gorduras (g)', 'Tempo de preparo', 'Ingredientes quantificados'] },
        { title: 'ORGANIZAÇÃO', items: ['Por idade (6m a 18+ anos)', 'Por refeição (5 categorias)', 'Por tempo (3 níveis)', 'Por dificuldade (3 níveis)'] },
        { title: 'MÓDULOS', items: ['Seção Festa: 150 receitas para eventos sociais', 'Protocolo SOS: Guia de ação emergencial'] },
    ],
    countdownMinutes: 11,
    investment: {
        price: '97',
        anchorPrice: '197',
        justifications: ['1000 receitas = R$ 0,10 cada', 'Nutricionista: R$ 3.600/ano', 'Este sistema: R$ 97 vitalício']
    },
    ctaButton: { text: 'ADQUIRIR SISTEMA' },
    ctaSubtitle: 'Risco zero. Retorno comprovado.',
    guaranteeTitle: 'GARANTIA DE PERFORMANCE',
    guaranteeText: "7 dias. ROI negativo? Devolução total.",
    guaranteeImpact: "Se o sistema não se pagar em 7 dias, seu dinheiro volta. Simples assim."
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

export default function PersonaResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const persona = params.persona as string;
  
  const pageData = pagesData[persona as keyof typeof pagesData];
  const themeClass = personaThemes[persona] || 'theme-iniciante';

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add('bg-background-light');
    document.body.classList.add(themeClass);
    return () => {
      document.body.classList.remove(themeClass);
      document.body.classList.remove('bg-background-light');
    };
  }, [themeClass]);

  if (!pageData) {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
        <h1 className="text-3xl font-bold text-destructive mb-4">Resultado não encontrado</h1>
        <p className="text-lg text-foreground-secondary mb-8">Ocorreu um erro ao calcular seu perfil. Por favor, tente refazer o quiz.</p>
        <a href="/quiz" className="bg-primary text-primary-foreground py-2 px-6 rounded-lg font-semibold">
          Refazer Quiz
        </a>
      </div>
    );
  }
  
  const q7 = searchParams.get('q7') || '0';
  const finalTitle = typeof pageData.title === 'function' ? pageData.title(q7) : pageData.title;

  return (
    <motion.div 
      className="bg-background-light"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div ref={
        (el) => {
          if (!el) return;
          if (el.style.opacity === '0') {
            el.style.opacity = '1';
          }
        }
      }>
        <motion.header
          variants={itemVariants}
          className="text-center py-12 px-6 md:px-10 bg-gradient-to-b from-primary-light/50 to-background-light"
        >
          <motion.div
              variants={itemVariants}
              className="inline-block bg-primary text-primary-foreground text-sm font-bold py-3 px-6 rounded-lg shadow-md mb-6"
              style={{ boxShadow: '0 4px 6px hsla(var(--primary), 0.1)' }}
          >
            🎯 SEU DIAGNÓSTICO: {pageData.badgeText}
          </motion.div>
          <h1 className="text-3xl md:text-[36px] font-bold text-primary-dark uppercase tracking-tight !leading-tight font-headline max-w-3xl mx-auto">
            {finalTitle}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-foreground-secondary italic max-w-2xl mx-auto">
            &ldquo;{pageData.socialProof}&rdquo;
          </p>
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
                        <X className="h-6 w-6 text-destructive mr-4 mt-1 flex-shrink-0"/>
                        <div>
                          <p className="text-lg font-bold text-foreground">
                              ERRO #{index + 1}: {error.title}
                          </p>
                          <p className="text-base text-foreground-secondary mt-1"><ArrowRight className="inline h-4 w-4 mr-1 text-destructive" /> {error.description}</p>
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
                          <h4 className="font-bold text-lg text-primary-dark mb-3 flex items-center">{section.title}</h4>
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
              <motion.section variants={itemVariants} className="text-center bg-destructive-light/60 border-2 border-destructive/30 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl md:text-2xl font-bold text-destructive-dark">⏰ OFERTA POR TEMPO LIMITADO</h3>
                  <div className="mt-4">
                    <div className="text-2xl md:text-3xl font-bold text-destructive-dark">
                        <CountdownTimer initialMinutes={pageData.countdownMinutes} />
                    </div>
                  </div>
              </motion.section>
              
              <motion.div
                variants={itemVariants}
                className="space-y-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
              >
                <div
                  className="bg-gradient-to-b from-primary-light to-white border-2 border-primary rounded-2xl p-6 md:p-8 max-w-md mx-auto shadow-xl"
                  style={{ boxShadow: '0 8px 24px hsla(var(--primary), 0.15)' }}
                >
                  <div className="flex justify-center items-baseline gap-2 mb-3">
                    <span className="text-sm font-medium uppercase text-foreground-secondary tracking-wide">
                      DE
                    </span>
                    <span className="text-2xl font-bold text-gray-400 line-through decoration-red-500 decoration-2">
                      R$ {pageData.investment.anchorPrice}
                    </span>
                    <span className="text-sm font-medium uppercase text-foreground-secondary tracking-wide">
                      POR APENAS
                    </span>
                  </div>

                  <div
                    className="text-center text-primary-dark font-black leading-none"
                    style={{
                      textShadow: '0 2px 4px hsla(var(--primary), 0.1)',
                      letterSpacing: '-1px',
                    }}
                  >
                    <span className="text-4xl md:text-5xl align-super mr-1">R$</span>
                    <span className="text-7xl md:text-8xl">{pageData.investment.price}</span>
                  </div>
                  
                  <p className="text-center text-lg font-medium text-foreground-secondary mt-4 mb-6">
                    Apenas <strong className="text-primary-dark">R$ 3,23</strong> por dia
                  </p>


                  <div className="mt-6 text-left bg-white/50 p-4 rounded-lg">
                    <p className="font-bold text-foreground mb-3 text-base">
                      Por que vale a pena?
                    </p>
                    <ul className="space-y-2">
                      {pageData.investment.justifications.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm font-medium text-foreground/90"
                        >
                          <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span dangerouslySetInnerHTML={{ __html: item.replace(/(\d{1,3}(?:\.\d{3})*,\d{2}|\d[\d,.]*)/g, '<strong class="text-primary-dark font-bold">$1</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

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
                  <h3 className="text-xl md:text-2xl font-bold text-primary-dark mb-4">{pageData.guaranteeTitle}</h3>
                  <div className="text-foreground-secondary leading-relaxed space-y-3">{pageData.guaranteeText}</div>
                  <div className="mt-6 p-4 bg-primary-light rounded-lg font-bold text-primary-dark">
                      {pageData.guaranteeImpact}
                  </div>
              </motion.section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

    