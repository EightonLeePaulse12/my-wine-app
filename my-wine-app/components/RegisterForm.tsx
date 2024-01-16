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
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                    <h1 className="text-2xl font-semibold mb-6">Register</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full border p-2 mb-4 rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
                        onClick={handleReg}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Register
                    </button>
                </div>
            </div>
        </>
    )

}



export default RegisterForm