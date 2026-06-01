import api from "./api"; 
import { MailStatus, OverdueEmailPayload, LoanConfirmationPayload } from "@/types/mailTypes";

export async function sendOverdueEmailRequest(payload: OverdueEmailPayload): Promise<boolean> {
  try {
    await api.post("/api/mail/overdue", payload);
    return true;
  } catch (error) {
    console.error("[sendOverdueEmail]", error);
    return false;
  }
}

export async function sendLoanConfirmation(payload: LoanConfirmationPayload): Promise<boolean> {
  try {
    await api.post("/mail/confirmation", payload);
    return true;
  } catch (error) {
    console.error("[sendLoanConfirmation]", error);
    return false;
  }
}
