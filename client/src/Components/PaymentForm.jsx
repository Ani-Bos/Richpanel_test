import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe ,CardElement, useElements} from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import Table from "./Table"; 
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function PaymentForm({ host }) {
  let navigate=useNavigate()
  let stripe = useStripe()
  const elements = useElements()
    const location = useLocation();
    const lastActiveData = location.state?.lastActiveData || []; 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = Cookies.get("auth-Tokensynex"); // Get the token from the cookie
    try {
      const response = await fetch(
        `${host}/pay/create-payment-intent`,
        // "http://localhost:5000/pay/process-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'authorization': authToken,
          },
          body: JSON.stringify({
            price: lastActiveData[0]?.price,
            // planId: lastActiveData[0]?.planId,
          }),
        }
      );

      const data = await response.json();
      console.log(`payment data : ${data} &&& ${data.clientSecret}`);

      // if (data.success) {
      //   setPaymentStatus("Payment successful!");
      // } else {
      //   setPaymentStatus("Payment failed");
      // }

      let { paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {

          card:elements.getElement(CardElement)
        }
      });
      if (!paymentIntent)
      {
        alert("Network Error")
        return;
      }
      if (paymentIntent.status === 'succeeded') {
        console.log(lastActiveData)
        const create = await fetch(`${host}/api/plan/create-plan`, {
          method: "POST",
          body: JSON.stringify({
            isActive: true,
            subscribe: lastActiveData[0].type,
            type: lastActiveData[0].checked ? "yearly" : "monthly",
            paymentInfo: paymentIntent,
          }), 
          headers:{
            "Content-Type": "application/json",
            'authorization': authToken,
          },
        });
        console.log(await create.json());
     navigate('/success')
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      // setPaymentStatus("Payment failed");
    }
  }
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
          <div className="text-gray-600 border-gray-300 border-solid border my-3 p-1">
            <CardElement />
          </div>
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
              {lastActiveData[0]?.checked || "Monthly"}
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
}
export default PaymentForm;
