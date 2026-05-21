import { Request, Response } from 'express';
import { BookRepository } from '../repositories/bookRepository';
import { CreateBookDTO, UpdateBookDTO } from '../DTOs/bookDTO';
import { Category } from '@prisma/client';

const bookRepository = new BookRepository();

export class BookController {
  
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data: CreateBookDTO = req.body;
      
      const bookData = {
        ...data,
        availableQuantity: data.totalQuantity
      };

      const newBook = await bookRepository.createBook(bookData);
      return res.status(201).json(newBook);
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno ao criar o livro." });
    }
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { search, category } = req.query;
      const filters: any = {};

      if (search) {
        filters.OR = [
          { title: { contains: String(search), mode: 'insensitive' } },
          { author: { contains: String(search), mode: 'insensitive' } }
        ];
      }

      if (category) {
        filters.category = String(category).toUpperCase();
      }

      const books = await bookRepository.findAllBooks(filters);
      return res.status(200).json(books);
      
    } catch (error) {
      return res.status(500).json({ error: "Erro interno ao buscar livros." });
    }
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const book = await bookRepository.findBookById(id);

      if (!book) {
        return res.status(404).json({ error: "Livro não encontrado." });
      }

      return res.status(200).json(book);
      
    } catch (error) {
      return res.status(500).json({ error: "Erro interno ao buscar o livro." });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const data: UpdateBookDTO = req.body;

      const existingBook = await bookRepository.findBookById(id);
      if (!existingBook) {
        return res.status(404).json({ error: "Livro não encontrado." });
      }

      const updatedBook = await bookRepository.updateBook(id, data);
      return res.status(200).json(updatedBook);
      
    } catch (error) {
      return res.status(500).json({ error: "Erro interno ao atualizar o livro." });
    }
  };

  remove = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      await bookRepository.deleteBook(id);
      
      return res.status(200).json({ message: "Livro removido com sucesso." });
      
    } catch (error: any) {
      if (error.code === 'P2003') {
        return res.status(400).json({ error: "Livro possui histórico e não pode ser apagado." });
      }
      return res.status(500).json({ error: "Erro interno ao apagar o livro." });
    }
  };
}