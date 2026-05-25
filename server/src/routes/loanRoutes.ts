import { Router } from "express";
import { LoanController } from "../controllers/loanController";

const routes = Router()
const loanController = new LoanController()

routes.post("/", (req, res) => loanController.create(req, res));
routes.get("/", (req, res) => loanController.readAll(req, res));
routes.get("/book/:bookId", (req, res) => loanController.readByBookId(req, res));
routes.get("/:loanId", (req, res) => loanController.readById(req, res));
routes.patch("/:loanId", (req, res) => loanController.patch(req, res));

export default routes;