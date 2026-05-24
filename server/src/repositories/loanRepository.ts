import { LoanStatus, PrismaClient } from "@prisma/client";
import { CreateLoanDTO, FinishLoanDTO, FindLoanDTO } from "src/DTOs/loanDTO";

export class LoanRepository {
  private prisma = new PrismaClient();

  async findLoanById(data: FindLoanDTO) {
    return await this.prisma.loan.findUnique({
      where: {
        id: data.loanId,
      },
    });
  }

  async findAllLoans() {
    return await this.prisma.loan.findMany({
      include: { book: true },
      orderBy: { loanDate: "asc" },
    });
  }

  async createLoanTransaction(data: CreateLoanDTO) {
    return await this.prisma.$transaction([
      this.prisma.loan.create({
        data: {
          bookId: data.bookId,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          dueDate: data.dueDate,
        },
      }),
      this.prisma.book.update({
        where: { id: data.bookId },
        data: {
          availableQuantity: { decrement: 1 },
        },
      }),
    ]);
  }

  async finishLoanTransaction(data: FinishLoanDTO) {
    return await this.prisma.$transaction(async (tx) => {
      const loan = await tx.loan.findUnique({
        where: { id: data.loanId },
      });

      if (!loan) {
        throw new Error("Empréstimo não encontrado");
      }

      const updatedLoan = await tx.loan.update({
        where: { id: data.loanId },
        data: {
          status: LoanStatus.DEVOLVIDO,
        },
      });

      const updatedBook = await tx.book.update({
        where: { id: loan.bookId },
        data: {
          availableQuantity: { increment: 1 },
        },
      });

      return {
        loan: updatedLoan,
        book: updatedBook,
      };
    });
  }

  async findLoansByBookId(bookId: string) {
    return await this.prisma.loan.findMany({
      where: {
        bookId: bookId,
      },
      orderBy: {
        loanDate: "desc",
      },
    });
  }
}
