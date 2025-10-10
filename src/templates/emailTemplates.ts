// src/templates/emailTemplates.ts

interface ConfirmationEmailProps {
  name: string;
  order_ref: string;
  amount: string;
  access_url: string;
}

interface AbandonedCartEmailProps {
  name: string;
  checkout_link: string;
}

export function paymentApprovedTemplate({ name, order_ref, amount, access_url }: ConfirmationEmailProps): string {
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
                                          <a href="[ACCESS_URL]" style="display: block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 20px 30px; border-radius: 10px; font-size: 19px; font-weight: 800; text-align: center; box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4); border: 3px solid #047857;">
                                              🚀 ACESSAR MINHAS 1000 RECEITAS AGORA
                                          </a>
                                          <p style="color: #6b7280; font-size: 12px; margin: 10px 0 0 0; text-align: center;">
                                              Clique aqui ☝️ ou copie: [ACCESS_URL_PLAIN]
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                              
                              <!-- Checklist de ação -->
                              <h2 style="color: #1f2937; font-size: 18px; margin: 0 0 15px 0; font-weight: 700; border-bottom: 2px solid #10b981; padding-bottom: 8px;">
                                  ✅ Seus Próximos 3 Passos:
                              </h2>
                              
                              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                                  <tr><td style="padding: 12px; background-color: #f9fafb; border-left: 4px solid #10b981; margin-bottom: 8px; border-radius: 6px;">
                                    <p style="color: #1f2937; font-size: 15px; font-weight: 600; margin: 0 0 4px 0;">1️⃣ Clique no botão verde e salve o link</p>
                                    <p style="color: #6b7280; font-size: 13px; margin: 0;">Adicione aos favoritos. É seu para sempre.</p>
                                  </td></tr>
                                  <tr><td style="height: 8px;"></td></tr>
                                  <tr><td style="padding: 12px; background-color: #f9fafb; border-left: 4px solid #10b981; margin-bottom: 8px; border-radius: 6px;">
                                    <p style="color: #1f2937; font-size: 15px; font-weight: 600; margin: 0 0 4px 0;">2️⃣ Escolha 3 receitas para esta semana</p>
                                  </td></tr>
                                   <tr><td style="height: 8px;"></td></tr>
                                  <tr><td style="padding: 12px; background-color: #f9fafb; border-left: 4px solid #10b981; border-radius: 6px;">
                                    <p style="color: #1f2937; font-size: 15px; font-weight: 600; margin: 0 0 4px 0;">3️⃣ Veja seu filho comer e sorrir</p>
                                    <p style="color: #6b7280; font-size: 13px; margin: 0;">E sinta a paz que você merece. 💚</p>
                                  </td></tr>
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
                                  <strong style="color: #6b7280;">Pedido #[ORDER_REF] • R$ [VALOR]</strong>
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
    .replace(/\[ORDER_REF\]/g, order_ref)
    .replace(/\[VALOR\]/g, amount)
    .replace(/\[ACCESS_URL\]/g, access_url)
    .replace(/\[ACCESS_URL_PLAIN\]/g, access_url);
}

export function cartAbandonedTemplate({ name, checkout_link }: AbandonedCartEmailProps): string {
  const template = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fff7ed;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff7ed; padding: 20px;">
          <tr>
              <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 100%;">
                      
                      <!-- Header emocional -->
                      <tr>
                          <td style="padding: 35px 25px 25px 25px; text-align: center;">
                              <div style="font-size: 56px; margin-bottom: 15px;">💔</div>
                              <h1 style="color: #1f2937; margin: 0 0 10px 0; font-size: 24px; font-weight: 800; line-height: 1.3;">
                                  [NOME], você estava a 1 clique<br>de nunca mais repetir a mesma receita...
                              </h1>
                              <p style="color: #6b7280; margin: 0; font-size: 15px;">
                                  Mas algo te fez parar. Posso adivinhar o quê?
                              </p>
                          </td>
                      </tr>
                      
                      <!-- Objeções respondidas -->
                      <tr>
                          <td style="padding: 0 25px 30px 25px;">
                              
                              <!-- Objeção 1 -->
                              <table width="100%" cellpadding="14" cellspacing="0" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; margin-bottom: 12px;">
                                  <tr>
                                      <td>
                                          <p style="color: #78350f; font-size: 14px; font-weight: 700; margin: 0 0 6px 0;">
                                              💭 "E se não funcionar comigo?"
                                          </p>
                                          <p style="color: #92400e; font-size: 13px; margin: 0; line-height: 1.5;">
                                              <strong>7 dias de garantia.</strong> Não gostou? Devolvemos tudo. Você literalmente não tem nada a perder.
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                              
                              <!-- Objeção 2 -->
                              <table width="100%" cellpadding="14" cellspacing="0" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; margin-bottom: 12px;">
                                  <tr>
                                      <td>
                                          <p style="color: #78350f; font-size: 14px; font-weight: 700; margin: 0 0 6px 0;">
                                              💭 "Meu filho é muito enjoado..."
                                          </p>
                                          <p style="color: #92400e; font-size: 13px; margin: 0; line-height: 1.5;">
                                              <strong>São 1000 receitas.</strong> Se ele recusar 50, você ainda tem 950 opções. Impossível não encontrar o que ele gosta.
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                              
                              <!-- Objeção 3 -->
                              <table width="100%" cellpadding="14" cellspacing="0" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; margin-bottom: 25px;">
                                  <tr>
                                      <td>
                                          <p style="color: #78350f; font-size: 14px; font-weight: 700; margin: 0 0 6px 0;">
                                              💭 "Vou pensar melhor..."
                                          </p>
                                          <p style="color: #92400e; font-size: 13px; margin: 0; line-height: 1.5;">
                                              Enquanto isso, <strong>você vai servir frango com arroz de novo amanhã?</strong> E depois? E na próxima festa que ele não poderá comer nada?
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                              
                              <!-- Dor vs Solução -->
                              <h2 style="color: #dc2626; font-size: 18px; margin: 0 0 15px 0; font-weight: 700; text-align: center;">
                                  O Que Você Está Perdendo AGORA:
                              </h2>
                              
                              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                                  <tr>
                                      <td style="width: 50%; padding-right: 8px; vertical-align: top;">
                                          <div style="background-color: #fef2f2; border: 2px solid #fca5a5; border-radius: 8px; padding: 15px; height: 100%;">
                                              <p style="color: #991b1b; font-size: 14px; font-weight: 700; margin: 0 0 10px 0; text-align: center;">
                                                  ❌ SEM O CARDÁPIO
                                              </p>
                                              <ul style="color: #b91c1c; font-size: 13px; margin: 0; padding-left: 18px; line-height: 1.7;">
                                                  <li>Mesmas 3 receitas</li>
                                                  <li>Criança enjoada</li>
                                                  <li>Medo constante</li>
                                                  <li>Exclusão em festas</li>
                                                  <li>Culpa diária</li>
                                              </ul>
                                          </div>
                                      </td>
                                      <td style="width: 50%; padding-left: 8px; vertical-align: top;">
                                          <div style="background-color: #f0fdf4; border: 2px solid #86efac; border-radius: 8px; padding: 15px; height: 100%;">
                                              <p style="color: #065f46; font-size: 14px; font-weight: 700; margin: 0 0 10px 0; text-align: center;">
                                                  ✅ COM O CARDÁPIO
                                              </p>
                                              <ul style="color: #047857; font-size: 13px; margin: 0; padding-left: 18px; line-height: 1.7;">
                                                  <li>1000 opções</li>
                                                  <li>Variedade todo dia</li>
                                                  <li>Segurança total</li>
                                                  <li>Bolos de festa</li>
                                                  <li>Paz de espírito</li>
                                              </ul>
                                          </div>
                                      </td>
                                  </tr>
                              </table>
                              
                              <!-- Urgência REAL -->
                              <table width="100%" cellpadding="18" cellspacing="0" style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border: 3px solid #dc2626; border-radius: 10px; margin-bottom: 25px;">
                                  <tr>
                                      <td style="text-align: center;">
                                          <p style="color: #7f1d1d; font-size: 15px; font-weight: 800; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                                              ⚠️ ÚLTIMA CHANCE
                                          </p>
                                          <p style="color: #991b1b; font-size: 17px; font-weight: 700; margin: 0 0 10px 0;">
                                              O preço de R$ 35,90 expira em HORAS
                                          </p>
                                          <p style="color: #b91c1c; font-size: 14px; margin: 0; line-height: 1.5;">
                                              Depois disso, volta para <strong>R$ 97,00</strong>.<br>
                                              Você vai perder <span style="background-color: #7f1d1d; color: #ffffff; padding: 2px 6px; border-radius: 4px; font-weight: 700;">R$ 61,10</span> por hesitar.
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                              
                              <!-- CTA GIGANTE -->
                              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 25px 0;">
                                  <tr>
                                      <td align="center">
                                          <a href="[CHECKOUT_LINK]" style="display: block; background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: #ffffff; text-decoration: none; padding: 22px 30px; border-radius: 10px; font-size: 19px; font-weight: 800; text-align: center; box-shadow: 0 8px 24px rgba(220, 38, 38, 0.4); border: 3px solid #7f1d1d; text-transform: uppercase;">
                                              🔥 SIM, QUERO GARANTIR POR R$ 35,90 AGORA
                                          </a>
                                          <p style="color: #6b7280; font-size: 12px; margin: 8px 0 0 0; text-align: center;">
                                              Acesso imediato • 7 dias de garantia • Sem risco
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                              
                      <!-- Footer -->
                      <tr>
                          <td style="background-color: #f9fafb; padding: 20px 25px; text-align: center; border-top: 1px solid #e5e7eb;">
                              <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px 0; line-height: 1.5;">
                                  <strong>P.S.</strong> Cada dia que passa é mais uma refeição repetida,<br>mais uma festa perdida, mais um momento de culpa.<br>
                                  <span style="color: #1f2937; font-weight: 600;">Você pode mudar isso nos próximos 60 segundos.</span>
                              </p>
                              <p style="color: #9ca3af; font-size: 11px; margin: 12px 0 0 0;">
                                  Cardápio Sem Leite da Mãe Prevenida
                              </p>
                          </td>
                      </tr>
                      
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>`;
  return template.replace(/\[NOME\]/g, name).replace(/\[CHECKOUT_LINK\]/g, checkout_link);
}
