import { Router } from "express";
import healthRouter from "./health.js";
import quotesRouter from "./quotes.js";

const router = Router();

router.use(healthRouter);
router.use(quotesRouter);

export default router;
