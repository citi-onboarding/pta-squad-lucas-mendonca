export interface OverdueEmailPayload {
  userEmail: string;
  userName: string;
  bookTitle: string;
  dueDate: string;
}

export interface LoanConfirmationPayload {
  userEmail: string;
  userName: string;
  bookTitle: string;
  loanDate: string;
  dueDate: string;
}

export type MailStatus = "idle" | "sending" | "sent" | "error";

export const overdueButtonConfig: Record<MailStatus,{ label: string; disabled: boolean; className: string }> = {
  idle:    { label: "Enviar Lembrete",  disabled: false, className: "text-[#2C4A73] border border-[#2C4A73] hover:bg-[#2C4A73]/10" },
  sending: { label: "Enviando...",      disabled: true,  className: "text-gray-400 border border-gray-300 cursor-not-allowed" },
  sent:    { label: "✓ Enviado",        disabled: true,  className: "text-green-600 border border-green-600 cursor-not-allowed" },
  error:   { label: "Tentar novamente", disabled: false, className: "text-red-600 border border-red-600 hover:bg-red-50" },
};