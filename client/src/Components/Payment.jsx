import React,{useState,useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import Table from "./Table";
const stripePromise = loadStripe(
  "pk_test_51Nj69ASHOFbuBWHfmt9DWtFAeZDyz08ODniPUsxjUXJ1SiGPs6Eo1IZXDSIa2wT3r9O4NAQiJRSctwpJGL9ooXsF00pQlgBjnZ"
);

const Payment = () => {
  const location = useLocation();
  const lastActiveData = location.state?.lastActiveData || []; 
  console.log(lastActiveData);
  console.log(lastActiveData[0]?.paymentMethodId);
  console.log(lastActiveData[0]?.planId);
  const [paymentStatus, setPaymentStatus] = useState("");
  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/pay/process-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${yourAuthToken}`,
          },
          body: JSON.stringify({
            paymentMethodId: lastActiveData[0]?.paymentMethodId,
            planId: lastActiveData[0]?.planId,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setPaymentStatus("Payment successful!");
      } else {
        setPaymentStatus("Payment failed");
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      setPaymentStatus("Payment failed");
    }
  };
  return (
    <div className="flex bg-[#1E4D91] min-h-screen justify-center items-center m-auto">
      <div className="flex flex-col md:flex-row ">
        <div className="max-w-sm p-6 bg-white border mt-14 ">
          <h5 className="mb-2 text-xl font-semibold text-black">
            Complete Payment
          </h5>
          <p className="text-gray-500 text-sm">
            Enter your credit or debit details below
          </p>
          <input
            type="tel"
            name=""
            id=""
            placeholder="Card number        MM/YY CVC"
            className="text-gray-600 border-gray-300 border-solid border my-3 p-1"
            style={{
              width: "17rem",
            }}
          />
          <button
            type="button"
            className="bg-[#1E4D91] text-white rounded-md px-6 py-1  my-4 items-center"
            onClick={handleSubmit}
          >
            Confirm Payment
          </button>
        </div>

        <div
          className="max-w-sm p-6 bg-[#F5F5F7] mt-14 "
          style={{
            height: "15.35rem",
          }}
        >
          <h5 className="mb-6 text-xl text-black">Order Summary</h5>
          <div className="flex justify-between my-3 ">
            <p className="text-sm font-medium">Plan Name</p>
            <p className="text-right text-sm font-medium">
              {lastActiveData[0]?.type || "Default"}
            </p>
          </div>
          <hr className="border-gray-300"></hr>
          <div className="flex justify-between my-3">
            <p className="text-sm font-medium">Billing Cycle</p>
            <p className="text-right text-sm font-medium">
              {lastActiveData[0]?.resolution || "Monthly"}
            </p>
          </div>
          <hr className="border-gray-300"></hr>
          <div className="flex justify-between my-3 ">
            <p className="text-sm font-medium">Plan Price</p>
            <p className="text-right text-sm font-medium">
              ₹{lastActiveData[0]?.price || 200}/mon
            </p>
          </div>
          <hr className="border-gray-300"></hr>
        </div>
      </div>
    </div>
  );
};

export default Payment;
