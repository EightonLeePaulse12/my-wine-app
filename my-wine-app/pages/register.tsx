import React from 'react'
import '@/app/globals.css'
const Navbar = dynamic(() => import('@/components/Navbar'), {
    ssr: false,
  });
  const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: false,
  });
  import dynamic from 'next/dynamic';
// PAGE FOR THE REGISTRATION

import RegisterForm from '@/components/RegisterForm'

const register = () => {
    return (
        <>
        <Navbar/>
            <RegisterForm />
            <Footer/>
        </>
    )
}

export default register