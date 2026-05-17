import { LoanStatus, PrismaClient } from "@prisma/client";
import { CreateLoanDTO, FinishLoanDTO } from "src/DTOs/loanDTO";

export class LoanRepository {
    
    private prisma = new PrismaClient();
    
    async findBookById(bookId: string) {
    return await this.prisma.book.findUnique({
        where: {
        id: bookId,
        },
    });
    }

    async findAllLoans(){
        return await this.prisma.loan.findMany({
            include: {book: true},
            orderBy: {loanDate: 'asc'}
        })
    }

    async createLoanTransaction(data: CreateLoanDTO){
        return await this.prisma.$transaction([
            this.prisma.loan.create({
                data: {
                    bookId: data.bookId,
                    customerName: data.customerName,
                    customerEmail: data.customerEmail,
                    dueDate: data.dueDate
                }
            }),
            this.prisma.book.update({
                where: { id: data.bookId },
                data: {
                    availableQuantity: { decrement: 1 }
                }
            })
        ])
    }

    async finishLoanTransaction(data: FinishLoanDTO){
        return await this.prisma.$transaction([
            this.prisma.loan.update({
                where : { id: data.loanId},
                data : {
                    status: LoanStatus.DEVOLVIDO
                }
            }),

            this.prisma.book.update({
                where: { id: data.bookId },
                data: {
                    availableQuantity : {increment: 1},
                },
            }),
        ])
    }
}

