import { findManyBooks } from "@/services/books";
import { findAllLoans } from "@/services/loans"; 
import { Book } from "@/types/bookTypes";
import { Loan } from "@/types/loanTypes";

export type { Book, Loan };

export interface DashboardData {
  books: Book[];
  loans: Loan[];
}

function handleRequestError(
  error: unknown,
  defaultMessage: string
): never {
  console.error(defaultMessage, error);

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error(defaultMessage);
}

async function fetchBookData(): Promise<Book[]> {
   try{
    const response = await findManyBooks();
    return response.data;
   } catch (error){
    handleRequestError(
      error,
      "Não foi possível carregar os livros"
    )
   } 
    
}

async function fetchLoanData(): Promise<Loan[]> {
  try {
    const response = await findAllLoans();
    return response.data;  
  } catch (error) {
    handleRequestError(
      error,
      "Não foi possível carregar os empréstimos"
    )
  }
}

export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const [books, loans] = await Promise.all([
    fetchBookData(),
    fetchLoanData(),
  ]);

  return { books, loans };
  } catch (error) {
    handleRequestError(
      error,
      "Erro ao carregar os dados do dashboard"
    )
  }
}