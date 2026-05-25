import { z } from "zod";

export const loanSchema = z.object({
    customerName: z.string().min(1, "Este é um campo obrigatório."),
    customerEmail: z.email("Este é um campo obrigatório."),
    dueDate: z.date().refine
    (
        (value) => {
        const dueDate = new Date(value)
        const today = new Date()

        today.setHours(0,0,0,0)
        dueDate.setHours(0,0,0,0)

        const maxDate = new Date(today)
        maxDate.setDate(today.getDate() + 14)
        return dueDate >= today && dueDate <= maxDate
    }, {message: "A data deve ser entre hoje e no máximo 14 dias depois"})
});

export type LoanFormData = z.infer<typeof loanSchema>;