import { Loan } from "../types/loanTypes";
import api from "./api";

export async function findAllLoans() {
  const response = await api.get("/loans");
  return response.data;
}

export async function findLoanById(loanId: string) {
  const response = await api.get(`/loans/${loanId}`);
  return response.data;
}

export async function findBookLoans(bookId: string) {
  const response = await api.get(`/loans/book/${bookId}`);
  return response.data;
}