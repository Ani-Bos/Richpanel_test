import Cookies from 'js-cookie';
import React, { useState,useEffect} from 'react'
import { Link, useNavigate, navigate } from "react-router-dom";

const Success = ({ host}) => {
  const [plan, setPlan] = useState({ type: "", paymentInfo: { amount: 0 }, isActive: true, subscribe: "" });
  const authToken = Cookies.get("auth-Tokensynex"); 
  const getplan = async() => {
    try {
      const getplan = await fetch(`${host}/api/plan/get-plan`,
        {
          headers: {
            'authorization':authToken
          }
      })
      const data = await getplan.json();
      setPlan(data)
  } catch (error) {
    console.log(error)
  }
  }
  const handlecancel = async() => {
    try {
      const update = await fetch(`${host}/api/plan/update-plan/${plan._id}`, {
        method: "PUT",
           headers: {
            'authorization':authToken
          },
        body: JSON.stringify({ isActive: false })
      }) 
      console.log(await update.json())
    } catch (error) {
      console.log(error)
      getplan();
    }
  }
  return (
    <div className="flex bg-[#1E4D91] min-h-screen justify-center items-center m-auto ">
      <div className="max-w-sm p-6 bg-white border mt-14 rounded-xl">
        <div className="flex justify-between">
          <span className="mb-2 text-md font-semibold text-black">
            Current Plan Details
          </span>
          <button onClick={handlecancel} className="text-[#1E4D91] text-sm font-medium mx-2 px-8 mx-8 mb-2 mr-auto ">
            Cancel
          </button>
        </div>
        <div>
          <p className="text-xs font-medium">{plan.subscribe}</p>
          <div className="flex">
            <p className="text-xs font-light">phone + </p>
            <p className="text-xs font-light">Tablet</p>
          </div>
          <p className="text-semibold text-black font-semibold">₹ { plan.paymentInfo.amount}</p>
        </div>
        <button
          type="button"
          className="bg-white border-[#1E4D91] border-2 text-black text-sm rounded-md px-2 py-1  my-4 items-center"
        >
          Change Plan
              </button>
              <div className='bg-gray-100 text-xs rounded-md px-2'>
                  your subscription has started on july 1th 2022 , and renew on july 12th 2023
              </div>
      </div>
    </div>
  );
}

export default Success