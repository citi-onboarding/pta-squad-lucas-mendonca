import { PrismaClient, Prisma } from '@prisma/client';
import { CreateBookDTO, UpdateBookDTO } from '../DTOs/bookDTO';

const prisma = new PrismaClient();

export class BookRepository {
  async createBook(data: CreateBookDTO & { availableQuantity: number }) {
    return await prisma.book.create({ data });
  }

  async findAllBooks(filters: Prisma.BookWhereInput) {
    return await prisma.book.findMany({
      where: filters,
    });
  }

  async findBookById(id: string) {
    return await prisma.book.findUnique({
      where: { id },
    });
  }

  async updateBook(id: string, data: UpdateBookDTO) {
    return await prisma.book.update({
      where: { id },
      data,
    });
  }

  async deleteBook(id: string) {
    return await prisma.book.delete({
      where: { id },
    });
  }
}