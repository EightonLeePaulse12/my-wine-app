"use client";

import React, { useEffect } from 'react'
import '@/app/globals.css'
import { useRouter } from 'next/router';

const page = () => {

  useEffect(() => {    
    const data = localStorage.getItem("data")
    console.log(data)
    const router = useRouter()
    if (!data) {
      router.push('/login')
    }
  }, [])
  
  return (
    <>
    { /* HOME PAGE */  }
    <div className="h-screen w-full flex items-center justify-center bg-hero-section bg-cover bg-center">
        <div className="text-black text-center">
          <h1 className="text-6xl font-bold text-black mb-4">Welcome to My Wine App</h1>
          <p className="text-lg font-bold text-black">Explore and manage your wine collection with ease.</p>
          <div className="button">
            <button type="button" className="border-solid border-black p-4 m-4">
              Manage your wine
              </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default page