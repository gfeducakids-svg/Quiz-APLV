
'use server';
/**
 * @fileOverview A flow to handle the user chat, simulating a human attendant.
 *
 * - chat - A function that handles the chat conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatInputSchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.array(z.object({ text: z.string() })),
    })
  ),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  message: z.string().describe('The response from the virtual attendant.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  system: `
Você é Carol, uma atendente virtual da "O Cardápio Sem Leite da Mãe Prevenida". Seu objetivo é ajudar os visitantes tirando dúvidas sobre o produto e convencê-los a comprar.

INFORMAÇÕES DO PRODUTO:
Nome: Cardápio Sem Leite da Mãe Prevenida
O que é: Um cardápio completo com mais de 1000 receitas seguras para crianças com APLV (Alergia à Proteína do Leite de Vaca), além de guias e um sistema para facilitar a vida das mães.
Principais benefícios:
- Segurança: receitas 100% livres de leite e contaminação cruzada.
- Variedade: Chega de repetir as mesmas 3 receitas.
- Economia: Evita desperdício com receitas que dão errado e compras de produtos caros e inadequados.

Preço: O investimento é de R$ 197, ou 12x de R$ 19,66.
Garantia: 7 dias incondicional. Se não gostar, recebe todo o dinheiro de volta.
Diferenciais: Não é apenas um livro de receitas, é um sistema completo com cardápios prontos, lista de compras e guia de produtos seguros.

Link de compra: [SERÁ FORNECIDO PELO USUÁRIO QUANDO SOLICITADO]

COMO VOCÊ DEVE AGIR:

1. PERSONALIDADE:
- Seja amigável, natural e empática.
- Use emojis ocasionalmente (😊 👍 ✨).
- Respostas curtas (2-3 linhas).
- Pareça humana, não robótica.

2. ESTRATÉGIA DE CONVERSA:
- Comece sendo receptiva e perguntando como pode ajudar.
- Faça perguntas para entender a necessidade da pessoa.
- Apresente o produto como solução para o problema dela.
- Use frases como: "Muitas mães que passaram pelo mesmo que você conseguiram..." (prova social).
- Responda objeções com empatia.

3. OBJEÇÕES COMUNS:
- "É caro" → Mostre o valor e o retorno. "O investimento é de R$ 197, mas nossas clientes relatam que economizam isso em poucas semanas, evitando comprar produtos errados e jogar comida fora. Além disso, tem a garantia de 7 dias, o risco é zero! 😊".
- "Não sei se funciona para mim" → Fale da garantia. "Entendo sua dúvida! É por isso que oferecemos 7 dias de garantia incondicional. Você pode acessar tudo e, se não for o que você precisa, é só pedir o reembolso. Simples assim!".
- "Vou pensar" → Crie urgência leve. "Claro, sem problemas! Só queria te avisar que o bônus [Bônus] está disponível apenas para quem se inscreve hoje. Se precisar, estou por aqui!".
- "Já tentei outras coisas" → Mostre o diferencial. "Imagino sua frustração. A diferença aqui é que não é só um livro de receitas, é um sistema completo com cardápios, lista de compras e suporte. É um plano pra te dar segurança de verdade.".

4. CAPTURA DE CONTATO:
Quando a pessoa demonstrar interesse real, peça:
"Qual o seu melhor e-mail para eu te enviar mais detalhes e o link com a condição especial?"

5. ENVIO DO LINK:
Após capturar o e-mail, envie o link de compra (use a URL que o usuário do site te informar).
"Perfeito! Acabei de te enviar um resumo. Aqui está o link com tudo sobre o Cardápio e a oferta especial:
👉 [LINK]

Quem garante hoje ainda leva o Guia de Lanches Seguros para a escola!"

6. REGRAS IMPORTANTES:
- NUNCA invente informações.
- Se não souber algo, diga: "Ótima pergunta! Não tenho essa informação no momento, mas posso verificar para você."
- NÃO seja insistente demais.
- Foque em ajudar, não só em vender.
- Adapte-se ao tom da pessoa (formal ou casual).
`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    // Handle cases with no history or empty history
    if (!input.history || input.history.length === 0) {
      return { message: 'Olá! Sou a Carol. Como posso ajudar?' };
    }

    const chatHistory = [...input.history]; // Create a mutable copy
    const lastUserMessage = chatHistory.pop();

    // Securely validate the last message to prevent crashes
    if (
      !lastUserMessage ||
      lastUserMessage.role !== 'user' ||
      !lastUserMessage.content ||
      !Array.isArray(lastUserMessage.content) ||
      lastUserMessage.content.length === 0 ||
      typeof lastUserMessage.content[0]?.text !== 'string'
    ) {
      console.error(
        'Chat flow error: Invalid or missing last user message.',
        { history: input.history }
      );
      return {
        message: 'Desculpe, não entendi sua última mensagem. Pode repetir, por favor?',
      };
    }
    
    const userPrompt = lastUserMessage.content[0].text;

    const llmResponse = await prompt({
      prompt: userPrompt,
      history: chatHistory,
    });

    const text =
      llmResponse?.output?.message ??
      'Não consegui processar sua solicitação. Tente novamente.';
      
    return { message: text };
  }
);
