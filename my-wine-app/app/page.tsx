"use client";

import React, { useEffect } from 'react'
import '@/app/globals.css'
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';

const page = () => {
  
  useEffect(() => {
    
    const storage = localStorage.getItem("info")
    const logged = storage ? JSON.parse(storage) : null && console.log("Information not found")
    const cookies = parseCookies()
    const token = cookies['token']
    
    if (!logged || !token) {
      const router = useRouter()
      router.push("/login")
    }
  }, [])
  return (
    <>
      <h1 className="font-extralight text-cyan-800 text-xl">Hello, world!</h1>
    </>
  )
}

export default page