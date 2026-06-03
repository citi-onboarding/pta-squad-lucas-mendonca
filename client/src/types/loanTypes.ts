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

export interface UpdateLoanStatus {
    loanId : string;
    status: 'DEVOLVIDO' | 'ATRASADO'
}

export interface BookLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string;
  bookTitle: string; // Para exibir no retângulo cinza no topo
  onRefreshCatalog: () => void; // Para atualizar o estoque na tela de fundo após o sucesso
}

export interface FindLoan extends Partial<UpdateLoanStatus>{}