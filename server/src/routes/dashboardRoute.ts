import { Router } from "express";
import { dashboardMetrics } from "../controllers/dashboardController";

const router = Router()
router.get("/", dashboardMetrics)

export default router