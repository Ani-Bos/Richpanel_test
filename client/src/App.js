import Signup from "./Components/Signup";
import Login from "./Components/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard";
import Payment from "./Components/Payment";
import Table from "./Components/Table";
import Success from "./Components/Success";


function App() {
  const host='https://model_subscription_an2.onrender.com'
  const options = {
    // passing the client secret obtained from the server
    clientSecret: process.env.REACT_APP_STRIPE_SECRET_KEY,
  };

  return (
    // <Elements stripe={stripePromise} options={options}>
    <Router>
      <Routes>
        <Route exact path="/" element={<Signup host={host} />} />
        <Route exact path="/login" element={<Login host={host} />} />
        <Route exact path="/dashboard" element={<Dashboard host={host} />} />
        <Route exact path="/success" element={<Success host={host} />} />
        <Route exact path="/payment" element={<Payment host={host} />} />
      </Routes>
    </Router>
    // </Elements>
  );
}

export default App;
