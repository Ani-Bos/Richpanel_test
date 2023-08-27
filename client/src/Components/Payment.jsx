import React,{useState,useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useLocation } from "react-router-dom";
import Table from "./Table";
import TestPayment from "./TestPayment";
const stripePromise = loadStripe(
  "pk_test_51Nj69ASHOFbuBWHfmt9DWtFAeZDyz08ODniPUsxjUXJ1SiGPs6Eo1IZXDSIa2wT3r9O4NAQiJRSctwpJGL9ooXsF00pQlgBjnZ"
);

const Payment = ({ host}) => {

  // const [paymentStatus, setPaymentStatus] = useState("");
  // const handleSubmit = async (event) => {
    // event.preventDefault();
    // try {
    //   const response = await fetch(
    //     "http://localhost:5000/pay/process-payment",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         // Authorization: `Bearer ${yourAuthToken}`,
    //       },
    //       body: JSON.stringify({
    //         paymentMethodId: lastActiveData[0]?.paymentMethodId,
    //         planId: lastActiveData[0]?.planId,
    //       }),
    //     }
    //   );

    //   const data = await response.json();

    //   if (data.success) {
    //     setPaymentStatus("Payment successful!");
    //   } else {
    //     setPaymentStatus("Payment failed");
    //   }
    // } catch (error) {
    //   console.error("Error submitting payment:", error);
    //   setPaymentStatus("Payment failed");
    // }
  // };
  return (
    <Elements  stripe={stripePromise}>
      <PaymentForm host={ host} />
      {/* <TestPayment host={ host} /> */}
    </Elements>
  );
};

export default Payment;







// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// import CheckoutForm from "./TestPayment";

// const stripePromise = loadStripe(
//   "pk_test_51Nj69ASHOFbuBWHfmt9DWtFAeZDyz08ODniPUsxjUXJ1SiGPs6Eo1IZXDSIa2wT3r9O4NAQiJRSctwpJGL9ooXsF00pQlgBjnZ"
// );

// export default function StripeCheckout() {
//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     console.log("inside use effect paument")
//     fetch("http://localhost:5000/pay/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items: [{}] }),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log(`client secret : ${data.clientSecret}`)
//         setClientSecret(data.clientSecret)
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const options = {
//     clientSecret,
//   };

//   return (
//     <div>
//       {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </div>
//   );
// }
