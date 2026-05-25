import { Book } from "./bookTypes"

enum Status {
  EM_ANDAMENTO = "EM_ANDAMENTO",
  DEVOLVIDO = "DEVOLVIDO",
  ATRASADO = "ATRASADO",
}

export interface Loan {
  id: string;
  bookId: string;
  book: Book;  
  customerName: string;
  customerEmail: string;
  loanDate: string;
  dueDate: string;
  status: Status;
}

export interface CreateLoan {
    bookId : string,
    customerName : string,
    customerEmail : string,
    dueDate : Date,
}

export interface FinishLoan {
    loanId : string
}

export interface FindLoan extends Partial<FinishLoan>{}