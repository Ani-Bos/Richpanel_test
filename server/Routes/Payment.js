import express from "express";
import stripe from "stripe";
import dotenv from "dotenv";
import filter from "../Middleware/Middleware.js";
dotenv.config();

const router = express.Router();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeClient = new stripe(stripeSecretKey);

router.post("/process-payment", filter , async (req, res) => {
  try {
    const { price } = req.body;
    // const selectedPlan = await SubscriptionPlan.findById(planId);
    // Calculate the payment amount based on the selected plan
    const paymentAmount = price * 100; // Stripe requires amount in cents
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


router.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;


  const paymentIntent = await stripeClient.paymentIntents.create({
    amount: parseInt(price)*100,
    currency: "inr",

    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

export default router;