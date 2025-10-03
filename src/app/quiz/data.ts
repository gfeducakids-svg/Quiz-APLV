import type { QuizQuestion } from '@/lib/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual a idade do seu filho com APLV?',
    subtitle: 'Isso nos ajuda a personalizar suas receitas',
    options: [
      { text: '0-2 anos (fase de introdução alimentar)', icon: '⭐' },
      { text: '3-6 anos (pré-escola/escola)', icon: '🎒' },
      { text: '7-12 anos (idade escolar)', icon: '📚' },
      { text: '13+ anos (adolescente)', icon: '🎓' },
    ],
  },
  {
    id: 2,
    question: 'Qual é o seu MAIOR desafio hoje?',
    subtitle: 'Seja honesta - ninguém está julgando você',
    options: [
      { text: 'Medo de dar algo errado e causar reação', icon: '😰' },
      { text: 'Falta de variedade (sempre as mesmas 3 receitas)', icon: '😫' },
      { text: 'Preparar lancheira escolar segura', icon: '🏫' },
      { text: 'Lidar com festas e eventos sociais', icon: '🎉' },
      { text: 'Falta de tempo para cozinhar receitas complicadas', icon: '⏰' },
    ],
  },
  {
    id: 3,
    question: 'Quantas vezes por SEMANA seu filho tem reação alérgica?',
    subtitle: 'Incluindo reações leves como cólica, gases, irritação',
    options: [
      { text: '3+ vezes (quase toda semana tenho que lidar com isso)', icon: '🚨' },
      { text: '1-2 vezes (ainda acontece com frequência)', icon: '⚠️' },
      { text: 'Raramente (mas tenho medo que volte)', icon: '🟡' },
      { text: 'Quase nunca (mas quero manter assim)', icon: '✅' },
    ],
  },
  {
    id: 4,
    question: 'Como você descobre novas receitas hoje?',
    subtitle: 'Queremos saber o que já tentou',
    options: [
      { text: 'Pesquiso no Google e Instagram (mas nunca sei se é seguro)', icon: '🔍' },
      { text: 'Peço em grupos de mães no WhatsApp', icon: '👥' },
      { text: 'Sigo o que a nutricionista passou (mas são poucas opções)', icon: '👩‍⚕️' },
      { text: 'Improviso e adapto receitas normais (na tentativa e erro)', icon: '🎲' },
      { text: 'Compro produtos prontos caros', icon: '💸' },
    ],
  },
    {
    id: 5,
    question: 'O que te fez buscar esse diagnóstico HOJE?',
    subtitle: 'A gente quer te ajudar no que realmente importa pra você',
    options: [
        { text: 'Meu filho teve uma reação forte recentemente (estou desesperada)', icon: '🆘' },
        { text: 'Estou exausta de não saber o que fazer (preciso de alívio)', icon: '😓' },
        { text: 'Quero um sistema organizado de uma vez (chega de improvisar)', icon: '🎯' },
        { text: 'Preciso resolver a lancheira escolar (está me estressando)', icon: '🏫' },
        { text: 'Vi meu filho triste por não poder comer igual aos outros', icon: '💔' },
    ],
  },
  {
    id: 6,
    question: "Complete: 'Eu conseguiria alimentar meu filho melhor SE...'",
    subtitle: 'Escolha o que mais te bloqueia',
    options: [
        { text: 'Eu soubesse QUAIS alimentos são realmente seguros', icon: '📚' },
        { text: 'As receitas fossem RÁPIDAS (máximo 30 minutos)', icon: '⏰' },
        { text: 'Eu não precisasse comprar ingredientes caros', icon: '💰' },
        { text: 'Minha família/escola COLABORASSE mais', icon: '👨‍👩‍👧' },
        { text: 'Eu tivesse um CARDÁPIO pronto (sem ter que pensar)', icon: '🎯' },
    ],
  },
  {
    id: 7,
    question: 'Quanto você JÁ GASTOU tentando resolver o problema de alimentação?',
    subtitle: 'Entre nutricionistas, produtos especiais, testes...',
    options: [
        { text: 'Menos de R$ 500 (estou começando)', icon: '💵' },
        { text: 'R$ 500 - R$ 1.500 (já investi bastante)', icon: '💸' },
        { text: 'R$ 1.500 - R$ 3.000 (gastei muito)', icon: '💰' },
        { text: 'Mais de R$ 3.000 (já tentei de tudo)', icon: '💳' },
        { text: 'Nem quero calcular (dói pensar nisso)', icon: '🤷' },
    ],
  },
  {
    id: 8,
    question: 'Se você pudesse ter UMA coisa agora, qual seria?',
    subtitle: 'Última pergunta - escolha o que seu coração mais deseja',
    options: [
        { text: 'Um cardápio PRONTO para os próximos 30 dias', icon: '🎯' },
        { text: 'Nunca mais sentir MEDO na hora de alimentar', icon: '🛡️' },
        { text: 'Ver meu filho PEDINDO a comida (em vez de recusar)', icon: '😊' },
        { text: 'Receitas RÁPIDAS que eu consiga fazer todo dia', icon: '⏰' },
        { text: 'Um grupo de mães que ENTENDEM o que passo', icon: '🤝' },
    ],
  },
];