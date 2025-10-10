
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
        // Retornar 200 para não receber o webhook novamente
        return Response.json({ success: true, message: 'Email do cliente não encontrado, mas webhook recebido.' }, { status: 200 });
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
        // Retornar 200 para não receber o webhook novamente
        return Response.json({ success: true, message: 'Email do cliente não encontrado, mas webhook recebido.' }, { status: 200 });
      }
      
      console.log('✅ Compra aprovada, enviando email...');
      
      // Garante que o valor seja formatado corretamente
      const chargeAmount = body.Commissions?.[0]?.charge_amount;
      const amount = typeof chargeAmount === 'number' 
        ? (chargeAmount / 100).toFixed(2).replace('.', ',') 
        : '35,90';

      const emailData = {
        name: customerName,
        order_ref: body.order_ref || 'N/A',
        amount: amount,
        access_url: 'https://drive.google.com/drive/folders/1J8E8L5jShNTgX98Q_R6atm8t7Eeqpi5a?usp=sharing'
      };
      
      await sendEmail({
        to: customerEmail,
        subject: '🎉 Acesso Liberado - Cardápio Sem Leite',
        html: paymentApprovedTemplate(emailData)
      });
      
      console.log('✅ Email de confirmação enviado para:', customerEmail);

    // Outros eventos não processados
    } else {
        const eventIdentifier = body.order_status || (body.cart ? body.cart.status : 'sem status/evento conhecido');
        console.log('ℹ️ Evento não processado:', eventIdentifier);
    }
    
    return Response.json({ 
      success: true,
      message: 'Webhook processado com sucesso'
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('❌ Erro grave ao processar webhook:', {
      message: error.message,
      stack: error.stack
    });
    
    // Retorna 200 para que a Kiwify não reenvie o webhook em caso de erro de parsing ou outro.
    return Response.json({ 
      received: true,
      error: 'Processado com erro, mas recebido'
    }, { status: 200 });
  }
}

export const dynamic = 'force-dynamic';
