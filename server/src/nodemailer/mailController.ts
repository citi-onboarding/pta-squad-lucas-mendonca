import { Request, Response } from "express";
import { MailHandler } from "./mailHandler";
import { buildOverdueEmaillHtml, buildLoanConfirmationHtml } from "./mailTemplate";

export async function sendOverdueEmailController(
    req: Request,
    res: Response
): Promise<void> {
    const { userEmail, userName, bookTitle, dueDate } = req.body;

    if(!userEmail || !userName || !bookTitle || !dueDate) {
        res.status(400).json({
            error: "Campos obrigatórios ausentes.",
            required: ["userEmail", "userName", "bookTitle", "dueDate"],
        });
        return;
    } 
    
    const html = buildOverdueEmaillHtml({ userName, bookTitle, dueDate});

    const success = await MailHandler({
        userName,
        userEmail,
        subjectText: `⚠️ Devolução Atrasada: "${bookTitle}"`,
        html,
    });

    if (!success){
        res.status(500).json({
            error: 'Falha ao enviar e-mail.'
        });
        return;
    }

    res.status(200).json({success: true});
}

export async function sendConfirmationEmailController(
    req: Request,
    res:Response
): Promise<void> {
    const { userEmail, userName, bookTitle, loanDate, dueDate } = req.body;

    if(!userEmail || !userName || !bookTitle || !loanDate || !dueDate){
        res.status(400).json({
            error: "Campos obrigatórios ausentes.",
            required: [ "userEmail", "userName", "bookTitle", "loanDate", "dueDate"],
        });
        return;
    }
    const html = buildLoanConfirmationHtml({ userName, bookTitle, loanDate, dueDate });

    const success = await MailHandler({
        userName,
        userEmail,
        subjectText: `📖 Confirmação de Empréstimo: "${bookTitle}"`,
        html,
    });

    if(!success){
        res.status(500).json({ error: "Falha ao enviar e-mail." });
        return;
    }

    res.status(200).json({ success: true });
}
