import { CreateLoan, FinishLoan } from "@/types/loanTypes";
import api from "./api";


export const createLoan = async(loanData: CreateLoan) => {
    return api.post(`/loans`, loanData)
}

export const getAllLoans = async() => {
    return api.get(`/loans`)
}

export const finishLoan = async(loanData: FinishLoan) => {
    return api.patch(`/loans/${loanData.loanId}`, loanData)
}