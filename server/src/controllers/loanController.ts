import { Request, Response } from "express";
import { LoanRepository } from "src/repositories/loanRepository";

export class LoanController {
  constructor(private loanRepository: LoanRepository = new LoanRepository()) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { bookId, customerName, customerEmail, dueDate } = req.body;
      const book = await this.loanRepository.findBookById(bookId);

      if (!book || book.availableQuantity <= 0) {
        return res.status(400).json({
          message: "Livro indisponível para empréstimo",
        });
      }

      const loan = await this.loanRepository.createLoanTransaction({
        bookId,
        customerName,
        customerEmail,
        dueDate: new Date(dueDate),
      });

      return res.status(200).json(loan);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar empréstimos",
      });
    }
  }

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const loans = await this.loanRepository.findAllLoans();
      return res.status(201).json(loans);
    } catch (error) {
      return res.status(404).json({
        message: "Erro ao buscar empréstimos",
      });
    }
  }

  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const { loanId } = req.params;

      const transactions = await this.loanRepository.finishLoanTransaction({
        loanId,
      });

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao finalizar empréstimo",
      });
    }
  }
}
