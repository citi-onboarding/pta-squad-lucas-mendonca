import { Category } from '@prisma/client';

export interface CreateBookDTO {
  title: string;
  autor: string; 
  isbn: string;
  publisher: string;
  year: number;
  totalQuantity: number;
  category: Category;
}

export interface UpdateBookDTO extends Partial<CreateBookDTO> {}