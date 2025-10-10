
import { NextRequest } from 'next/server';
import { sendEmail } from '@/lib/emailService';
import { 
  paymentApprovedTemplate, 
  cartAbandonedTemplate 
} from '@/templates/emailTemplates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('📩 Webhook Kiwify recebido:', JSON.stringify(body, null, 2));

    // Evento de Carrinho Abandonado
    if (body.cart && body.cart.status === 'abandoned') {
      const customerEmail = body.cart.email;
      const customerName = body.cart.first_name || 'Cliente';

      if (!customerEmail) {
        console.error('❌ Email do cliente não encontrado no payload de carrinho abandonado.');
        return Response.json({ error: 'Email do cliente obrigatório' }, { status: 400 });
      }

      console.log('🛒 Carrinho abandonado, enviando email...');
      
      const emailData = {
        name: customerName,
        checkout_link: `https://pay.kiwify.com.br/${body.cart.checkout_link}`
      };
      
      await sendEmail({
        to: customerEmail,
        subject: 'Seu filho merece variedade 💚',
        html: cartAbandonedTemplate(emailData)
      });
      
      console.log('✅ Email de recuperação enviado para:', customerEmail);
      
    // Evento de Compra Aprovada
    } else if (body.order_status === 'paid') {
      const customerEmail = body.Customer?.email;
      const customerName = body.Customer?.full_name || body.Customer?.first_name || 'Cliente';

      if (!customerEmail) {
        console.error('❌ Email do cliente não encontrado no payload de compra aprovada.');
        return Response.json({ error: 'Email do cliente obrigatório' }, { status: 400 });
      }
      
      console.log('✅ Compra aprovada, enviando email...');
      
      const chargeAmount = body.Commissions?.[0]?.charge_amount;
      const amount = typeof chargeAmount === 'number' 
        ? (chargeAmount / 100).toFixed(2).replace('.', ',') 
        : '35,90';

      const emailData = {
        name: customerName,
        order_ref: body.order_ref || 'N/A',
        amount: amount,
      };
      
      await sendEmail({
        to: customerEmail,
        subject: '🎉 Acesso Liberado - Cardápio Sem Leite',
        html: paymentApprovedTemplate(emailData)
      });
      
      console.log('✅ Email de confirmação enviado para:', customerEmail);

    // Outros eventos não processados
    } else {
        console.log('ℹ️ Evento não processado:', body.order_status || (body.cart ? body.cart.status : 'sem status'));
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

