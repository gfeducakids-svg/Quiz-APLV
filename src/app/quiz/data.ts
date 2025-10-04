import type { QuizQuestion } from '@/lib/types';
import type { LucideIcon } from 'lucide-react';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual a idade do seu filho com APLV?',
    subtitle: 'Isso nos ajuda a personalizar suas receitas.',
    options: [
      { text: '0-2 anos (fase de introdução alimentar)', icon: 'Baby' },
      { text: '3-6 anos (pré-escola/escola)', icon: 'School' },
      { text: '7-12 anos (idade escolar)', icon: 'GraduationCap' },
      { text: '13+ anos (adolescente)', icon: 'User' },
    ],
  },
  {
    id: 2,
    question: 'Qual é o seu MAIOR desafio hoje?',
    subtitle: 'Seja honesta - ninguém está julgando você.',
    options: [
      { text: 'Medo de dar algo errado e causar reação', icon: 'ShieldAlert' },
      { text: 'Falta de variedade (sempre as mesmas 3 receitas)', icon: 'RefreshCw' },
      { text: 'Preparar lancheira escolar segura', icon: 'Backpack' },
      { text: 'Lidar com festas e eventos sociais', icon: 'Cake' },
      { text: 'Falta de tempo para cozinhar receitas complicadas', icon: 'Clock' },
    ],
  },
  {
    id: 3,
    question: 'Quantas vezes por SEMANA seu filho tem reação alérgica?',
    subtitle: 'Incluindo reações leves como cólica, gases, irritação.',
    options: [
      { text: '3+ vezes (quase toda semana tenho que lidar com isso)', icon: 'AlertTriangle' },
      { text: '1-2 vezes (ainda acontece com frequência)', icon: 'AlertCircle' },
      { text: 'Raramente (mas tenho medo que volte)', icon: 'CheckCircle' },
      { text: 'Quase nunca (mas quero manter assim)', icon: 'CheckCircle2' },
    ],
  },
  {
    id: 4,
    question: 'Como você descobre novas receitas hoje?',
    subtitle: 'Queremos saber o que já tentou.',
    options: [
      { text: 'Pesquiso no Google e Instagram (mas nunca sei se é seguro)', icon: 'Search' },
      { text: 'Peço em grupos de mães no WhatsApp', icon: 'Users' },
      { text: 'Sigo o que a nutricionista passou (mas são poucas opções)', icon: 'Stethoscope' },
      { text: 'Improviso e adapto receitas normais (na tentativa e erro)', icon: 'Shuffle' },
      { text: 'Compro produtos prontos caros', icon: 'ShoppingCart' },
    ],
  },
    {
    id: 5,
    question: 'O que te fez buscar esse diagnóstico HOJE?',
    subtitle: 'A gente quer te ajudar no que realmente importa pra você.',
    options: [
        { text: 'Meu filho teve uma reação forte recentemente (estou desesperada)', icon: 'HeartCrack' },
        { text: 'Estou exausta de não saber o que fazer (preciso de alívio)', icon: 'BatteryLow' },
        { text: 'Quero um sistema organizado de uma vez (chega de improvisar)', icon: 'LayoutGrid' },
        { text: 'Preciso resolver a lancheira escolar (está me estressando)', icon: 'Backpack' },
        { text: 'Vi meu filho triste por não poder comer igual aos outros', icon: 'Frown' },
    ],
  },
  {
    id: 6,
    question: "Complete: 'Eu conseguiria alimentar meu filho melhor SE...'",
    subtitle: 'Escolha o que mais te bloqueia.',
    options: [
        { text: 'Eu soubesse QUAIS alimentos são realmente seguros', icon: 'ShieldCheck' },
        { text: 'As receitas fossem RÁPIDAS (máximo 30 minutos)', icon: 'Zap' },
        { text: 'Eu não precisasse comprar ingredientes caros', icon: 'Coins' },
        { text: 'Minha família/escola COLABORASSE mais', icon: 'Users' },
        { text: 'Eu tivesse um CARDÁPIO pronto (sem ter que pensar)', icon: 'CalendarCheck' },
    ],
  },
  {
    id: 7,
    question: 'Quanto você JÁ GASTOU tentando resolver o problema de alimentação?',
    subtitle: 'Entre nutricionistas, produtos especiais, testes...',
    options: [
        { text: 'Menos de R$ 500 (estou começando)', icon: 'Banknote' },
        { text: 'R$ 500 - R$ 1.500 (já investi bastante)', icon: 'Wallet' },
        { text: 'R$ 1.500 - R$ 3.000 (gastei muito)', icon: 'CreditCard' },
        { text: 'Mais de R$ 3.000 (já tentei de tudo)', icon: 'DollarSign' },
        { text: 'Nem quero calcular (dói pensar nisso)', icon: 'HelpCircle' },
    ],
  },
  {
    id: 8,
    question: 'Se você pudesse ter UMA coisa agora, qual seria?',
    subtitle: 'Última pergunta - escolha o que seu coração mais deseja.',
    options: [
        { text: 'Um cardápio PRONTO para os próximos 30 dias', icon: 'Calendar' },
        { text: 'Nunca mais sentir MEDO na hora de alimentar', icon: 'Shield' },
        { text: 'Ver meu filho PEDINDO a comida (em vez de recusar)', icon: 'Smile' },
        { text: 'Receitas RÁPIDAS que eu consiga fazer todo dia', icon: 'Zap' },
        { text: 'Um grupo de mães que ENTENDEM o que passo', icon: 'MessageSquare' },
    ],
  },
];
