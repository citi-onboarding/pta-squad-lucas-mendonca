import { Book, CreateBook, UpdateBook } from "@/types/bookTypes";
import api from "./api";

export const createBook = async (bookData: CreateBook) => {
    return api.post('/books', bookData);
}

export const updateBook = async (id: string, bookData: UpdateBook) => {
    return api.patch(`/books/${id}`, bookData);
}

export const deleteBook = async (id: string) => {
    return api.delete(`/books/${id}`);
}

export const findBookById = (id: string) => {
    return api.get<Book>(`/books/${id}`);
}

export const findManyBooks = (filters?: { search?: string; category?: string }) => {
    return api.get<Book[]>('/books', { params: filters });
};

export const getLoanMetricsByCategory = (period: string) => {
  return api.get(`/loan/metrics?period=${period}`);
};