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

export interface FindLoan extends Partial<FinishLoan>{}