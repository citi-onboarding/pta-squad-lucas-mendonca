export type BookCategory =
  | "ROMANCE"
  | "INFANTIL"
  | "TECNOLOGIA"
  | "HISTORIA"
  | "CIENCIAS";

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