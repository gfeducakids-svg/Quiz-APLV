// src/app/api/webhook/kiwify/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendEmail } from '@/lib/emailService';
import { getConfirmationEmail, getAbandonedCartEmail } from '@/templates/emailTemplates';

// Opcional: Valide a assinatura do webhook para garantir que vem da Kiwify
const verifyWebhook = (req: Request, body: any) => {
  const secret = process.env.KIWIFY_WEBHOOK_SECRET;
  if (!secret) {
    // Se não há secret configurada, pulamos a verificação
    console.warn('KIWIFY_WEBHOOK_SECRET não configurada. Pulando verificação.');
    return true;
  }
  
  const signature = req.headers.get('signature');
  if (!signature) {
    return false;
  }
  
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(JSON.stringify(body));
  const digest = hmac.digest('hex');
  
  return digest === signature;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Log para depuração
    console.log('Webhook recebido:', JSON.stringify(body, null, 2));

    // Descomente a linha abaixo para ativar a verificação de segurança
    // if (!verifyWebhook(req, body)) {
    //   console.error('Falha na verificação da assinatura do Webhook.');
    //   return NextResponse.json({ status: 'error', message: 'Assinatura inválida' }, { status: 401 });
    // }

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

    // Lógica para determinar qual email enviar
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
        productName: productName
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

  } catch (error) {
    console.error('Erro ao processar webhook da Kiwify:', error);
    // Retornamos 200 mesmo em caso de erro para evitar que a Kiwify reenvie o webhook indefinidamente.
    return NextResponse.json({ status: 'error', message: 'Erro interno do servidor' }, { status: 200 });
  }
}
