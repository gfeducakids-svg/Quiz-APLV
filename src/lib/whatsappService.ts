// src/lib/whatsappService.ts
import axios from 'axios';

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

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
}
