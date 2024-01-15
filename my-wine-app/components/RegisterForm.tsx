'use client';

import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'


const RegisterForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const router = useRouter()

    const handleReg = async () => {
        try {
            const res = await axios.post("/api/registerUser", {
                username,
                email,
                password
            })
            console.log("DATA: ", res)

            if (res.data.message === "User created successfully") {
                Swal.fire({
                    title: "Registered Successfully",
                    text: "You have successfully been registered, you can now log in.",
                    icon: "success"
                })
                // router.push("/pages/register.tsx")
                return "User registered successfully";
            } else {
                Swal.fire({
                    title: "Registration was unsuccessful",
                    text: res.data.message || "Something went wrong, please try again",
                    icon: "error"
                })

                return "User registration failed";
            }
        } catch (e) {
            console.log("Something went wrong: ", e)

            return "An error occurred while registering the user";
        }
    }
    return (
        <>
            <div className="container">
                <input type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
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
                <button onClick={handleReg}>Register</button>
            </div>
        </>
    )

}



export default RegisterForm