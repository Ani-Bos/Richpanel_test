import mongoose from "mongoose";
import SubscriptionPlan from "../Model/Subscription.js"
import mongoconnect from "../db.js";
const plansData = [
  {
    name: "Mobile",
    type: "monthly",
    monthlyPrice: 100,
    videoQuality: "Good",
    resolution: "480p",
    devices: ["Phone", "Tablet"],
  },
  {
    name: "Basic",
    type: "monthly",
    monthlyPrice: 200,
    videoQuality: "Good",
    resolution: "480p",
    devices: ["Phone", "Tablet", "Computer", "TV"],
  },
  {
    name: "Standard",
    type: "monthly",
    monthlyPrice: 500,
    videoQuality: "Better",
    resolution: "1080p",
    devices: ["Phone", "Tablet", "Computer", "TV"],
  },

  {
    name: "Premium",
    type: "monthly",
    monthlyPrice: 700,
    videoQuality: "Best",
    resolution: "4k+HDR",
    devices: ["Phone", "Tablet", "Computer", "TV"],
  },

  {
    name: "Mobile",
    type: "yearly",
    monthlyPrice: 1000,
    videoQuality: "Good",
    resolution: "480p",
    devices: ["Phone", "Tablet"],
  },
  {
    name: "Basic",
    type: "yearly",
    monthlyPrice: 2000,
    videoQuality: "Good",
    resolution: "480p",
    devices: ["Phone", "Tablet", "Computer", "TV"],
  },
  {
    name: "Standard",
    type: "yearly",
    monthlyPrice: 5000,
    videoQuality: "Better",
    resolution: "1080p",
    devices: ["Phone", "Tablet", "Computer", "TV"],
  },

  {
    name: "Premium",
    type: "yearly",
    monthlyPrice: 7000,
    videoQuality: "Best",
    resolution: "4k+HDR",
    devices: ["Phone", "Tablet", "Computer", "TV"],
  },
];

export default plansData;

// const insertPlans = async () => {
//   try {
//     await mongoconnect(); // Connect to the database
//     await SubscriptionPlan.insertMany(plansData);
//     console.log("Plans inserted successfully.");
//   } catch (error) {
//     console.error("Error inserting plans:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// };

// // insertPlans();
// insertPlans().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
//   });
// });