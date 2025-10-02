import type { QuizQuestion } from '@/lib/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Primeiro, qual a idade do seu filho?',
    options: [
      'Bebê (0-2 anos)',
      'Criança (3-8 anos)',
      'Pré-adolescente (9-13 anos)',
      'Adolescente (14+)',
    ],
  },
  {
    id: 2,
    question: 'Qual frase dói MAIS quando alguém diz pra você?',
    options: [
      '"Ah, mas um pouquinho de leite não faz mal"',
      '"No meu tempo não tinha isso"',
      '"Esse menino é muito fresco"',
      '"Você tá exagerando demais"',
      '"Isso é tudo coisa da internet"',
    ],
  },
  {
    id: 3,
    question: 'O que te deixa ACORDADA à noite?',
    options: [
      'Medo do meu filho passar mal por algo que EU dei',
      'Terror dele desenvolver traumas alimentares por minha culpa',
      'Pânico da escola dar algo proibido sem eu saber',
      'Medo dele ficar de fora de festas e sofrer bullying',
      'Pavor das restrições atrasarem o desenvolvimento dele',
    ],
  },
  {
    id: 4,
    question: 'Complete: "Eu me sinto uma péssima mãe quando..."',
    options: [
      'Meu filho recusa tudo que faço e chora de fome',
      'Vejo outras crianças comendo normal e a minha não pode',
      'Erro uma receita e tenho que jogar tudo fora',
      'Descubro que dei algo errado sem saber',
      'Percebo que estou repetindo as mesmas 3 receitas todo dia',
    ],
  },
  {
    id: 5,
    question: 'Qual dessas situações JÁ aconteceu com você?',
    options: [
      'Comprei um produto "sem lactose" caro e AINDA causou reação',
      'Tentei uma receita da internet e foi um desastre total',
      'Briguei com meu marido/família por causa da comida',
      'Chorei de exaustão na cozinha sem saber o que fazer',
      'Evitei sair/viajar com medo da alimentação',
    ],
  },
  {
    id: 6,
    question: 'O que você MAIS deseja neste momento?',
    options: [
      'NUNCA mais sentir medo de dar comida pro meu filho',
      'Ter um cardápio PRONTO que EU SEI que funciona',
      'Meu filho comer FELIZ e SAUDÁVEL sem drama',
      'Parar de me sentir culpada e incompetente',
      'Ser a mãe segura que domina essa alimentação',
    ],
  },
  {
    id: 7,
    question: 'Se você NÃO resolver isso AGORA, o que te apavora?',
    options: [
      'Meu filho desenvolver deficiências nutricionais graves',
      'Ele criar traumas que vão durar a vida inteira',
      'Eu perder ainda mais noites de sono em pânico',
      'Nossa família continuar em conflito por causa disso',
      'Meu filho se sentir diferente e rejeitado pra sempre',
    ],
  },
  {
    id: 8,
    question: 'Seja HONESTA: Quanto você já gastou tentando resolver isso?',
    options: [
      'Menos de R$ 500 (mas sem resultado)',
      'R$ 500 a R$ 1.500 (tentando tudo)',
      'R$ 1.500 a R$ 3.000 (nutricionistas, produtos caros)',
      'Mais de R$ 3.000 (e ainda estou perdida)',
      'Nem quero pensar nisso (dói demais)',
    ],
  },
];
