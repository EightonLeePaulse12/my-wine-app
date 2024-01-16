"use client";

// LOGIN FORM

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { setCookie, parseCookies, destroyCookie } from "nookies";

const LoginForm = () => {
  // DEFINING ALL THE STATES FOR INPUT ENTRIES 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // MAKING API CALL

  const handleLog = async () => {
    try {
      const res = await axios.post("/api/auth/", {
        email,
        password
      });

      // ADDING CONDITIONALS TO MAKE SURE THE USER LOGS IN PROPERLY
      if (res.data && res.data.token) {
        const token = res.data.token;
        const user = res.data.user;
        
        setCookie({ res }, "token", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/"
        });
        localStorage.setItem("data", JSON.stringify(user.id, user.username, user.email))
        console.log("I work!");
        Swal.fire({
          title: "Logged in successfully",
          text: "You have logged in successfully!",
          icon: "success",
        });
        router.push("/");
      } else {
        const err = "Something went wrong";
        console.log("Login failed: ", err);
        console.log(res)
        Swal.fire({
          title: "Could not log you in",
          text: "Login was unsuccessful, something went wrong",
          icon: "error",
        });
      }
    } catch (e) {
      console.log("Something went wrong: ", e);
    }
  };
  return (
    <>

      { /* PAGE DESIGN AND BINDING INPUTS TO STATES SO THAT IT CAN BE SENT BACK AS VALUES TO THE API */ }

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
          <h1 className="text-2xl font-semibold mb-6">Login</h1>
          <input
            type="text"
            placeholder="Email"
            className="w-full border p-2 mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-6 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLog}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
