import { CreateLoan, UpdateLoanStatus, FindLoan } from "@/types/loanTypes";
import api from "./api";


export const createLoan = async(loanData: CreateLoan) => {
    return api.post(`/loans`, loanData)
}

export const findAllLoans = async() => {
    return api.get(`/loans`)
}

export const findLoanById = async(loanData: FindLoan) => {
    return api.get(`/loans/${loanData.loanId}`)
}

export const updateLoanStatus = async(loanData: UpdateLoanStatus) => {
    return api.patch(`/loans/${loanData.loanId}`, loanData)
}

export const findBookLoans = async(bookId: string) => {
    return api.get(`/loans/book/${bookId}`)
}

export const getLoanMetricsByCategory = (period: string) => {
  return api.get(`/loans/metrics?period=${period}`);
};