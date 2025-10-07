// src/app/api/webhook/kiwify/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendEmail } from '@/lib/emailService';
import { getConfirmationEmail, getAbandonedCartEmail } from '@/templates/emailTemplates';

const verifyWebhook = (req: Request) => {
  const providedToken = req.headers.get('kiwify-token');
  const secretToken = process.env.KIWIFY_TOKEN;

  if (!secretToken) {
    console.warn('KIWIFY_TOKEN não configurado. Pulando verificação de segurança.');
    // Para desenvolvimento, pode ser útil pular a verificação.
    // Em produção, é altamente recomendável configurar o token.
    return true; 
  }
  
  if (!providedToken) {
    console.error('Token do Webhook não encontrado no cabeçalho.');
    return false;
  }

  // Comparação simples de tokens
  return providedToken === secretToken;
};

export async function POST(req: Request) {
  let body;
  try {
    // A verificação agora é feita antes de fazer o parse do body
    if (!verifyWebhook(req)) {
      console.error('Falha na verificação do token do Webhook.');
      return NextResponse.json({ status: 'error', message: 'Token inválido' }, { status: 401 });
    }
    
    const rawBody = await req.text();
    body = JSON.parse(rawBody);

    // Log para depuração
    console.log('Webhook recebido:', JSON.stringify(body, null, 2));

    const {
      webhook_event_type,
      order_status,
      payment_method,
      Customer,
      Product,
      order_ref,
      Commissions,
    } = body;
    
    const customerName = Customer?.full_name || 'Cliente';
    const customerEmail = Customer?.email;
    const productName = Product?.product_name || 'nosso produto';

    if (!customerEmail) {
      console.error('Email do cliente não encontrado no payload.');
      return NextResponse.json({ status: 'error', message: 'Email do cliente faltando' }, { status: 400 });
    }

    if (order_status === 'paid' && (payment_method === 'pix' || payment_method === 'credit_card')) {
      const chargeAmount = Commissions?.[0]?.charge_amount || 0;
      const formattedValue = (chargeAmount / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      const subject = `✅ Acesso Liberado! Seu ${productName} chegou!`;
      
      const emailHtml = getConfirmationEmail({
        name: customerName,
        orderRef: order_ref,
        value: formattedValue,
      });

      await sendEmail({
        to: customerEmail,
        subject,
        html: emailHtml,
      });
      console.log(`Email de confirmação enviado para ${customerEmail}`);

    } else if (webhook_event_type === 'cart_abandoned') {
      const subject = `🤔 Você esqueceu algo, ${customerName}?`;
      
      const emailHtml = getAbandonedCartEmail({
        name: customerName,
        productName: productName,
        checkoutUrl: 'https://pay.kiwify.com.br/v2XN6QB' // URL de checkout adicionada
      });

      await sendEmail({
        to: customerEmail,
        subject,
        html: emailHtml,
      });
      console.log(`Email de carrinho abandonado enviado para ${customerEmail}`);
    } else {
      console.log(`Evento de webhook não tratado: ${webhook_event_type} com status ${order_status}`);
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });

  } catch (error: any) {
    console.error('Erro ao processar webhook da Kiwify:', error);
    // Retornamos 200 mesmo em caso de erro para evitar que a Kiwify reenvie o webhook indefinidamente.
    return NextResponse.json({ status: 'error', message: 'Erro interno do servidor', details: error.message }, { status: 200 });
  }
}
