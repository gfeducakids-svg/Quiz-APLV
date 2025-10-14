// src/lib/whatsappService.ts
import axios from 'axios';

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

/**
 * Formata um número de telefone para o padrão E.164, removendo caracteres não numéricos.
 * Garante que o número comece com 55 (código do Brasil) se for um número brasileiro.
 * @param phone - O número de telefone a ser formatado.
 * @returns O número de telefone formatado.
 */
function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  let digits = phone.replace(/\D/g, '');
  
  // Se o número já tem o código do país (55), não faz nada.
  if (digits.startsWith('55')) {
    return digits;
  }
  
  // Se for um número brasileiro comum (com DDD), adiciona o 55.
  if (digits.length === 11 || digits.length === 10) {
    return `55${digits}`;
  }
  
  // Retorna os dígitos como estão se não for um padrão reconhecido.
  return digits;
}


/**
 * Envia uma mensagem de texto via WhatsApp Business API.
 * @param to - O número de telefone do destinatário.
 * @param message - O corpo da mensagem de texto.
 */
export async function sendWhatsAppMessage(to: string, message: string) {
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    console.error('❌ Credenciais do WhatsApp não configuradas nas variáveis de ambiente. Mensagem não enviada.');
    return;
  }
  
  const formattedPhone = formatPhoneNumber(to);
  if (!formattedPhone) {
      console.error('❌ Número de telefone inválido ou não fornecido. Mensagem não enviada.');
      return;
  }

  const payload = {
    messaging_product: 'whatsapp',
    to: formattedPhone,
    type: 'text',
    text: {
      preview_url: false,
      body: message
    }
  };

  try {
    console.log(`...Enviando WhatsApp para ${formattedPhone}`);
    const response = await axios.post(
      `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Mensagem de WhatsApp enviada com sucesso:', {
      to: formattedPhone,
      messageId: response.data.messages[0].id
    });
    
    return response.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.error?.code;
    const errorMessage = error.response?.data?.error?.message || error.message;

    if (errorCode === 133010) {
      console.error(`
❌ ERRO CRÍTICO: Número não registrado (#133010)
Tentativa de envio para: ${formattedPhone}

📋 MOTIVO PROVÁVEL:
Você está usando um NÚMERO DE TESTE da Meta, que SÓ PODE enviar mensagens para números pré-aprovados.

🔑 SOLUÇÃO IMEDIATA:
1. Acesse o painel do seu aplicativo na Meta for Developers.
2. Vá para a seção "WhatsApp" > "Configuração da API".
3. No Passo 2 ("Envie e receba mensagens"), clique no menu suspenso "Para".
4. Clique em "Gerenciar lista de números de telefone" e adicione o número de destino.
5. Verifique o número com o código que será enviado a ele.
6. Tente novamente.

(Se o número já estiver em produção, verifique se ele possui uma conta do WhatsApp ativa).
      `);
    } else {
        console.error(`❌ Erro ao enviar mensagem de WhatsApp para ${formattedPhone}:`);
        if (error.response) {
          console.error('Dados do erro:', JSON.stringify(error.response.data, null, 2));
          console.error('Status do erro:', error.response.status);
        } else if (error.request) {
          console.error('Requisição enviada, mas sem resposta:', error.request);
        } else {
          console.error('Erro na configuração da requisição:', error.message);
        }
        console.error('Payload enviado:', JSON.stringify(payload, null, 2));
    }
    
    // Lançamos o erro para que a chamada original saiba que falhou, mas com uma mensagem clara.
    throw new Error(`WhatsApp API Error ${errorCode}: ${errorMessage}`);
  }
}
