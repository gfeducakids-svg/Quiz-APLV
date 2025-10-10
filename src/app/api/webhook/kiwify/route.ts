// src/app/api/webhook/kiwify/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { sendEmail } from '@/lib/emailService';
import { 
  paymentApprovedTemplate, 
  cartAbandonedTemplate 
} from '@/templates/emailTemplates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('📩 Webhook Kiwify recebido:', JSON.stringify(body, null, 2));

    let customerEmail: string | undefined;
    let customerName: string | undefined;
    let eventType: 'paid' | 'abandoned' | 'other' = 'other';

    // Distinguir entre webhook de compra e de carrinho abandonado
    if (body.cart && body.cart.status === 'abandoned') {
        eventType = 'abandoned';
        customerEmail = body.cart.email;
        customerName = body.cart.first_name || 'Cliente';
    } else if (body.order_status === 'paid') {
        eventType = 'paid';
        customerEmail = body.Customer?.email;
        customerName = body.Customer?.full_name || body.Customer?.first_name || 'Cliente';
    } else {
        console.log('ℹ️ Evento não processado:', body.order_status || 'sem status');
    }

    if (!customerEmail) {
      console.error('❌ Email do cliente não encontrado no payload.');
      return Response.json(
        { error: 'Email do cliente obrigatório' }, 
        { status: 400 }
      );
    }

    // Processar evento
    if (eventType === 'paid') {
      console.log('✅ Compra aprovada, enviando email...');
      
      const chargeAmount = body.Commissions?.[0]?.charge_amount;
      const amount = typeof chargeAmount === 'number' 
        ? (chargeAmount / 100).toFixed(2).replace('.', ',') 
        : '35,90';

      const emailData = {
        name: customerName!,
        order_ref: body.order_ref || 'N/A',
        amount: amount,
      };
      
      await sendEmail({
        to: customerEmail,
        subject: '🎉 Acesso Liberado - Cardápio Sem Leite',
        html: paymentApprovedTemplate(emailData)
      });
      
      console.log('✅ Email de confirmação enviado para:', customerEmail);
    }
    
    else if (eventType === 'abandoned') {
      console.log('🛒 Carrinho abandonado, enviando email...');
      
      const emailData = {
        name: customerName!,
        checkout_link: `https://pay.kiwify.com.br/${body.cart.checkout_link}`
      };
      
      await sendEmail({
        to: customerEmail,
        subject: 'Seu filho merece variedade 💚',
        html: cartAbandonedTemplate(emailData)
      });
      
      console.log('✅ Email de recuperação enviado para:', customerEmail);
    }
    
    return Response.json({ 
      success: true,
      message: 'Webhook processado com sucesso'
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('❌ Erro ao processar webhook:', {
      message: error.message,
      stack: error.stack
    });
    
    return Response.json({ 
      received: true,
      error: 'Processado com erro, mas recebido'
    }, { status: 200 });
  }
}

export const dynamic = 'force-dynamic';
