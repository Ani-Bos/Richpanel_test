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
  return (
    // <Success/>
    // <Table/>
    // <Payment/>
    // <Dashboard/>
    <Router>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/success" element={<Success />} />
        <Route exact path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
