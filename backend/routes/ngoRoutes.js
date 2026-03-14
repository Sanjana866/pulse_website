import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getAllNGOs, seedNGOs } from "../controllers/ngoController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllNGOs);   
router.post("/seed", seedNGOs);              

export default router;
