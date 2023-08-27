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
  const host='http://localhost:5000'
  const options = {
    // passing the client secret obtained from the server
    clientSecret:
      "sk_test_51Nj69ASHOFbuBWHfuaaWtY2xflqnPF7AYOrsmH8oHxB8v2WXIWwg5JqS9et4BIPrz9Pg5sWV4sQBtYBMAIXEuxUf00wmPPKFYo",
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
