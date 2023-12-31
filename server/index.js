import dotenv from "dotenv";

import express from "express";
import cors from "cors";
import path from "path";
import http from "http";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
// import mongoconnect from "./db.js";
import filter from "./Middleware/Middleware.js";
import user from "./Routes/AuthRoute.js";
import SubscriptionRouter from './Routes/SubscriptionRoute.js'
import mongoose from "mongoose";
import SubscriptionPlan from "./Model/Subscription.js";
import plansData from "./Constant/Data.js";
import PaymentRouter from "./Routes/Payment.js"
import PlanRoute from './Routes/Plan.js'
dotenv.config();
const PORT = process.env.PORT || 5000;
const dburl =
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.jzadva4.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(`${dburl}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((e) => {
    console.log("MongoDB connection error : " + e);
  });

//endpoints setting
// const mongoose = require("mongoose");
// await mongoconnect();
app.use("/api/auth", user);
app.use("/sub", SubscriptionRouter);
app.use("/pay",PaymentRouter)
app.use("/api/plan",PlanRoute)
// app.use('/api',Meet)
app.get("/", (req, res) => {
  res.send("hello");
});

// "mongodb+srv://aniket22:aniket123456@cluster0.aug4tch.mongodb.net/microtask2?retryWrites=true&w=majority"

// mongoose.connect("mongodb://localhost:27017/mt56", () => {
//   console.log("Connected to MongoDB");
// });


// mongoconnect();
// app.use(express.json());

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });

const insertPlans = async () => {
  try {
    // await mongoconnect(); // Connect to the database
    const subscription = await SubscriptionPlan.find();
    if (subscription.length!==0)
    {
      return;
      }
    await SubscriptionPlan.insertMany(plansData);
    console.log("Plans inserted successfully.");
  } catch (error) {
    console.error("Error inserting plans:", error);
  } finally {
    // mongoose.connection.close();
  }
};

// insertPlans();
// insertPlans().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
//   });
// });

const startServer = async () => {
  try {
    // await mongoconnect(); // Connect to the database
    await insertPlans(); // Insert plans into the database
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();

// export 'app'
