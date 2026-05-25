
export type BookCategory = "ROMANCE" | "INFANTIL" | "TECNOLOGIA" | "HISTORIA" | "CIENCIAS";

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  year: number;
  totalQuantity: number;
  availableQuantity: number;
  category: BookCategory;
}

export interface BookCardProps {
  id: string;
  title: string;
  author: string;
  category: BookCategory
  availableQuantity: number;
  onView: (id: string) => void;
  onLoan: (id: string) => void;
  onDelete: (id: string) => void;
}

enum Category {
  ROMANCE = "ROMANCE",
  INFANTIL = "INFANTIL",
  TECNOLOGIA = "TECNOLOGIA",
  HISTORIA = "HISTORIA",
  CIENCIAS = "CIENCIAS"
}

export interface CreateBook {
  title: string;
  author: string; 
  isbn: string;
  publisher: string;
  year: number;
  totalQuantity: number;
  category: Category;
}

export interface UpdateBook extends Partial<CreateBook> {}
