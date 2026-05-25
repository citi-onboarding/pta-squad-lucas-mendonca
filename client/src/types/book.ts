import { z } from "zod";

//Validation schema using Zod to enforce form rules and required fields
export const bookSchema = z.object({
    title: z.string().min(1, "Este é um campo obrigatório."),
    author: z.string().min(1, "Este é um campo obrigatório."),
    isbn: z.string().min(1, "Este é um campo obrigatório."),
    publisher: z.string().min(1, "Este é um campo obrigatório."),
    year: z.string().min(1, "Este é um campo obrigatório."),
    quantity: z.string().min(1, "Este é um campo obrigatório."),
    category: z.string().min(1, "Este é um campo obrigatório.")
});

export type BookFormData = z.infer<typeof bookSchema>;