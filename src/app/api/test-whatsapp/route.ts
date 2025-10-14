// src/app/api/test-whatsapp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsAppMessage } from '@/lib/whatsappService';

/**
 * Rota de API para testar o envio de mensagens do WhatsApp.
 * @param request - A requisição POST contendo 'to' (número de telefone) e 'message' (texto).
 * @returns Uma resposta JSON indicando sucesso ou falha.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, message } = body;

    if (!to || !message) {
      return NextResponse.json({
        success: false,
        error: "Campos obrigatórios no corpo da requisição: 'to' e 'message'",
      }, { status: 400 });
    }

    console.log(`[TESTE] Recebida solicitação para enviar mensagem para ${to}`);
    await sendWhatsAppMessage(to, message);
    
    return NextResponse.json({
      success: true,
      message: 'Solicitação de envio de mensagem de teste processada.',
      details: {
        to,
        message,
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('❌ Erro na rota de teste do WhatsApp:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno no servidor ao tentar enviar a mensagem de teste.',
      message: error.message,
    }, { status: 500 });
  }
}

// Garante que a rota não seja cacheada
export const dynamic = 'force-dynamic';
