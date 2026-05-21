import { CreateBook, UpdateBook } from "@/types/bookTypes";
import api from "./api";

export const createBook = async (bookData: CreateBook) => {
    api.post('/books', bookData);
}

export const updateBook = async (id: string, bookData: UpdateBook) => {
    api.patch(`/books/${id}`, bookData);
}

export const deleteBook = async (id: string) => {
    api.delete(`/books/${id}`);
}

export const findBookById = (id: string) => {
    return api.get(`/books/${id}`);
}

export const findManyBooks = (filters?: { search?: string; category?: string }) => {
  return api.get('/books', { params: filters });
};