import React from 'react'
import '@/app/globals.css'

import LoginForm from '@/components/LoginForm'
const Navbar = dynamic(() => import('@/components/Navbar'), {
  ssr: false,
});
const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false,
});
import dynamic from 'next/dynamic';
// LOGIN PAGE. NOTE: THIS WAS ME TESTING THE FRAMEWORK SO NOTHING IS DONE IN A REPETITIVE FASHION, I WAS CONSTANTLY TRYING NEW THINGS AND PLAYING AROUND WITH THIS FRAMEWORK

const login = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  )
}

export default login