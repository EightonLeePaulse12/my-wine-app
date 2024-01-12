import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies';


const loginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleLog = async () => {
        try {
            const res = await fetch('/my-wine-app/app/api/auth/[...nextauth]', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (res.ok) {
                const data = await res.json()
                const token = data.token
                const user = data.user
                setCookie({ res }, 'token', token, {
                    maxAge: 30 * 24 * 60 * 60,
                })
            } else {
                const err = await res.json()
                console.log("Login failed: ", err || err.message)
            }
        } catch (e) {
            console.log("Something went wrong: ", e)
        }
    }
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
    )
}

export default loginForm