import Cookies from 'js-cookie';
import React, { useState,useEffect} from 'react'
import { Link, useNavigate, navigate } from "react-router-dom";

const Success = ({ host }) => {
  let navigate = useNavigate()
  const [plan, setPlan] = useState({ type: "", paymentInfo: { amount: 0 }, isActive: true, subscribe: "" });
  const [device, setDevice] = useState([]);
  const authToken = Cookies.get("auth-Tokensynex"); 
  const getplan = async() => {
    try {
      const getplan = await fetch(`${host}/api/plan/get-plan`,{
        method:"POST",
        headers: {
            'Content-type':'application/json',
            'authorization':authToken
          }
      })
      const data = await getplan.json();
      console.log(data);
      setPlan(data)
  } catch (error) {
    console.log(error)
  }
  }
  useEffect(() => {
    getplan()
  }, [])
  
  const handlecancel = async() => {
    try {
      const update = await fetch(`${host}/api/plan/update-plan/${plan._id}`,{
        method: "PUT",
        body: JSON.stringify({
          isActive:false
        }),
        headers: {
             'Content-type':'application/json',
           'authorization': authToken,
          },
       
      }) 
      console.log(await update.json())
      getplan();
    } catch (error) {
      console.log(error)
      getplan();
    }
  }

  const handcancle = () => {
    navigate('/dashboard')
  }
  return (
    <div className="flex bg-[#1E4D91] min-h-screen justify-center items-center m-auto ">
      <div className="max-w-sm p-6 bg-white border mt-14 rounded-xl">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="mb-2 text-md font-semibold text-black">
              Current Plan Details
            </div>

            <div
              class={`font-bold inline-flex items-center ${
                plan.isActive
                  ? "bg-[#c7dbf9] text-[#365da5]"
                  : "text-[#d57670] bg-[#f9f0f0]"
              } text-xs mr-2 px-2.5 py-0.5 rounded-full `}
            >
              {plan.isActive ? <div>Active</div> : <div>Cancelled</div>}
            </div>
          </div>

          <button
            onClick={handlecancel}
            className="text-[#1E4D91] text-sm font-medium mx-2 px-8 mx-8 mb-2 mr-auto "
          >
            Cancel
          </button>
        </div>
        <div>
          <p className="text-xs font-medium">{plan.subscribe}</p>
          <div className="flex">
            <p className="text-xs font-light">phone + </p>
            <p className="text-xs font-light">Tablet</p>
          </div>
          <p className="text-semibold text-black font-semibold">
            ₹ {parseInt(plan.paymentInfo.amount) / 100}
          </p>
        </div>
        <button
          type="button"
          className="bg-white border-[#1E4D91] border-2 text-black text-sm rounded-md px-2 py-1  my-4 items-center"
          onClick={handcancle}
        >
          Change Plan
        </button>
        <div className="bg-gray-100 text-xs rounded-md px-2">
          your subscription has started on july 1th 2022 , and renew on july
          12th 2023
        </div>
      </div>
    </div>
  );
}

export default Success