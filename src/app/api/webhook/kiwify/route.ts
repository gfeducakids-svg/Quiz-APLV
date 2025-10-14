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
    
    console.log('📥 Webhook recebido:', {
      timestamp: new Date().toISOString(),
      order_id: body.order_id,
      status: body.order_status || body.status,
      email: body.Customer?.email || body.email,
      phone: body.Customer?.phone || body.phone
    });
    
    const customerEmail = body.Customer?.email || body.email;
<<<<<<< HEAD
=======
    const customerPhone = body.Customer?.phone || body.phone;
>>>>>>> 616207a (# Prompt para IA - Sistema de Notificações WhatsApp)
    const customerName = body.Customer?.full_name || body.Customer?.first_name || body.first_name || 'Cliente';
    const customerPhone = body.Customer?.phone;

    // ✅ PROCESSAR COMPRA APROVADA
    if (body.order_status === 'paid') {
      console.log('✅ Compra aprovada detectada');
      
<<<<<<< HEAD
      // Envio de Email
=======
>>>>>>> 616207a (# Prompt para IA - Sistema de Notificações WhatsApp)
      if (customerEmail) {
        const emailData = {
          name: customerName,
          access_url: 'https://drive.google.com/drive/folders/1J8E8L5jShNTgX98Q_R6atm8t7Eeqpi5a?usp=sharing',
          order_ref: body.order_ref,
          amount: ((body.Commissions?.[0]?.charge_amount || 3590) / 100).toFixed(2).replace('.', ',')
        };
<<<<<<< HEAD

        await sendEmail({
          to: customerEmail,
          subject: '🎉 Acesso Liberado - Cardápio Sem Leite',
          html: paymentApprovedTemplate(emailData)
        });
        
        console.log('✅ Email de confirmação enviado');
      }

      // Envio de WhatsApp
      if (customerPhone) {
        const valorTotal = ((body.Commissions?.[0]?.charge_amount || 3590) / 100).toFixed(2);
        const whatsappMessage = `🎉 Parabéns ${customerName}!\n\nSeu pagamento foi aprovado com sucesso!\n\n📦 Pedido: #${body.order_ref}\n💰 Valor: R$ ${valorTotal.replace('.', ',')}\n\nSeu acesso ao Cardápio Sem Leite da Mãe Prevenida já está liberado! Acesse aqui:\nhttps://drive.google.com/drive/folders/1J8E8L5jShNTgX98Q_R6atm8t7Eeqpi5a?usp=sharing\n\nObrigado pela sua compra! ❤️`;
        
        await sendWhatsAppMessage({
          to: customerPhone,
          message: whatsappMessage,
        });
=======
        await sendEmail({
          to: customerEmail,
          subject: '🎉 Acesso Liberado - Cardápio Sem Leite',
          html: paymentApprovedTemplate(emailData)
        });
        console.log('✅ Email de confirmação enviado para', customerEmail);
      }

      if (customerPhone) {
        const productName = body.product?.name || "Cardápio Sem Leite da Mãe Prevenida";
        const whatsappMessage = `🎉 Parabéns ${customerName}!\n\nSeu pagamento foi *APROVADO* com sucesso! ✅\n\n📦 Produto: ${productName}\n🔢 Pedido: #${body.order_id}\n\nVocê já pode acessar sua área de membros! 🚀\n\nObrigado pela confiança! 💚`;
        await sendWhatsAppMessage(customerPhone, whatsappMessage);
>>>>>>> 616207a (# Prompt para IA - Sistema de Notificações WhatsApp)
      }
    }
    
    // ✅ PROCESSAR CARRINHO ABANDONADO
    else if (body.status === 'abandoned') {
      console.log('🛒 Carrinho abandonado detectado');
      
<<<<<<< HEAD
      // Envio de Email
      if (customerEmail) {
        const emailData = {
          name: customerName,
          checkout_link: 'https://pay.kiwify.com.br/v2XN6QB'
        };
        
=======
      if (customerEmail) {
        const emailData = {
          name: customerName,
          checkout_link: body.cart?.checkout_link ? `https://pay.kiwify.com.br/checkout/${body.cart.checkout_link}` : 'https://pay.kiwify.com.br/v2XN6QB'
        };
>>>>>>> 616207a (# Prompt para IA - Sistema de Notificações WhatsApp)
        await sendEmail({
          to: customerEmail,
          subject: 'Seu filho merece variedade 💚',
          html: cartAbandonedTemplate(emailData)
        });
<<<<<<< HEAD
        
        console.log('✅ Email de recuperação enviado');
      }

       // Envio de WhatsApp
       if (customerPhone) {
        const valorTotal = (body.total / 100).toFixed(2);
        const produtoNome = body.products?.[0]?.name || 'Cardápio Sem Leite';
        
        const whatsappMessage = `Olá ${customerName}! 👋\n\nNotamos que você deixou um item no seu carrinho:\n• ${produtoNome} - R$ ${valorTotal.replace('.', ',')}\n\nVocê estava a 1 clique de garantir mais de 1000 receitas seguras e dar um passo enorme para a tranquilidade alimentar do seu filho.\n\nFinalize sua compra com um desconto especial antes que o tempo acabe:\nhttps://pay.kiwify.com.br/v2XN6QB 🛒`;

        await sendWhatsAppMessage({
            to: customerPhone,
            message: whatsappMessage,
        });
       }
=======
        console.log('✅ Email de recuperação enviado para', customerEmail);
      }

      if (customerPhone) {
          const checkoutLink = body.cart?.checkout_link ? `https://pay.kiwify.com.br/checkout/${body.cart.checkout_link}` : 'https://pay.kiwify.com.br/v2XN6QB';
          const productName = body.cart?.product_name || "Cardápio Sem Leite da Mãe Prevenida";
          const whatsappMessage = `Olá ${customerName}! 👋\n\nNotamos que você iniciou a compra do *${productName}* mas não finalizou.\n\n😔 Ficou com alguma dúvida?\n\nFinalize agora e garanta seu acesso! 🎯\n\nLink do carrinho: ${checkoutLink}\n\nEstamos aqui para ajudar! 💚`;
          await sendWhatsAppMessage(customerPhone, whatsappMessage);
      }
>>>>>>> 616207a (# Prompt para IA - Sistema de Notificações WhatsApp)
    }
    
    // ⚠️ OUTRO STATUS NÃO ESPERADO
    else {
      console.warn('⚠️ Status não processado:', body.order_status || body.status);
    }
    
    // A Kiwify espera uma resposta 200 para confirmar o recebimento do webhook
    return Response.json({ 
      success: true,
      message: 'Webhook processado com sucesso.',
      processedStatus: body.order_status || body.status
    }, { status: 200 });
    
  } catch (error: any) {
<<<<<<< HEAD
    console.error('❌ Erro no webhook:', error);
    // Retornar 200 mesmo em caso de erro para evitar que a Kiwify reenvie o webhook indefinidamente.
    return Response.json({ received: true, error: error.message }, { status: 200 });
=======
    console.error('❌ Erro crítico no processamento do webhook:', error);
    // É crucial responder 200 mesmo em caso de erro para evitar que a Kiwify reenvie o webhook indefinidamente.
    return Response.json({ 
        success: false, 
        error: 'Erro interno no servidor.',
        message: 'Ocorreu um erro, mas o webhook foi recebido.' 
    }, { status: 200 });
>>>>>>> 616207a (# Prompt para IA - Sistema de Notificações WhatsApp)
  }
}

export const dynamic = 'force-dynamic';
