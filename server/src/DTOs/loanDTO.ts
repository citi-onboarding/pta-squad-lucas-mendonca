export interface CreateLoanDTO {
    bookId : string,
    customerName : string,
    customerEmail : string,
    dueDate : Date,
}

export interface FinishLoanDTO {
    loanId : string,
}