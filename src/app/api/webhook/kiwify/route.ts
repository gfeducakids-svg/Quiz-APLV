// src/app/api/webhook/kiwify/route.ts
import { NextRequest } from 'next/server';
import { sendEmail } from '@/lib/emailService';
import { 
  paymentApprovedTemplate, 
  cartAbandonedTemplate 
} from '@/templates/emailTemplates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('================================================');
    console.log(`[${new Date().toISOString()}] 📥 Webhook Kiwify Recebido`);
    console.log('Corpo da Requisição:', JSON.stringify(body, null, 2));
    
    // Unificação dos campos de diferentes tipos de webhook (compra, carrinho, etc.)
    const customerEmail = body.Customer?.email || body.email;
    const customerName = body.Customer?.full_name || body.Customer?.first_name || body.first_name || 'Cliente';
    const status = body.order_status || body.status;
    
    console.log('Dados Extraídos:', {
      status,
      customerName,
      customerEmail,
    });
    
    // ✅ PROCESSAR COMPRA APROVADA
    if (status === 'paid') {
      console.log('🟩 Detectado: Compra Aprovada');
      
      if (customerEmail) {
        console.log('...Preparando email de confirmação...');
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
        console.log(`✅ Email de confirmação enviado para ${customerEmail}`);
      } else {
        console.log('⚠️ Email não encontrado para enviar confirmação.');
      }

    }
    
    // 🛒 PROCESSAR CARRINHO ABANDONADO
    else if (status === 'abandoned') {
      console.log('🟨 Detectado: Carrinho Abandonado');
      
      if (customerEmail) {
        console.log('...Preparando email de recuperação...');
        const emailData = {
          name: customerName,
          checkout_link: body.cart?.checkout_link ? `https://pay.kiwify.com.br/checkout/${body.cart.checkout_link}` : 'https://pay.kiwify.com.br/v2XN6QB'
        };
        await sendEmail({
          to: customerEmail,
          subject: 'Seu filho merece variedade 💚',
          html: cartAbandonedTemplate(emailData)
        });
        console.log(`✅ Email de recuperação enviado para ${customerEmail}`);
      } else {
        console.log('⚠️ Email não encontrado para enviar recuperação.');
      }
    }
    
    // ⚪️ OUTRO STATUS NÃO ESPERADO
    else {
      console.log(`⚪️ Status '${status}' não processado.`);
    }
    
    console.log(`[${new Date().toISOString()}] ✅ Webhook processado com sucesso.`);
    console.log('================================================\n');

    // A Kiwify espera uma resposta 200 para confirmar o recebimento do webhook
    return Response.json({ 
      success: true,
      message: 'Webhook processado.',
      processedStatus: status
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('❌ Erro crítico no processamento do webhook:', error);
    console.log('================================================\n');
    // É crucial responder 200 mesmo em caso de erro para evitar que a Kiwify reenvie o webhook indefinidamente.
    return Response.json({ 
        success: false, 
        error: 'Erro interno no servidor.',
        message: 'Ocorreu um erro, mas o webhook foi recebido.' 
    }, { status: 200 });
  }
}

export const dynamic = 'force-dynamic';
