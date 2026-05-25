import { findManyBooks } from "@/services/books";
import { findAllLoans } from "@/services/loans"; 
import { Book } from "@/types/bookTypes";
import { Loan } from "@/types/loanTypes";

export type { Book, Loan };

export interface DashboardData {
  books: Book[];
  loans: Loan[];
}

async function fetchBookData(): Promise<Book[]> {
  const response = await findManyBooks();
  return response.data;
}

async function fetchLoanData(): Promise<Loan[]> {
  const response = await findAllLoans();
  return response.data;
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const [books, loans] = await Promise.all([
    fetchBookData(),
    fetchLoanData(),
  ]);

  return { books, loans };
}