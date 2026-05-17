import { Router } from "express";
import { LoanController } from "src/controllers/loanController";

const routes = Router()
const loanController = new LoanController()

routes.post("/", loanController.create);
routes.get("/", loanController.read);
routes.patch("/:id", loanController.patch);

export default routes;