// src/app/api/webhook/kiwify/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendEmail } from '@/lib/emailService';
import { getConfirmationEmail, getAbandonedCartEmail } from '@/templates/emailTemplates';

const verifyWebhook = (req: Request, body: any) => {
  const secret = process.env.KIWIFY_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('KIWIFY_WEBHOOK_SECRET não configurada. Pulando verificação de segurança.');
    return true; // Pula a verificação se o segredo não estiver configurado
  }
  
  const signature = req.headers.get('signature');
  if (!signature) {
    console.error('Assinatura do Webhook não encontrada no cabeçalho.');
    return false;
  }
  
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(JSON.stringify(body));
  const digest = hmac.digest('hex');
  
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
};

export async function POST(req: Request) {
  let body;
  try {
    const rawBody = await req.text();
    body = JSON.parse(rawBody);

    // Log para depuração
    console.log('Webhook recebido:', JSON.stringify(body, null, 2));

    if (!verifyWebhook(req, body)) {
      console.error('Falha na verificação da assinatura do Webhook.');
      return NextResponse.json({ status: 'error', message: 'Assinatura inválida' }, { status: 401 });
    }

    const {
      webhook_event_type,
      order_status,
      payment_method,
      Customer,
      Product,
      order_ref,
      Commissions,
      access_url,
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
      const subject = `✅ Pagamento confirmado: Seu acesso ao ${productName} está liberado!`;
      
      const emailHtml = getConfirmationEmail({
        name: customerName,
        orderRef: order_ref,
        value: formattedValue,
        accessUrl: access_url,
        productName: productName,
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
