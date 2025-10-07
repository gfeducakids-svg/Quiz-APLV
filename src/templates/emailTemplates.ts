// src/templates/emailTemplates.ts

interface ConfirmationEmailProps {
  name: string;
  orderRef: string;
  value: string;
  accessUrl: string;
  productName: string;
}

interface AbandonedCartEmailProps {
  name: string;
  productName: string;
}

export function getConfirmationEmail({ name, orderRef, value, accessUrl, productName }: ConfirmationEmailProps): string {
  // Substitui os placeholders no template HTML
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pagamento Confirmado</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f0fdf4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; padding: 40px 20px;">
          <tr>
              <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      
                      <!-- Header verde -->
                      <tr>
                          <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
                              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                                  🎉 Parabéns, ${name}!
                              </h1>
                              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">
                                  Seu pagamento foi confirmado
                              </p>
                          </td>
                      </tr>
                      
                      <!-- Corpo -->
                      <tr>
                          <td style="padding: 40px 30px;">
                              <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                  Você acaba de dar o passo mais importante para transformar a alimentação do seu filho. O <strong>${productName}</strong> já está esperando por você.
                              </p>
                              
                              <!-- Detalhes do pedido -->
                              <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; margin: 30px 0;">
                                  <tr>
                                      <td style="color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;">
                                          Pedido
                                      </td>
                                      <td style="color: #1f2937; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid #e5e7eb;">
                                          #${orderRef}
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="color: #6b7280; font-size: 14px;">
                                          Valor
                                      </td>
                                      <td style="color: #10b981; font-size: 18px; font-weight: bold; text-align: right;">
                                          ${value}
                                      </td>
                                  </tr>
                              </table>
                              
                              <h2 style="color: #1f2937; font-size: 20px; margin: 30px 0 15px 0; font-weight: bold;">
                                  O que fazer agora:
                              </h2>
                              
                              <ol style="color: #4b5563; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                                  <li style="margin-bottom: 10px;">Clique no botão abaixo para acessar seu cardápio</li>
                                  <li style="margin-bottom: 10px;">Salve o link nos favoritos (você terá acesso vitalício)</li>
                                  <li style="margin-bottom: 10px;">Explore as 1000 receitas organizadas por idade e tempo</li>
                                  <li>Comece hoje mesmo a trazer variedade e segurança para a mesa</li>
                              </ol>
                              
                              <!-- Botão CTA -->
                              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 35px 0;">
                                  <tr>
                                      <td align="center">
                                          <a href="${accessUrl}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">
                                              ✓ Acessar Meu Cardápio Agora
                                          </a>
                                      </td>
                                  </tr>
                              </table>
                              
                              <!-- Garantia -->
                              <table width="100%" cellpadding="15" cellspacing="0" style="background-color: #f0fdf4; border-left: 4px solid #10b981; border-radius: 8px; margin: 30px 0;">
                                  <tr>
                                      <td>
                                          <p style="color: #065f46; font-size: 14px; margin: 0; font-weight: 600;">
                                              🛡️ Garantia de 7 Dias
                                          </p>
                                          <p style="color: #047857; font-size: 13px; margin: 8px 0 0 0; line-height: 1.5;">
                                              Não gostou? É só responder este email em até 7 dias e devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                          <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                              <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                                  Dúvidas? Estamos aqui para ajudar!
                              </p>
                              <p style="color: #10b981; font-size: 14px; margin: 0; font-weight: 600;">
                                  Responda este email ou use o chat no site
                              </p>
                              <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0 0;">
                                  Cardápio Sem Leite da Mãe Prevenida<br>
                                  Você recebeu este email porque finalizou uma compra conosco.
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

export function getAbandonedCartEmail({ name, productName }: AbandonedCartEmailProps): string {
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
                                          <a href="https://pay.kiwify.com.br/v2XN6QB" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 18px 45px; border-radius: 8px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">
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
