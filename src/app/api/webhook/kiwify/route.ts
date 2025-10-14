// src/app/api/webhook/kiwify/route.ts
import { NextRequest } from 'next/server';
import { sendEmail } from '@/lib/emailService';
import { sendWhatsAppMessage } from '@/lib/whatsappService';
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
    const customerPhone = body.Customer?.phone || body.phone;
    const customerName = body.Customer?.full_name || body.Customer?.first_name || body.first_name || 'Cliente';
    const status = body.order_status || body.status;
    
    console.log('Dados Extraídos:', {
      status,
      customerName,
      customerEmail,
      customerPhone,
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

      if (customerPhone) {
        console.log('...Preparando WhatsApp de confirmação...');
        const productName = body.product?.name || "Cardápio Sem Leite da Mãe Prevenida";
        const whatsappMessage = `🎉 Parabéns ${customerName}!\n\nSeu pagamento foi *APROVADO* com sucesso! ✅\n\n📦 Produto: ${productName}\n🔢 Pedido: #${body.order_id}\n\nVocê já pode acessar sua área de membros! 🚀\n\nObrigado pela confiança! 💚`;
        await sendWhatsAppMessage(customerPhone, whatsappMessage);
      } else {
        console.log('⚠️ Telefone não encontrado para enviar WhatsApp.');
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

      if (customerPhone) {
        console.log('...Preparando WhatsApp de recuperação...');
        const checkoutLink = body.cart?.checkout_link ? `https://pay.kiwify.com.br/checkout/${body.cart.checkout_link}` : 'https://pay.kiwify.com.br/v2XN6QB';
        const productName = body.cart?.product_name || "Cardápio Sem Leite da Mãe Prevenida";
        const whatsappMessage = `Olá ${customerName}! 👋\n\nNotamos que você iniciou a compra do *${productName}* mas não finalizou.\n\n😔 Ficou com alguma dúvida?\n\nFinalize agora e garanta seu acesso! 🎯\n\nLink do carrinho: ${checkoutLink}\n\nEstamos aqui para ajudar! 💚`;
        await sendWhatsAppMessage(customerPhone, whatsappMessage);
      } else {
        console.log('⚠️ Telefone não encontrado para enviar WhatsApp.');
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
