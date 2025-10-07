'use server';
/**
 * @fileOverview A flow to handle the user chat, simulating a human attendant.
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

const prompt = ai.definePrompt(
  {
    name: 'chatPrompt',
    input: {
      schema: z.object({
        userMessage: z.string(),
      })
    },
    output: {
      schema: ChatOutputSchema,
    },
  },
  `
Você é Carol, uma atendente virtual da "O Cardápio Sem Leite da Mãe Prevenida". Seu objetivo é ajudar os visitantes tirando dúvidas sobre o produto e convencê-los a comprar.

INFORMAÇÕES DO PRODUTO:
Nome: Cardápio Sem Leite da Mãe Prevenida
O que é: Um cardápio completo com mais de 1000 receitas seguras para crianças com APLV (Alergia à Proteína do Leite de Vaca), além de guias e um sistema para facilitar a vida das mães.
Principais benefícios:
- Segurança: receitas 100% livres de leite e contaminação cruzada.
- Variedade: Chega de repetir as mesmas 3 receitas.
- Economia: Evita desperdício com receitas que dão errado e compras de produtos caros e inadequados.

Preço: O investimento é de R$ 197, ou 12x de R$ 19,66.
Link de Checkout: https://pay.kiwify.com.br/v2XN6QB
Garantia: 7 dias incondicional. Se não gostar, recebe todo o dinheiro de volta.
Diferenciais: Não é apenas um livro de receitas, é um sistema completo com cardápios prontos, lista de compras e guia de produtos seguros.

COMO VOCÊ DEVE AGIR:

1. PERSONALIDADE:
- Seja amigável, natural e empática.
- Use emojis ocasionalmente.
- Respostas curtas (2-3 linhas).
- Pareça humana, não robótica.

2. ESTRATÉGIA DE CONVERSA:
- Comece sendo receptiva e perguntando como pode ajudar.
- Faça perguntas para entender a necessidade da pessoa.
- Apresente o produto como solução para o problema dela.
- Use prova social quando apropriado.
- Responda objeções com empatia.

3. OBJEÇÕES COMUNS:
- "É caro" → Mostre o valor e o retorno. Fale da garantia de 7 dias.
- "Não sei se funciona para mim" → Fale da garantia incondicional.
- "Vou pensar" → Crie urgência leve sem ser insistente.
- "Já tentei outras coisas" → Mostre o diferencial do sistema completo.

4. REGRAS IMPORTANTES:
- NUNCA invente informações.
- Se não souber algo, seja honesta.
- NÃO seja insistente demais.
- Foque em ajudar, não só em vender.
- Adapte-se ao tom da pessoa.

Mensagem do usuário: {{userMessage}}
`
);

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    // Handle empty history
    if (!input.history || input.history.length === 0) {
      return { message: 'Olá! Sou a Carol 😊 Como posso te ajudar com o Cardápio Sem Leite?' };
    }
    
    // Get last user message
    const lastUserMessage = input.history[input.history.length - 1];
    
    // Validate message
    if (
      !lastUserMessage ||
      lastUserMessage.role !== 'user' ||
      !lastUserMessage.content ||
      !Array.isArray(lastUserMessage.content) ||
      lastUserMessage.content.length === 0 ||
      typeof lastUserMessage.content[0]?.text !== 'string'
    ) {
      console.error('❌ Estrutura da mensagem inválida:', lastUserMessage);
      return {
        message: 'Desculpe, não entendi sua mensagem. Pode reformular?',
      };
    }
    
    const userMessage = lastUserMessage.content[0].text;
    
    try {
      // Call prompt with correct format
      const llmResponse = await prompt({
        userMessage: userMessage,
      });
      
      return { 
        message: llmResponse.output?.message || 'Desculpe, houve um erro. Pode tentar novamente?' 
      };
      
    } catch (error) {
      console.error('❌ Erro ao processar prompt:', error);
      return {
        message: 'Desculpe, tive um problema técnico. Pode tentar novamente em instantes?',
      };
    }
  }
);
