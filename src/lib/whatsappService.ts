// src/lib/whatsappService.ts
import axios from 'axios';

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

<<<<<<< HEAD
interface SendWhatsAppMessageParams {
  to: string;
  message: string;
}

function formatPhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '');

    // If it starts with 55 and is longer than 11 digits (55 + DDD + 9xxxxxxxx),
    // it likely has the country code already.
    if (cleaned.startsWith('55') && cleaned.length > 11) {
        return cleaned;
    }

    // If it doesn't start with 55, add it.
    if (!cleaned.startsWith('55')) {
        cleaned = '55' + cleaned;
    }
    
    return cleaned;
}

export async function sendWhatsAppMessage({ to, message }: SendWhatsAppMessageParams): Promise<any> {
    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
        console.error('Credenciais do WhatsApp não configuradas nas variáveis de ambiente.');
        throw new Error('Serviço de WhatsApp não configurado.');
    }

    const formattedPhone = formatPhoneNumber(to);

    try {
        const response = await axios.post(
            `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: 'whatsapp',
                to: formattedPhone,
                type: 'text',
                text: {
                    preview_url: false,
                    body: message
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('📱 Mensagem de WhatsApp enviada com sucesso para:', formattedPhone, response.data);
        return response.data;
    } catch (error: any) {
        console.error('❌ Erro ao enviar WhatsApp:', error.response?.data || error.message);
        // Don't throw error to not stop the main webhook flow
        return { error: error.response?.data || error.message };
    }
=======
/**
 * Formata um número de telefone para o padrão E.164, removendo caracteres não numéricos.
 * Garante que o número comece com 55 (código do Brasil) se for um número brasileiro.
 * @param phone - O número de telefone a ser formatado.
 * @returns O número de telefone formatado.
 */
function formatPhoneNumber(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('55')) {
    return digits;
  }
  if (digits.length === 11 || digits.length === 10) {
    return `55${digits}`;
  }
  return digits;
}


/**
 * Envia uma mensagem de texto via WhatsApp Business API.
 * @param to - O número de telefone do destinatário.
 * @param message - O corpo da mensagem de texto.
 */
export async function sendWhatsAppMessage(to: string, message: string) {
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    console.error('❌ Credenciais do WhatsApp não configuradas nas variáveis de ambiente.');
    // Não lança erro para não parar o fluxo principal (ex: envio de email)
    return;
  }
  
  const formattedPhone = formatPhoneNumber(to);

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: formattedPhone,
        type: 'text',
        text: {
          preview_url: false,
          body: message
        }
      },
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
    console.error('❌ Erro ao enviar mensagem de WhatsApp:', error.response?.data || error.message);
    // Não lança erro para não parar o fluxo do webhook
  }
>>>>>>> 616207a (# Prompt para IA - Sistema de Notificações WhatsApp)
}
