"use client";
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import '@/app/globals.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Navbar from '@/components/Navbar';

const page = () => {

  const router = useRouter()
  useEffect(() => {

    const token = Cookies.get("token")

    if (!token) {
      router.push('/login')
    }
  }, [router])

  return (
    <>
      { /* I have to import my navbar here because the code on the navbar to check if a user is logged in does not work if I render this element on the root. I have no idea how to fix that either */}
      <Navbar />
      { /* HOME PAGE */}
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-black text-center">
          <h1 className="text- font-bold text-black mb-4">Welcome to My Wine App</h1>
          <p className="text-lg font-bold text-black">Explore and manage your wine collection with ease.</p>
          <div className="button">
            <Link href="/manage">
              <button type="button" className="border-solid border-black p-4 m-4">
                Manage your wine
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default page