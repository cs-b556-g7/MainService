// routes/payment.js
import express from "express";
import { createCheckoutSession } from "../controllers/payment.js";

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);

export default router;
