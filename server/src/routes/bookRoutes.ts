import { Router } from 'express';
import { BookController } from '../controllers/bookController';

const routes = Router();
const bookController = new BookController();

routes.post("/", bookController.create);
routes.get("/", bookController.getAll);
routes.get("/:id", bookController.getById);
routes.patch("/:id", bookController.update);
routes.delete("/:id", bookController.remove);

export default routes;