import { BookCategory } from '@/types/bookTypes';
export interface Loan {
  id: string;
  customerName: string;
  customerEmail: string;
  loanDate: string; 
  dueDate: string;  
  status: 'EM_ANDAMENTO' | 'DEVOLVIDO';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  totalQuantity: number;
  category: BookCategory;
  year: number;
  availableQuantity: number;
  loans: Loan[];
}

export interface BookDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string | null;
  onRefreshCatalog: () => void;
}