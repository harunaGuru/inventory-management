import { Router } from "express";
import { getExpenses } from "../controllers/expensesController";

const router = Router()
router.get("/", getExpenses)

export default router
