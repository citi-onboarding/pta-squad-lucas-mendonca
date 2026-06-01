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
      orderBy: { loanDate: "desc" },
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

  private buildDateFilter(period: string) {
    if (!period || period === "Desde sempre") return undefined;

    const [year, semester] = period.split(".");
    if (!year || !semester) return undefined;

    if (semester === "1") {
      return {
        gte: new Date(`${year}-01-01T00:00:00.000Z`),
        lte: new Date(`${year}-06-30T23:59:59.999Z`),
      };
    } else if (semester === "2") {
      return {
        gte: new Date(`${year}-07-01T00:00:00.000Z`),
        lte: new Date(`${year}-12-31T23:59:59.999Z`),
      };
    }
    return undefined;
  }

  async getLoansCountByCategory(period: string) {
    const dateFilter = this.buildDateFilter(period);
    const whereCondition = dateFilter ? { loanDate: dateFilter } : {};

    const booksData = await this.prisma.book.findMany({
      select: {
        category: true,
        _count: {
          select: {
            loans: {
              where: whereCondition,
            },
          },
        },
      },
    });

    const groupedMetrics = booksData.reduce((acc, curr) => {
      const category = curr.category;
      const count = curr._count.loans;

      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += count;

      return acc;
    }, {} as Record<string, number>);

    return Object.entries(groupedMetrics).map(([category, count]) => ({
      category,
      count,
    }));
  }
}
