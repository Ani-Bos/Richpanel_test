import React from 'react'
import { Link, useNavigate, navigate } from "react-router-dom";
import Table from './Table';

const Dashboard = () => {
  // let navigate = useNavigate()
  // const handleSubmit = () => {
  //   navigate('/success')
  // }
  return (
    <div>
      <p className="text-center font-semibold text-lg">
        Choose the right plan for you
      </p>
      <div className="mt-4">
        <Table />
      </div>
      <div>
        <button
          type="submit" onClick={() => {
           
          }}
          className="bg-[#10294d] rounded-sm text-white text-xl px-20 py-4 my-8 m-auto  flex justify-center"
          // onclick={handleSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default Dashboard