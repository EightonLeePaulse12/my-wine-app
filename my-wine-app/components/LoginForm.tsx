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
      const res = await axios.post("/api/auth/[...nextauth]", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res) {
        const data = await res.json();
        const token = data.token;
        const user = data.user;
        setCookie({ res }, "token", token, {
          maxAge: 30 * 24 * 60 * 60,
        });
        console.log("I work!");
        Swal.fire({
          title: "Logged in successfully",
          text: "You have logged in successfully!",
          icon: "success",
        });
        router.push("../app/page.tsx");
      } else {
        const err = await res.json();
        console.log("Login failed: ", err || err.message);
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
