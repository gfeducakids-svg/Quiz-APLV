// src/app/api/webhook/kiwify/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { sendEmail } from '@/lib/emailService';
import { 
  paymentApprovedTemplate, 
  cartAbandonedTemplate 
} from '@/templates/emailTemplates';

export async function POST(request: NextRequest) {
  try {
    // 1. Parse do JSON
    const body = await request.json();
    
    // 2. Log para debug
    console.log('📩 Webhook Kiwify recebido:', {
      timestamp: new Date().toISOString(),
      order_id: body.order_id,
      order_ref: body.order_ref,
      status: body.order_status,
      payment_method: body.payment_method,
      event_type: body.webhook_event_type,
      email: body.Customer?.email,
      store_id: body.store_id
    });
    
    // 3. Validação SIMPLES (apenas campos obrigatórios)
    if (!body.Customer?.email) {
      console.error('❌ Email do cliente não encontrado');
      return Response.json(
        { error: 'Email do cliente obrigatório' }, 
        { status: 400 }
      );
    }
    
    if (!body.order_status && !body.webhook_event_type) {
      console.error('❌ Status do pedido não encontrado');
      return Response.json(
        { error: 'Status do pedido obrigatório' }, 
        { status: 400 }
      );
    }
    
    // 4. Validação OPCIONAL de Store ID (segurança extra)
    const STORE_ID = process.env.KIWIFY_STORE_ID;
    if (STORE_ID && body.store_id !== STORE_ID) {
      console.warn('⚠️ Store ID não corresponde:', {
        recebido: body.store_id,
        esperado: STORE_ID
      });
      // NÃO bloqueia, apenas loga
    }
    
    // 5. Processar evento
    const customerEmail = body.Customer.email;
    const customerName = body.Customer.full_name || body.Customer.first_name || 'Cliente';
    
    // COMPRA APROVADA
    if (body.order_status === 'paid') {
      console.log('✅ Compra aprovada, enviando email...');
      
      const emailData = {
        name: customerName,
        order_ref: body.order_ref,
        amount: ((body.Commissions?.[0]?.charge_amount || 3590) / 100).toFixed(2).replace('.', ',')
      };
      
      await sendEmail({
        to: customerEmail,
        subject: '🎉 Acesso Liberado - Cardápio Sem Leite',
        html: paymentApprovedTemplate(emailData)
      });
      
      console.log('✅ Email de confirmação enviado para:', customerEmail);
    }
    
    // CARRINHO ABANDONADO
    else if (body.webhook_event_type === 'cart_abandoned') {
      console.log('🛒 Carrinho abandonado, enviando email...');
      
      const emailData = {
        name: customerName,
        checkout_link: 'https://pay.kiwify.com.br/v2XN6QB'
      };
      
      await sendEmail({
        to: customerEmail,
        subject: 'Seu filho merece variedade 💚',
        html: cartAbandonedTemplate(emailData)
      });
      
      console.log('✅ Email de recuperação enviado para:', customerEmail);
    }
    
    // 6. SEMPRE retornar 200 OK (evita reenvio)
    return Response.json({ 
      success: true,
      message: 'Webhook processado com sucesso'
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('❌ Erro ao processar webhook:', {
      message: error.message,
      stack: error.stack
    });
    
    // ⚠️ IMPORTANTE: Retornar 200 mesmo com erro
    // para evitar que Kiwify reenvie o webhook
    return Response.json({ 
      received: true,
      error: 'Processado com erro, mas recebido'
    }, { status: 200 });
  }
}

// Desabilita body parsing do Next.js (já fazemos manual)
export const dynamic = 'force-dynamic';
