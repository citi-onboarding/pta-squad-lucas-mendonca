import { Request, Response } from "express";
import { MailHandler } from './mailHandler';
import { buildOverdueEmaillHtml } from "./mailTemplate";

export async function sendOverdueEmailController(
    req: Request,
    res: Response
): Promise<void> {
    const { userEmail, userName, bookTitle, dueDate, loanId } = req.body;

    if(!userEmail || !userName || !bookTitle || !dueDate || !loanId) {
        res.status(400).json({
            error: 'Campos obrigatórios ausentes.',
            required: ['userEmail', 'userName', 'bookTitle', 'dueDate', 'loanId'],
        });

        return;
    } 

    const html = buildOverdueEmaillHtml({ userName, bookTitle, dueDate, loanId });

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

