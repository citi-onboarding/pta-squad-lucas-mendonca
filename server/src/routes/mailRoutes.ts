import { Router } from "express";
import { sendOverdueEmailController, sendConfirmationEmailController } from "../nodemailer/mailController";

const router = Router();

router.post("/overdue", sendOverdueEmailController);
router.post("/confirmation", sendConfirmationEmailController);

export default router;