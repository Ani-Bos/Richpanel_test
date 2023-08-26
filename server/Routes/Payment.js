import express from "express";
import stripe from "stripe";
import dotenv from "dotenv";
import filter from "../Middleware/Middleware.js";
dotenv.config();

const router = express.Router();
const stripeSecretKey =
  "sk_test_51Nj69ASHOFbuBWHfuaaWtY2xflqnPF7AYOrsmH8oHxB8v2WXIWwg5JqS9et4BIPrz9Pg5sWV4sQBtYBMAIXEuxUf00wmPPKFYo";
const stripeClient = new stripe(stripeSecretKey);

router.post("/process-payment", filter , async (req, res) => {
  try {
    const { paymentMethodId, planId } = req.body;
    const selectedPlan = await SubscriptionPlan.findById(planId);
    // Calculate the payment amount based on the selected plan
    const paymentAmount = selectedPlan.monthlyPrice * 100; // Stripe requires amount in cents
    // Create a payment intent
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: paymentAmount,
      currency: "INR",
      payment_method: paymentMethodId,
      confirm: true,
    });

    // If payment is successful, send a success response
    res.json({ success: true });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ success: false, error: "Payment failed" });
  }
});

export default router;