
import { NextRequest } from 'next/server';
import { sendEmail } from '@/lib/emailService';
import { 
  paymentApprovedTemplate, 
  cartAbandonedTemplate 
} from '@/templates/emailTemplates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('📩 Webhook recebido:', {
      timestamp: new Date().toISOString(),
      order_id: body.order_id,
      status: body.status,
      email: body.Customer?.email || body.email
    });
    
    const customerEmail = body.Customer?.email || body.email;
    if (!customerEmail) {
      console.error('❌ Email não encontrado');
      return Response.json({ error: 'Email obrigatório' }, { status: 400 });
    }
    
    const customerName = body.Customer?.full_name || body.Customer?.first_name || body.first_name || 'Cliente';
    
    // ✅ PROCESSAR COMPRA APROVADA
    if (body.order_status === 'paid') {
      console.log('✅ Compra aprovada');
      
      const emailData = {
        name: customerName,
        access_url: 'https://drive.google.com/drive/folders/1J8E8L5jShNTgX98Q_R6atm8t7Eeqpi5a?usp=sharing',
        order_ref: body.order_ref,
        amount: ((body.Commissions?.[0]?.charge_amount || 3590) / 100).toFixed(2).replace('.', ',')
      };

      await sendEmail({
        to: customerEmail,
        subject: '🎉 Acesso Liberado - Cardápio Sem Leite',
        html: paymentApprovedTemplate(emailData)
      });
      
      console.log('✅ Email de confirmação enviado');
    }
    
    // ✅ PROCESSAR CARRINHO ABANDONADO
    else if (body.status === 'abandoned') {
      console.log('🛒 Carrinho abandonado detectado');
      
      const emailData = {
        name: customerName,
        checkout_link: 'https://pay.kiwify.com.br/v2XN6QB'
      };
      
      await sendEmail({
        to: customerEmail,
        subject: 'Seu filho merece variedade 💚',
        html: cartAbandonedTemplate(emailData)
      });
      
      console.log('✅ Email de recuperação enviado');
    }
    
    // ⚠️ OUTRO STATUS NÃO ESPERADO
    else {
      console.warn('⚠️ Status não processado:', body.order_status || body.status);
    }
    
    // SEMPRE retornar 200
    return Response.json({ 
      success: true,
      processed: body.order_status || body.status
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('❌ Erro:', error);
    return Response.json({ received: true }, { status: 200 });
  }
}

export const dynamic = 'force-dynamic';
