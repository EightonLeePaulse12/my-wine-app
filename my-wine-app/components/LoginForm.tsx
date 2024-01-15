"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { setCookie, parseCookies, destroyCookie } from "nookies";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLog = async () => {
    try {
      const res = await axios.post("/api/auth/", {
        email,
        password
      });


      if (res.data && res.data.token) {
        const data = res.data;
        const token = res.data.token;
        const user = res.data.user;
        
        setCookie({ res }, "token", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/"
        });
        localStorage.setItem("data", JSON.stringify(user.id))
        console.log("I work!");
        Swal.fire({
          title: "Logged in successfully",
          text: "You have logged in successfully!",
          icon: "success",
        });
        // router.push("../app");
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
      <div className="container">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLog}>Login</button>
      </div>
    </>
  );
};

export default LoginForm;
