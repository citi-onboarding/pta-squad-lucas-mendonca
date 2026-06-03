import { useState } from "react";
import api from "./api"; 
import { MailStatus, OverdueEmailPayload, LoanConfirmationPayload } from "@/types/mailTypes";

export async function sendOverdueEmailRequest(payload: OverdueEmailPayload): Promise<boolean> {
  try {
    await api.post("/mail/overdue", payload);
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

export function useSendOverdueEmail() {
  const [statuses, setStatuses] = useState<Record<string, MailStatus>>({});

  function getStatus(loanId: string): MailStatus {
    return statuses[loanId] ?? "idle";
  }

  async function sendEmail(loanId: string, payload: OverdueEmailPayload) {
    setStatuses((prev) => ({ ...prev, [loanId]: "sending" }));

    const success = await sendOverdueEmailRequest(payload);

    setStatuses((prev) => ({
      ...prev,
      [loanId]: success ? "sent" : "error",
    }));

    setTimeout(() => {
      setStatuses((prev) => ({ ...prev, [loanId]: "idle" }));
    }, 3000);
  }

  return { getStatus, sendEmail };
}