"use client";

import React, { useEffect } from 'react'
import '@/app/globals.css'
import { useRouter } from 'next/router';

const page = () => {

  useEffect(() => {
    const data = localStorage.getItem("data")
    const router = useRouter()
    if (!data) {
      router.push('/login')
    }
  }, [])
  const containerStyle = {
    backgroundImage: 'url("/public/assets/terry-vlisidis-0dhIwRsPV74-unsplash.jpg")',
    backgroundSize: 'cover', // Adjust as needed
    backgroundPosition: 'center', // Adjust as needed
  };
  return (
    <>
    <div className="h-screen w-full flex items-center justify-center bg-hero-section bg-cover bg-center">
        <div className="text-white text-center ">
          <h1 className="text-4xl font-extralight mb-4">Welcome to My Wine App</h1>
          <p className="text-lg font-light">Explore and manage your wine collection with ease.</p>
        </div>
      </div>
    </>
  )
}

export default page