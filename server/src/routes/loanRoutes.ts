import { Router } from "express";
import { LoanController } from "src/controllers/loanController";

const routes = Router()
const loanController = new LoanController()

routes.post("/", (req, res) => loanController.create(req, res));
routes.get("/", (req, res) => loanController.read(req, res));
routes.patch("/:loanId", (req, res) => loanController.patch(req, res));

export default routes;