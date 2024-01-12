"use client";

import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import '@/app/globals.css'
import { parseCookies } from 'nookies';


const page = () => {
  const history = useHistory();
  

  useEffect(() => {
    const storage = localStorage.getItem("info")
    const logged = storage ? JSON.parse(storage) : null && console.log("Information not found")
    const cookies = parseCookies()
    const token = cookies['token']

    if (!logged || !token) {
      history.push('./login.tsx')
    }
  }, [history])
  return (
    <>
      <h1>Hello, world!</h1>
    </>
  )
}

export default page