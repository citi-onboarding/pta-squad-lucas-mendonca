import { LoanStatus } from "@prisma/client";

export interface CreateLoanDTO {
    bookId : string,
    customerName : string,
    customerEmail : string,
    dueDate : Date,
}

export interface UpdateLoanStatusDTO {
    loanId : string;
    status: LoanStatus
}

export interface FindLoanDTO extends Partial<UpdateLoanStatusDTO>{}