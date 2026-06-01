export interface OverdueEmailData {
  userName: string;
  bookTitle: string;
  dueDate: string;
}

export interface LoanConfirmationEmailData {
  userName: string;
  bookTitle: string;
  loanDate: string;
  dueDate: string;
}

export function buildOverdueEmaillHtml(data: OverdueEmailData): string {
  const formattedDate = new Date(data.dueDate).toLocaleDateString("pt-BR");

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #dc2626;">📚 Devolução em Atraso</h2>
      <p>Olá, <strong>${data.userName}</strong>!</p>
      <p>
        O livro <strong>"${data.bookTitle}"</strong> estava previsto para devolução
        em <strong>${formattedDate}</strong> e ainda não foi devolvido.
      </p>
      <p>Por favor, regularize a situação o quanto antes para evitar multas.</p>
    </div>
  `;
}

export function buildLoanConfirmationHtml(data: LoanConfirmationEmailData): string {
  const formattedLoanDate = new Date(data.loanDate).toLocaleDateString("pt-BR");
  const formattedDueDate = new Date(data.dueDate).toLocaleDateString("pt-BR");

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #2C4A73;">📖 Confirmação de Empréstimo</h2>
      <p>Olá, <strong>${data.userName}</strong>!</p>
      <p>Seu empréstimo foi realizado com sucesso. Confira os detalhes abaixo:</p>

      <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Livro</td>
            <td style="padding: 8px 0; font-weight: 600;">${data.bookTitle}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Data do Empréstimo</td>
            <td style="padding: 8px 0; font-weight: 600;">${formattedLoanDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Devolução Prevista</td>
            <td style="padding: 8px 0; font-weight: 600; color: #2C4A73;">${formattedDueDate}</td>
          </tr>
        </table>
      </div>

      <div style="margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <h3 style="color: #374151; font-size: 15px; margin-bottom: 12px;">
          📋 Boas práticas para conservação do livro
        </h3>

        <div style="display: flex; flex-direction: column; gap: 12px;">

          <div style="background-color: #eff6ff; border-left: 4px solid #2C4A73; border-radius: 4px; padding: 12px 16px;">
            <p style="margin: 0; font-size: 14px; color: #1e3a5f; font-weight: 600;">
              🔖 Evite dobras e marcações permanentes
            </p>
            <p style="margin: 6px 0 0; font-size: 13px; color: #374151; line-height: 1.5;">
              Não dobre as pontas das páginas para marcar o lugar. Utilize sempre um marcador de páginas
              e evite escrever, grifar ou usar canetas marca-texto no livro.
            </p>
          </div>

          <div style="background-color: #eff6ff; border-left: 4px solid #2C4A73; border-radius: 4px; padding: 12px 16px;">
            <p style="margin: 0; font-size: 14px; color: #1e3a5f; font-weight: 600;">
              🍽️ Mantenha longe de alimentos e bebidas
            </p>
            <p style="margin: 6px 0 0; font-size: 13px; color: #374151; line-height: 1.5;">
              Consumir lanches ou bebidas próximos ao livro pode causar manchas irreparáveis e atrair insetos.
              Procure ler sempre com as mãos limpas e em superfícies secas.
            </p>
          </div>

          <div style="background-color: #eff6ff; border-left: 4px solid #2C4A73; border-radius: 4px; padding: 12px 16px;">
            <p style="margin: 0; font-size: 14px; color: #1e3a5f; font-weight: 600;">
              🎒 Proteja no transporte
            </p>
            <p style="margin: 6px 0 0; font-size: 13px; color: #374151; line-height: 1.5;">
              Ao levar o livro na mochila ou bolsa, certifique-se de que ele não está espremido ou em contato
              com objetos pontiagudos, garrafas de água ou guardado de forma que possa amassar a capa e as páginas.
            </p>
          </div>

        </div>
      </div>

      <p style="margin-top: 20px; font-size: 13px; color: #6b7280;">
        Por favor, devolva o livro até a data prevista para evitar multas. Boa leitura! 📚
      </p>
    </div>
  `;
}