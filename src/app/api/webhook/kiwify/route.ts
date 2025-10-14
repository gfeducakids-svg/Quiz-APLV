
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
    
    console.log('📩 Webhook recebido:', {
      timestamp: new Date().toISOString(),
      order_id: body.order_id,
      status: body.status,
      email: body.Customer?.email || body.email
    });
    
    const customerEmail = body.Customer?.email || body.email;
    const customerName = body.Customer?.full_name || body.Customer?.first_name || body.first_name || 'Cliente';
    const customerPhone = body.Customer?.phone;

    // ✅ PROCESSAR COMPRA APROVADA
    if (body.order_status === 'paid') {
      console.log('✅ Compra aprovada');
      
      // Envio de Email
      if (customerEmail) {
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

      // Envio de WhatsApp
      if (customerPhone) {
        const valorTotal = ((body.Commissions?.[0]?.charge_amount || 3590) / 100).toFixed(2);
        const whatsappMessage = `🎉 Parabéns ${customerName}!\n\nSeu pagamento foi aprovado com sucesso!\n\n📦 Pedido: #${body.order_ref}\n💰 Valor: R$ ${valorTotal.replace('.', ',')}\n\nSeu acesso ao Cardápio Sem Leite da Mãe Prevenida já está liberado! Acesse aqui:\nhttps://drive.google.com/drive/folders/1J8E8L5jShNTgX98Q_R6atm8t7Eeqpi5a?usp=sharing\n\nObrigado pela sua compra! ❤️`;
        
        await sendWhatsAppMessage({
          to: customerPhone,
          message: whatsappMessage,
        });
      }
    }
    
    // ✅ PROCESSAR CARRINHO ABANDONADO
    else if (body.status === 'abandoned') {
      console.log('🛒 Carrinho abandonado detectado');
      
      // Envio de Email
      if (customerEmail) {
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
    console.error('❌ Erro no webhook:', error);
    // Retornar 200 mesmo em caso de erro para evitar que a Kiwify reenvie o webhook indefinidamente.
    return Response.json({ received: true, error: error.message }, { status: 200 });
  }
}

export const dynamic = 'force-dynamic';
