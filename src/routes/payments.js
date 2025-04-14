// routes/payment.js
import express from "express";
import { createCheckoutSession, handleStripeWebhook } from "../controllers/payment.js";

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);

// Stripe webhook requires raw body parsing
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);


export default router;
