import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Table = ({ onLastActiveDataChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [active, setActive] = useState(0);
  const [lastactive, setLastactive] = useState([]);
  const [plans, setPlans] = useState([]);
  // useEffect(() => {
  //   console.log(active);
  //   console.log(lastactive);
  //   console.log(`active : ${active}`);
  //   //  console.log(plans);
  //   //  const authToken = Cookies.get("auth-Tokensynex"); // Get the token from the cookie

  //   // const fetchPlans = async () => {
  //   //   // console.log(`auth token : ${authToken}`)
  //   //   const resp = await fetch("http://localhost:5000/sub/subscription-plans", {
  //   //     method: "POST",
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //       "authorization": `Bearer ${authToken}`,
  //   //     },
  //   //   });
  //   //   const data = await resp.json();
  //   //   console.log(`data : ${data}`)
  //   //   setPlans(data.plans)
  //   // }
  //   // fetchPlans();
  // }, [active, plans]);
    useEffect(() => {
      // Update the last active data when active or isChecked changes
      if (active >= 0) {
        let newData = [];
        if (active === 0) {
          newData.push({
            type: "Mobile",
            price: isChecked ? 1000 : 100,
            resolution: "480p",
            devices: ["Phone", "Tablet"],
          });
        } else if (active === 1) {
          newData.push({
            type: "Basic",
            price: isChecked ? 2000 : 200,
            resolution: "480p",
            devices: ["Phone", "Tablet", "Computer", "TV"],
          });
        } else if (active === 2) {
          newData.push({
            type: "Standard",
            price: isChecked ? 5000 : 500,
            resolution: "1080p",
            devices: ["Phone", "Tablet", "Computer", "TV"],
          });
        } else if (active === 3) {
          newData.push({
            type: "Premium",
            price: isChecked ? 7000 : 700,
            resolution: "4K+HDR",
            devices: ["Phone", "Tablet", "Computer", "TV"],
          });
        }
        setLastactive(newData);
        onLastActiveDataChange(newData); // Call the prop function to pass the data
      }
    }, [active, isChecked, onLastActiveDataChange]);


  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-black ">
          <thead className="text-xs text-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-full bg-[#1e3860] p-1">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <span
                    className={`flex items-center space-x-[6px] rounded-full py-2 px-[10px] text-xs font-normal ${
                      !isChecked ? "text-[#1E4D91] bg-white" : "text-[#ffffff]"
                    }`}
                  >
                    Monthly
                  </span>
                  <span
                    className={`flex items-center space-x-[6px] rounded-full py-2 px-[10px] text-xs font-normal ${
                      isChecked ? "text-[#1E4D91] bg-white" : "text-[#ffffff]"
                    }`}
                  >
                    Yearly
                  </span>
                </label>
              </th>
              <th scope="col" className="px-6 py-3">
                {/* 1E4D91 */}
                <div
                  className={`bg-gray-500 w-20 h-20 text-center text-white font-normal justify-center py-8 cursor-pointer`}
                  onClick={() => {
                    setActive(0);
                    setLastactive([
                      // Push the relevant data for this column into the array
                      {
                        type: "Mobile",
                        price: isChecked ? 1000 : 100,
                        resolution: "480p",
                        devices: ["Phone", "Tablet"],
                      },
                    ]);
                  }}
                  style={active === 0 ? { background: "#1E4D91" } : {}}
                >
                  Mobile
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div
                  className="bg-gray-500 w-20 h-20 text-center text-white font-normal justify-center py-8 cursor-pointer"
                  onClick={() => {
                    setActive(1);
                    setLastactive([
                      // Push the relevant data for this column into the array
                      {
                        type: "Basic",
                        price: isChecked ? 2000 : 200,
                        resolution: "480p",
                        devices: ["Phone", "Tablet", "Computer", "TV"],
                      },
                    ]);
                  }}
                  style={active === 1 ? { background: "#1E4D91" } : {}}
                >
                  Basic
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div
                  className="bg-gray-500 w-20 h-20 text-center text-white font-normal justify-center py-8 cursor-pointer"
                  onClick={() => {
                    setActive(2);
                    setLastactive([
                      // Push the relevant data for this column into the array
                      {
                        type: "Standard",
                        price: isChecked ? 5000 : 500,
                        resolution: "1080p",
                        devices: ["Phone", "Tablet", "Computer", "TV"],
                      },
                    ]);
                  }}
                  style={active === 2 ? { background: "#1E4D91" } : {}}
                >
                  Standard
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div
                  className="bg-gray-500 w-20 h-20 text-center text-white font-normal justify-center py-8 cursor-pointer"
                  onClick={() => {
                    setActive(3);
                    setLastactive([
                      {
                        type: "Premium",
                        price: isChecked ? 7000 : 700,
                        resolution: "4K+HDR",
                        devices: ["Phone", "Tablet", "Computer", "TV"],
                      },
                    ]);
                  }}
                  style={active === 3 ? { background: "#1E4D91" } : {}}
                >
                  Premium
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {plans.map((plan, index) => ( */}
            <tr className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-black"
              >
                Monthly price
              </th>
              <td
                className="px-6 py-4"
                style={active === 0 ? { color: "#1E4D91" } : {}}
              >
                ₹ {isChecked ? 1000 : 100}{" "}
                {/* {plan.type === "monthly" ? plan.price : plan.type.price} */}
              </td>
              <td
                className="px-6 py-4"
                style={active === 1 ? { color: "#1E4D91" } : {}}
              >
                ₹ {isChecked ? 2000 : 200}
                {/* {plan.type === "monthly" ? plan.price : plan.type.price} */}
              </td>
              <td
                className="px-6 py-4"
                style={active === 2 ? { color: "#1E4D91" } : {}}
              >
                ₹ {isChecked ? 5000 : 500}
                {/* {plan.type === "monthly" ? plan.price : plan.type.price} */}
              </td>
              <td
                className="px-6 py-4"
                style={active === 3 ? { color: "#1E4D91" } : {}}
              >
                ₹ {isChecked ? 7000 : 700}
                {/* {plan.type === "monthly" ? plan.price : plan.type.price} */}
              </td>
            </tr>
            {/* ))} */}
            <tr className="border-b  ">
              <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-black"
              >
                Basic
              </th>
              <td
                className="px-6 py-4"
                style={active === 0 ? { color: "#1E4D91" } : {}}
              >
                Good
              </td>
              <td
                className="px-6 py-4"
                style={active === 1 ? { color: "#1E4D91" } : {}}
              >
                Good
              </td>
              <td
                className="px-6 py-4"
                style={active === 2 ? { color: "#1E4D91" } : {}}
              >
                Better
              </td>
              <td
                className="px-6 py-4"
                style={active === 3 ? { color: "#1E4D91" } : {}}
              >
                Best
              </td>
            </tr>
            <tr className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-black"
              >
                Resolution
              </th>
              <td
                className="px-6 py-4"
                style={active === 0 ? { color: "#1E4D91" } : {}}
              >
                480p
              </td>
              <td
                className="px-6 py-4"
                style={active === 1 ? { color: "#1E4D91" } : {}}
              >
                480p
              </td>
              <td
                className="px-6 py-4"
                style={active === 2 ? { color: "#1E4D91" } : {}}
              >
                1080p
              </td>
              <td
                className="px-6 py-4"
                style={active === 3 ? { color: "#1E4D91" } : {}}
              >
                4K+HDR
              </td>
            </tr>
            <tr className="border-b ">
              <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-black"
              >
                Devices you can use to watch
              </th>
              <td className="px-6 py-2">
                <div className="flex flex-col m-auto">
                  <p
                    className="py-3"
                    style={active === 0 ? { color: "#1E4D91" } : {}}
                  >
                    Phone
                  </p>
                  <p
                    className="py-3"
                    style={active === 0 ? { color: "#1E4D91" } : {}}
                  >
                    Tablet
                  </p>
                  <p className="py-3"></p>
                  <p className="py-3"></p>
                </div>
              </td>
              <td className="px-6 py-2">
                <div className="flex flex-col m-auto">
                  <p
                    className="py-3"
                    style={active === 1 ? { color: "#1E4D91" } : {}}
                  >
                    Phone
                  </p>
                  <p
                    className="py-3"
                    style={active === 1 ? { color: "#1E4D91" } : {}}
                  >
                    Tablet
                  </p>
                  <p
                    className="py-3"
                    style={active === 1 ? { color: "#1E4D91" } : {}}
                  >
                    Computer
                  </p>
                  <p
                    className="py-3"
                    style={active === 1 ? { color: "#1E4D91" } : {}}
                  >
                    TV
                  </p>
                </div>
              </td>
              <td className="px-6 py-2">
                <div className="flex flex-col m-auto">
                  <p
                    className="py-3"
                    style={active === 2 ? { color: "#1E4D91" } : {}}
                  >
                    Phone
                  </p>
                  <p
                    className="py-3"
                    style={active === 2 ? { color: "#1E4D91" } : {}}
                  >
                    Tablet
                  </p>
                  <p
                    className="py-3"
                    style={active === 2 ? { color: "#1E4D91" } : {}}
                  >
                    Computer
                  </p>
                  <p
                    className="py-3"
                    style={active === 2 ? { color: "#1E4D91" } : {}}
                  >
                    TV
                  </p>
                </div>
              </td>
              <td className="px-6 py-2">
                <div className="flex flex-col m-auto">
                  <p
                    className="py-3"
                    style={active === 3 ? { color: "#1E4D91" } : {}}
                  >
                    Phone
                  </p>
                  <p
                    className="py-3"
                    style={active === 3 ? { color: "#1E4D91" } : {}}
                  >
                    Tablet
                  </p>
                  <p
                    className="py-3"
                    style={active === 3 ? { color: "#1E4D91" } : {}}
                  >
                    Computer
                  </p>
                  <p
                    className="py-3"
                    style={active === 3 ? { color: "#1E4D91" } : {}}
                  >
                    TV
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
