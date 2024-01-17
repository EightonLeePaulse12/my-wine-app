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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-black text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome to My Wine</h1>
          <p className="text-lg text-gray-600">Explore and manage your wine collection with ease.</p>
          <div className="mt-8">
            <Link href="/manage">
              <button type="button" className="px-6 py-3 bg-blue-500 text-white rounded font-bold rounded-full hover:bg-blue-600 transition duration-300">
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