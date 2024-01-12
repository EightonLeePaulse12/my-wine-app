import React from 'react'
import '@/app/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies';

const page = () => {
  const route = useRouter()

  useEffect(() => {
    const storage = localStorage.getItem("info")
    const logged = storage ? JSON.parse(storage) : null && console.log("Information not found")
    const cookies = parseCookies()
    const token = cookies['token']

    if (!logged && !token || logged && !token || !logged && token) {
      route.push('./login.tsx')
    }
  }, [])
  return (
    <></>
  )
}

export default page