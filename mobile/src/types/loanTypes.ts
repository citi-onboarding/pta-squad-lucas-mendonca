import { Book } from "./bookTypes";

export type LoanStatus = "EM_ANDAMENTO" | "DEVOLVIDO" | "ATRASADO";

export interface Loan {
  id: string;
  bookId: string;
  book: Book;
  customerName: string;
  customerEmail: string;
  loanDate: string;
  dueDate: string;
  status: LoanStatus;
}