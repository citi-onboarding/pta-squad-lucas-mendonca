enum Status {
    EM_ANDAMENTO = "Em andamento",
    DEVOLVIDO = "Devolvido",
    ATRASADO = "Atrasado",

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

export interface BookLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string;
  bookTitle: string; // Para exibir no retângulo cinza no topo
  onRefreshCatalog: () => void; // Para atualizar o estoque na tela de fundo após o sucesso
}

export interface FindLoan extends Partial<FinishLoan>{}