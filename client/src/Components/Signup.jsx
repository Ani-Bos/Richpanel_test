import React, { useState } from "react";
import { Link, useNavigate, navigate } from "react-router-dom";
import { auth, provider } from "../firebase-config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import Cookies from "js-cookie";

const SignUp = (props) => {
  let navigate = useNavigate();
  const [credential, setCredential] = useState({ email: "", password: "" });
  //It defines a state variable called credential using the useState hook which holds the user's email and password.
  //The handleSignUp function is an asynchronous function that handles the sign-in process. It first calls the signInWithEmailAndPassword function  with the provided email and password to authenticate the user. The result is stored in the userCr variable.
  const [error, setError] = useState(null);
  const handleSignUp = async () => {
    try {
      let userCr = await createUserWithEmailAndPassword(
        auth,
        credential.email,
        credential.password
      );
      console.log(userCr.user);
      const email = userCr.user.email;
      const name = credential.username;
      const profilepic = userCr.user.photoURL;
      Cookies.set(
        "dp",
        profilepic
          ? profilepic
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsGjDJxNoPQgkbqeBPV0yYH7CNMJwficf9hw&usqp=CAU"
      );
      Cookies.set("email", email);
      Cookies.set("name", name);
      const url = "http://localhost:5000/api/auth";
      // Server
      // const resp = await axios.post(
      //   `${url}/createUser`,
      //   {
      //     email: credential.email,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      const resp = await fetch(`${url}/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: credential.email}),
      });
      console.log(`resp : ${resp}`)
      const res = await resp.json();
      console.log(`res auth token : ${res.authToken}`);
      Cookies.set("auth-Tokensynex", res.authToken);
      // Redirect to the dashboard page
      window.location.href = "/dashboard";
    } catch (error) {
      // Handle authentication error
      console.log(error);
      // Display error message to the user
      // Example: set an error state in your component and render an error message
      // setError("Authentication failed. Please check your email and password.");
      setError("Authentication failed.");
    }
  };

  const handleSign = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  // const handleSign = (e) => {
  //   setCredential((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  return (
    <section className="absolute w-full h-full">
      <div className="absolute top-0 w-full h-full bg-[#1E4D91]"></div>
      <div className="container mx-auto px-4 h-full mt-3 ">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div
              className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
              style={{
                background: "#ffffff",
              }}
            >
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-black text-sm font-regular">
                    Create Account
                  </h6>
                </div>
                <div className="btn-wrapper text-center flex flex-col mt-4 justify-center">
                  {/* <button
                    className="bg-white active:bg-gray-100 text-gray-800 font-semibold px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs justify-center  h-9"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                  > */}
                  {/* <img alt="..." className="w-5 mr-1" src={FaGithub} /> */}
                  {/* <span>
                      <FaGithub className="w-5 mr-1" />
                    </span>
                    Github
                  </button> */}
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-white text-center mb-3 font-regualar">
                    <small>Sign in with Email 📧</small>
                  </div> */}
                <form>
                  <div className="relative w-full mb-3 mt-1">
                    <p>Name</p>
                    <input
                      value={credential.namel}
                      onChange={handleSign}
                      type="name"
                      name="name"
                      className="border-0 px-3 py-3 placeholder-gray-800 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="name"
                      style={{
                        background: "#ffffff",
                        border: "1px solid black",
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3 mt-1">
                    <p>Email</p>
                    <input
                      value={credential.email}
                      onChange={handleSign}
                      type="email"
                      name="email"
                      className="border-0 px-3 py-3 placeholder-gray-800 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Email"
                      style={{
                        background: "#ffffff",
                        border: "1px solid black",
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3 mt-1">
                    <p>Password</p>
                    <input
                      value={credential.password}
                      onChange={handleSign}
                      type="password"
                      name="password"
                      className="border-0 px-3 py-3 placeholder-gray-800  text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Password"
                      style={{
                        background: "#ffffff",
                        border: "1px solid black",
                      }}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer mt-2">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-white ml-1 w-5 h-5 "
                        style={{ transition: "all .15s ease" }}
                      />
                      <span className="ml-2 text-sm font-regualar text-black">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-4">
                    <button
                      disabled={
                        credential.email === "" || credential.password === ""
                          ? true
                          : false
                      }
                      onClick={handleSignUp}
                      className={`${
                        credential.email === "" || credential.password === ""
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }
                       text-white  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full `}
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                <div>
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                </div>
              </div>
              <div className="px-5 py-2 text-regular flex text-center justify-center items-center  text-black">
                <p>Already have an account?</p>
                <Link to="/login" className="text-[#1E4D91] mx-2">
                  Login
                </Link>
              </div>
            </div>
            {/* <div className="flex flex-wrap mt-6">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-white"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-gray-300"
                >
                  <small>Create new account</small>
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignUp;
