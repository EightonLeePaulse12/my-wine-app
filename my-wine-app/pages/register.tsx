import React from 'react'
import '@/app/globals.css'

// PAGE FOR THE REGISTRATION

import RegisterForm from '@/components/RegisterForm'

const register = () => {
    return (
        <>
            <h1>Register</h1>
            <RegisterForm />
        </>
    )
}

export default register