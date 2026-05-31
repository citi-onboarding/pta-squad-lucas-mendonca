import { Request, Response } from "express";
import { CreateLoanDTO } from "src/DTOs/loanDTO";
import { LoanRepository } from "src/repositories/loanRepository";
import { BookRepository } from "src/repositories/bookRepository";

export class LoanController {
  constructor(
    private loanRepository: LoanRepository = new LoanRepository(),
    private bookRepository: BookRepository = new BookRepository(),
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { bookId, customerName, customerEmail, dueDate } = req.body;
      const book = await this.bookRepository.findBookById(bookId);

      if (!book || book.availableQuantity <= 0) {
        return res.status(400).json({
          message: "Livro indisponível para empréstimo",
        });
      }

      const data: CreateLoanDTO = {
        bookId,
        customerName,
        customerEmail,
        dueDate: new Date(dueDate),
      };

      const loan = await this.loanRepository.createLoanTransaction(data);

      return res.status(201).json(loan);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar empréstimos",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async readAll(req: Request, res: Response): Promise<Response> {
    try {
      const loans = await this.loanRepository.findAllLoans();
      return res.status(200).json(loans);
    } catch (error) {
      return res.status(404).json({
        message: "Erro ao buscar empréstimos",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async readById(req: Request, res: Response): Promise<Response> {
    try {
      const { loanId } = req.params;

      const loan = await this.loanRepository.findLoanById({
        loanId,
      });

      return res.status(200).json(loan);
    } catch (error) {
      return res.status(404).json({
        message: "Erro ao buscar empréstimo específico",
      });
    }
  }

  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const { loanId } = req.params;
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "O campo status é obrigatório." });
      }
      const transactions = await this.loanRepository.updateLoanStatus({
        loanId,
        status,
      });

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar status do empréstimo",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async readByBookId(req: Request, res: Response): Promise<Response> {
    try {
      const { bookId } = req.params;

      const loans = await this.loanRepository.findLoansByBookId(bookId);

      return res.status(200).json(loans);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar os empréstimos deste livro",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getMetrics(req: Request, res: Response): Promise<Response> {
    try {
      const period = req.query.period?.toString() || "Desde sempre";

      const metrics = await this.loanRepository.getLoansCountByCategory(period);

      return res.status(200).json(metrics);
    } catch (error) {
      console.error("Erro ao buscar métricas:", error);
      return res.status(500).json({ message: "Erro ao buscar métricas", error });
    }
  }
}
