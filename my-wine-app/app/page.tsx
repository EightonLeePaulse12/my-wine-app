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
  return (
    <>
    <div className="container h-screen">
      <h1 className="font-extralight text-cyan-800 text-xl"></h1>
      </div>
    </>
  )
}

export default page