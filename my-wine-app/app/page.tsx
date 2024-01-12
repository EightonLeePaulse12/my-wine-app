"use client";

import React, { useEffect } from 'react'
import '@/app/globals.css'
import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies';


const page = () => {
  const route = useRouter();
  useEffect(()=>{
    alert(route)
  }, [])

  useEffect(() => {
    const storage = localStorage.getItem("info")
    const logged = storage ? JSON.parse(storage) : null && console.log("Information not found")
    const cookies = parseCookies()
    const token = cookies['token']

    if (!logged && !token || logged && !token || !logged && token) {
      route.push('./login.tsx')
    }
  }, [route])
  return (
    <>
      <h1>Hello, world!</h1>
    </>
  )
}

export default page