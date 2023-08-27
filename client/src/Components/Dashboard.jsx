import React, { useState } from "react";
import { Link, useNavigate, navigate } from "react-router-dom";
import Table from "./Table";

const Dashboard = () => {
  let navigate = useNavigate();
  const [lastActiveData, setLastActiveData] = useState([]); // Initialize with default data

   const handleLastActiveData = (data) => {
     setLastActiveData(data);
     console.log(data)
   };

  const handleSubmit = () => {
    console.log("hfjd");
    navigate("/payment", { state: { lastActiveData } });
  };
  return (
    <div>
      <p className="text-center font-semibold text-lg mt-4">
        Choose the right plan for you
      </p>
      <div className="mt-4">
        <Table onLastActiveDataChange={handleLastActiveData} />
      </div>
      <div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-[#10294d] rounded-sm text-white text-xl px-16 py-2 my-8 m-auto  flex justify-center"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
