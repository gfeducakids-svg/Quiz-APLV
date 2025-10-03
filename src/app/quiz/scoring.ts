type Score = {
    I: number;
    E: number;
    V: number;
    R: number;
};

export const scoringMatrix: Score[][] = [
    // Pergunta 1: Idade
    [
        { I: 5, E: 0, V: 0, R: 0 },
        { I: 0, E: 5, V: 0, R: 1 },
        { I: 0, E: 4, V: 2, R: 1 },
        { I: 0, E: 1, V: 5, R: 1 },
    ],
    // Pergunta 2: Maior desafio
    [
        { I: 4, E: 0, V: 1, R: 0 },
        { I: 0, E: 4, V: 2, R: 0 },
        { I: 0, E: 5, V: 0, R: 1 },
        { I: 0, E: 4, V: 1, R: 0 },
        { I: 0, E: 3, V: 2, R: 2 },
    ],
    // Pergunta 3: Frequência de reação
    [
        { I: 5, E: 0, V: 2, R: 0 },
        { I: 3, E: 1, V: 1, R: 0 },
        { I: 1, E: 3, V: 1, R: 2 },
        { I: 0, E: 2, V: 1, R: 3 },
    ],
    // Pergunta 4: Como descobre receitas
    [
        { I: 4, E: 1, V: 1, R: 0 },
        { I: 3, E: 2, V: 1, R: 0 },
        { I: 1, E: 3, V: 1, R: 2 },
        { I: 2, E: 3, V: 2, R: 1 },
        { I: 0, E: 2, V: 3, R: 1 },
    ],
    // Pergunta 5: Motivação hoje
    [
        { I: 5, E: 0, V: 2, R: 0 },
        { I: 3, E: 1, V: 4, R: 0 },
        { I: 0, E: 5, V: 1, R: 3 },
        { I: 0, E: 5, V: 0, R: 1 },
        { I: 3, E: 3, V: 2, R: 0 },
    ],
    // Pergunta 6: O que bloqueia
    [
        { I: 5, E: 1, V: 0, R: 2 },
        { I: 0, E: 4, V: 2, R: 1 },
        { I: 2, E: 3, V: 3, R: 1 },
        { I: 1, E: 3, V: 3, R: 0 },
        { I: 3, E: 4, V: 2, R: 2 },
    ],
    // Pergunta 7: Gasto
    [
        { I: 5, E: 1, V: 0, R: 1 },
        { I: 3, E: 3, V: 1, R: 2 },
        { I: 1, E: 3, V: 4, R: 3 },
        { I: 0, E: 1, V: 6, R: 2 },
        { I: 0, E: 1, V: 5, R: 0 },
    ],
    // Pergunta 8: O que mais deseja
    [
        { I: 3, E: 4, V: 2, R: 3 },
        { I: 5, E: 1, V: 3, R: 0 },
        { I: 3, E: 3, V: 3, R: 1 },
        { I: 0, E: 5, V: 2, R: 3 },
        { I: 3, E: 2, V: 3, R: 0 },
    ],
];
