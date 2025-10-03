type Score = {
    I: number;
    E: number;
    V: number;
    R: number;
};

export const scoringMatrix: Score[][] = [
    // Pergunta 1: Idade
    [
        { I: 5, E: 0, V: 0, R: 0 }, // 0-2 anos
        { I: 0, E: 5, V: 0, R: 1 }, // 3-6 anos
        { I: 0, E: 4, V: 2, R: 1 }, // 7-12 anos
        { I: 0, E: 1, V: 5, R: 1 }, // 13+ anos
    ],
    // Pergunta 2: Maior desafio
    [
        { I: 4, E: 0, V: 1, R: 0 }, // Medo de reação
        { I: 0, E: 4, V: 2, R: 0 }, // Falta de variedade
        { I: 0, E: 5, V: 0, R: 1 }, // Lancheira escolar
        { I: 0, E: 4, V: 1, R: 0 }, // Festas e eventos
        { I: 0, E: 3, V: 2, R: 2 }, // Falta de tempo
    ],
    // Pergunta 3: Frequência de reação
    [
        { I: 5, E: 0, V: 2, R: 0 }, // 3+ vezes/semana
        { I: 3, E: 1, V: 1, R: 0 }, // 1-2 vezes/semana
        { I: 1, E: 3, V: 1, R: 2 }, // Raramente
        { I: 0, E: 2, V: 1, R: 3 }, // Quase nunca
    ],
    // Pergunta 4: Como descobre receitas
    [
        { I: 4, E: 1, V: 1, R: 0 }, // Google/Instagram
        { I: 3, E: 2, V: 1, R: 0 }, // Grupos de WhatsApp
        { I: 1, E: 3, V: 1, R: 2 }, // Nutricionista
        { I: 2, E: 3, V: 2, R: 1 }, // Improviso
        { I: 0, E: 2, V: 3, R: 1 }, // Produtos prontos caros
    ],
    // Pergunta 5: Motivação hoje
    [
        { I: 5, E: 0, V: 2, R: 0 }, // Reação forte recente
        { I: 3, E: 1, V: 4, R: 0 }, // Exausta
        { I: 0, E: 5, V: 1, R: 3 }, // Quer sistema organizado
        { I: 0, E: 5, V: 0, R: 1 }, // Resolver lancheira
        { I: 3, E: 3, V: 2, R: 0 }, // Filho triste
    ],
    // Pergunta 6: O que bloqueia
    [
        { I: 5, E: 1, V: 0, R: 2 }, // Saber QUAIS alimentos
        { I: 0, E: 4, V: 2, R: 1 }, // Receitas RÁPIDAS
        { I: 2, E: 3, V: 3, R: 1 }, // Ingredientes não caros
        { I: 1, E: 3, V: 3, R: 0 }, // Família/escola colaborar
        { I: 3, E: 4, V: 2, R: 2 }, // CARDÁPIO pronto
    ],
    // Pergunta 7: Gasto
    [
        { I: 5, E: 1, V: 0, R: 1 }, // < R$500
        { I: 3, E: 3, V: 1, R: 2 }, // R$500 - R$1500
        { I: 1, E: 3, V: 4, R: 3 }, // R$1500 - R$3000
        { I: 0, E: 1, V: 6, R: 2 }, // > R$3000
        { I: 0, E: 1, V: 5, R: 0 }, // Nem quero calcular
    ],
    // Pergunta 8: O que mais deseja
    [
        { I: 3, E: 4, V: 2, R: 3 }, // Cardápio PRONTO 30 dias
        { I: 5, E: 1, V: 3, R: 0 }, // Nunca mais sentir MEDO
        { I: 3, E: 3, V: 3, R: 1 }, // Filho PEDINDO comida
        { I: 0, E: 5, V: 2, R: 3 }, // Receitas RÁPIDAS
        { I: 3, E: 2, V: 3, R: 0 }, // Grupo de mães que ENTENDEM
    ],
];