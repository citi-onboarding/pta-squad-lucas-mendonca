export interface OverdueEmailData {
    userName: string;
    bookTitle: string;
    dueDate: string;
    loanId: string;
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
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
      <p style="color: #6b7280; font-size: 12px;">
        Referência do empréstimo: <code>${data.loanId}</code>
      </p>
    </div>
  `;
}