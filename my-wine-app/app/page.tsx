"use client";
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import '@/app/globals.css'
import '@/public/home.css'
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
      <div id="contain">
        <div id="words">
          <h1 id="main-text">Welcome to My Wine</h1>
          <p id="p-tag">Explore and manage your wine collection with ease.</p>
          <div id="button-div">
            <Link href="/manage">
              <button type="button" id="button">
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