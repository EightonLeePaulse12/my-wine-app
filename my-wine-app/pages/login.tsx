import React from 'react'
import '@/app/globals.css'

import LoginForm from '@/components/LoginForm'

// LOGIN PAGE. NOTE: THIS WAS ME TESTING THE FRAMEWORK SO NOTHING IS DONE IN A REPETITIVE FASHION, I WAS CONSTANTLY TRYING NEW THINGS AND PLAYING AROUND WITH THIS FRAMEWORK

const login = () => {
  return (
    <>
    <h1>Login</h1>
    <LoginForm/>
    </>
  )
}

export default login