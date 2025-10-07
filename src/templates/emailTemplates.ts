// src/templates/emailTemplates.ts

interface ConfirmationEmailProps {
  name: string;
  orderRef: string;
  value: string;
}

interface AbandonedCartEmailProps {
  name: string;
  productName: string;
  checkoutUrl: string;
}

export function getConfirmationEmail({ name, orderRef, value }: ConfirmationEmailProps): string {
  let template = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f0fdf4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; padding: 20px;">
          <tr>
              <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 100%;">
                      
                      <!-- Hero verde com emoji -->
                      <tr>
                          <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 35px 25px; text-align: center;">
                              <div style="font-size: 56px; margin-bottom: 12px;">🎉</div>
                              <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">
                                  BEM-VINDA, [NOME]!
                              </h1>
                              <p style="color: rgba(255,255,255,0.95); margin: 8px 0 0 0; font-size: 15px; font-weight: 500;">
                                  Seu acesso já está liberado 🔓
                              </p>
                          </td>
                      </tr>
                      
                      <!-- Confirmação imediata -->
                      <tr>
                          <td style="background-color: #ecfdf5; padding: 20px 25px; border-bottom: 2px dashed #10b981;">
                              <p style="color: #065f46; font-size: 15px; font-weight: 700; margin: 0; text-align: center;">
                                  ✓ Pagamento Confirmado • Pedido #[ORDER_REF]
                              </p>
                          </td>
                      </tr>
                      
                      <!-- Corpo principal -->
                      <tr>
                          <td style="padding: 35px 25px;">
                              
                              <!-- Próximo passo URGENTE -->
                              <table width="100%" cellpadding="18" cellspacing="0" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 10px; margin-bottom: 25px; border: 2px solid #f59e0b;">
                                  <tr>
                                      <td>
                                          <p style="color: #92400e; font-size: 13px; font-weight: 700; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                                              ⚡Instruções para seu acesso:
                                          </p>
                                          <p style="color: #78350f; font-size: 15px; font-weight: 600; margin: 0; line-height: 1.5;">
                                              Clique no botão verde abaixo AGORA para salvar seu acesso vitalício. Este link é único e pessoal.
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                              
                              <!-- CTA GIGANTE -->
                              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 30px 0;">
                                  <tr>
                                      <td align="center">
                                          <a href="https://drive.google.com/drive/folders/1J8E8L5jShNTgX98Q_R6atm8t7Eeqpi5a?usp=sharing" style="display: block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 20px 30px; border-radius: 10px; font-size: 19px; font-weight: 800; text-align: center; box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4); border: 3px solid #047857;">
                                              🚀 ACESSAR MINHAS 1000 RECEITAS AGORA
                                          </a>
                                          <p style="color: #6b7280; font-size: 12px; margin: 10px 0 0 0; text-align: center;">
                                              Clique aqui ☝️ ou copie: https://drive.google.com/drive/folders/1J8E8L5jShNTgX98Q_R6atm8t7Eeqpi5a?usp=sharing
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                              
                              <!-- Checklist de ação -->
                              <h2 style="color: #1f2937; font-size: 18px; margin: 0 0 15px 0; font-weight: 700; border-bottom: 2px solid #10b981; padding-bottom: 8px;">
                                  ✅ Seus Próximos 3 Passos:
                              </h2>
                              
                              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                                  <tr>
                                      <td style="padding: 12px; background-color: #f9fafb; border-left: 4px solid #10b981; margin-bottom: 8px; border-radius: 6px;">
                                          <p style="color: #1f2937; font-size: 15px; font-weight: 600; margin: 0 0 4px 0;">
                                              1️⃣ Clique no botão verde e salve o link
                                          </p>
                                          <p style="color: #6b7280; font-size: 13px; margin: 0;">
                                              Adicione aos favoritos. É seu para sempre.
                                          </p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="padding: 12px; background-color: #f9fafb; border-left: 4px solid #10b981; margin-bottom: 8px; border-radius: 6px;">
                                          <p style="color: #1f2937; font-size: 15px; font-weight: 600; margin: 0 0 4px 0;">
                                              2️⃣ Escolha 3 receitas para esta semana
                                          </p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="padding: 12px; background-color: #f9fafb; border-left: 4px solid #10b981; border-radius: 6px;">
                                          <p style="color: #1f2937; font-size: 15px; font-weight: 600; margin: 0 0 4px 0;">
                                              3️⃣ Veja seu filho comer e sorrir
                                          </p>
                                          <p style="color: #6b7280; font-size: 13px; margin: 0;">
                                              E sinta a paz que você merece. 💚
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                  
                              
                              <!-- Garantia em destaque -->
                              <table width="100%" cellpadding="16" cellspacing="0" style="background-color: #f0fdf4; border: 2px solid #10b981; border-radius: 10px; margin-bottom: 20px;">
                                  <tr>
                                      <td style="text-align: center;">
                                          <div style="font-size: 32px; margin-bottom: 8px;">🛡️</div>
                                          <p style="color: #065f46; font-size: 16px; margin: 0 0 6px 0; font-weight: 700;">
                                              Garantia de 7 Dias
                                          </p>
                                          <p style="color: #047857; font-size: 14px; margin: 0; line-height: 1.5;">
                                              Não gostou? <strong>Responda este email</strong> em até 7 dias<br>e devolvemos 100% do valor. Zero burocracia.
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                              
                              <!-- Suporte urgente -->
                              <p style="color: #4b5563; font-size: 14px; text-align: center; margin: 20px 0 0 0; line-height: 1.6;">
                                  Dúvida? Problema para acessar?<br>
                                  <strong style="color: #10b981;">Responda este email</strong> ou use o chat no site.<br>
                                  <span style="color: #6b7280; font-size: 13px;">Respondemos em minutos. ⚡</span>
                              </p>
                              
                          </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                          <td style="background-color: #f9fafb; padding: 20px 25px; text-align: center; border-top: 1px solid #e5e7eb;">
                              <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.5;">
                                  Cardápio Sem Leite da Mãe Prevenida<br>
                                  <strong style="color: #6b7280;">Pedido #[ORDER_REF] • [VALOR]</strong>
                              </p>
                          </td>
                      </tr>
                      
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>
  `;
  
  return template
    .replace(/\[NOME\]/g, name)
    .replace(/\[ORDER_REF\]/g, orderRef)
    .replace(/\[VALOR\]/g, value);
}

export function getAbandonedCartEmail({ name, productName, checkoutUrl }: AbandonedCartEmailProps): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Você estava quase lá...</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fef3c7;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; padding: 40px 20px;">
          <tr>
              <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      
                      <!-- Header -->
                      <tr>
                          <td style="padding: 40px 30px; text-align: center;">
                              <div style="font-size: 48px; margin-bottom: 15px;">😔</div>
                              <h1 style="color: #1f2937; margin: 0; font-size: 26px; font-weight: bold;">
                                  Você estava tão perto, ${name}...
                              </h1>
                              <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">
                                  Notamos que você não finalizou sua compra do ${productName}
                              </p>
                          </td>
                      </tr>
                      
                      <!-- Corpo -->
                      <tr>
                          <td style="padding: 0 30px 40px 30px;">
                              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                                  Sabemos como é difícil alimentar uma criança com APLV. A repetição, o medo de errar, a frustração de ver seu filho recusar comida...
                              </p>
                              
                              <p style="color: #1f2937; font-size: 17px; line-height: 1.6; margin: 0 0 25px 0; font-weight: 600;">
                                  Mas não precisa continuar assim.
                              </p>
                              
                              <!-- O que você perde -->
                              <table width="100%" cellpadding="15" cellspacing="0" style="background-color: #f0fdf4; border-radius: 8px; margin: 25px 0;">
                                  <tr>
                                      <td>
                                          <p style="color: #065f46; font-size: 15px; margin: 0 0 12px 0; font-weight: bold;">
                                              O que está esperando por você:
                                          </p>
                                          <ul style="color: #047857; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                                              <li>1000 receitas testadas e seguras</li>
                                              <li>Variedade para seu filho nunca enjoar</li>
                                              <li>Organização por idade e tempo (sem improviso)</li>
                                              <li>Receitas de festa (inclusão de verdade)</li>
                                              <li>Paz de espírito a cada refeição</li>
                                          </ul>
                                      </td>
                                  </tr>
                              </table>
                              
                              <!-- Urgência -->
                              <table width="100%" cellpadding="15" cellspacing="0" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; margin: 25px 0;">
                                  <tr>
                                      <td>
                                          <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 600;">
                                              ⏰ Preço especial de R$ 35,90 expira em breve
                                          </p>
                                          <p style="color: #b45309; font-size: 13px; margin: 8px 0 0 0;">
                                              Após o timer acabar, o investimento volta para R$ 97,00
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                              
                              <!-- Botão CTA -->
                              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 35px 0;">
                                  <tr>
                                      <td align="center">
                                          <a href="${checkoutUrl}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 18px 45px; border-radius: 8px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">
                                              Finalizar Minha Compra Agora
                                          </a>
                                      </td>
                                  </tr>
                              </table>
                              
                              <!-- Garantia -->
                              <table width="100%" cellpadding="15" cellspacing="0" style="background-color: #f0fdf4; border-radius: 8px; margin: 30px 0;">
                                  <tr>
                                      <td style="text-align: center;">
                                          <p style="color: #065f46; font-size: 15px; margin: 0 0 8px 0; font-weight: bold;">
                                              🛡️ Garantia de 7 Dias • Risco Zero
                                          </p>
                                          <p style="color: #047857; font-size: 13px; margin: 0; line-height: 1.5;">
                                              Não gostou? Devolvemos 100% do seu dinheiro.<br>
                                              Sem perguntas, sem burocracia.
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                              
                              <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 25px 0 0 0; line-height: 1.6;">
                                  Você literalmente não tem nada a perder.<br>
                                  <strong style="color: #1f2937;">E tem tudo a ganhar: paz, variedade e segurança.</strong>
                              </p>
                          </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                          <td style="background-color: #f9fafb; padding: 25px; text-align: center; border-top: 1px solid #e5e7eb;">
                              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                                  Cardápio Sem Leite da Mãe Prevenida<br>
                                  Você recebeu este email porque iniciou uma compra que não foi finalizada.
                              </p>
                          </td>
                      </tr>
                      
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>
  `;
}
