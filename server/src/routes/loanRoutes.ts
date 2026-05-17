import { Router } from "express";
import { LoanController } from "src/controllers/loanController";

export class LoanRoutes {
  public router: Router;
  private loanController: LoanController;

  constructor() {
    this.router = Router();
    this.loanController = new LoanController();

    this.router.post("/loan/", (req, res) => this.loanController.create(req, res));
    this.router.get("/loan/all", (req, res) => this.loanController.read(req, res));
    this.router.patch("/loan/return", (req, res) => this.loanController.patch(req, res));
  }
}