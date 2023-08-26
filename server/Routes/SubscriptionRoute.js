import SubscriptionPlan from "../Model/Subscription.js";
import express from "express";
import filter from "../Middleware/Middleware.js";
import mongoconnect from "../db.js"
const router = express.Router();

// router.get("/subscription-plans", async (req, res) => {
//   try {
//     const plans = await SubscriptionPlan.find();
//     res.json(plans);
//     console.log(res.data)
//   } catch (error) {
//     console.error("Error in fetching data:", error);
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// });
// export default router;

// router.get("/subscription-plans", filter , async (req, res) => {
//   try {
//     const plans = await SubscriptionPlan.find();
//     res.json(plans);
//   } catch (error) {
//     console.error("Error in fetching data:", error);
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// });

// export default router;

router.use(async (req, res, next) => {
  await mongoconnect(); // Wait for the database connection to be established
  next();
});
// Use filter middleware for all routes in this file
// router.use(filter);
router.post("/subscription-plans", filter , async (req, res) => {
  try {
    console.log("before finding subs plans")
    const plans = await SubscriptionPlan.find();
    console.log("after finding subs plans")
     res.json(plans);
  } catch (error) {
    console.error("Error in fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
export default router;