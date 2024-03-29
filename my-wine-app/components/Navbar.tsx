import React, { useEffect } from "react";
import Link from 'next/link'
import { parseCookies } from 'nookies'
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'
// NAVBAR - THIS WILL HAVE A FEATURE THAT CHECKS IF A USER IS LOGGED IN AND IF THE CONDITIONS ARE NOT MET, THE NAVBAR WILL CHANGE

const Navbar = () => {
  const router = useRouter()
  useEffect(() => {
  }, [router])
  const token = Cookies.get("token")

  const logout = async () => {
    const id = localStorage.getItem("data")
    const token = Cookies.get("token")

    const res = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
    })
    if (id || token && res.isConfirmed) {
      localStorage.removeItem("data")
      Cookies.remove("token")
      router.push('/')
    } else if (id && res.isConfirmed) {
      localStorage.removeItem("data")
      Cookies.remove("token")
      router.push('/')
    } else if (token && res.isConfirmed) {
      localStorage.removeItem("data")
      Cookies.remove("token")
      router.push('/')
    }
  }
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://i.ibb.co/v1KwgpS/Screenshot-2024-01-16-142637-removebg-preview.png" loading="lazy" className="h-14" alt="My Wines Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">My Wines</span>
          </Link>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href="/" className="block py-2 px-3 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 dark:text-white md:dark:text-red-500" aria-current="page">Home</Link>
              </li>
              <li>
                <Link href="/manage" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Manage</Link>
              </li>
              <li>
                {!token ? (
                  <Link href="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Log in</Link>
                ) : null}
              </li>
              <li>
                {!token ? (
                  <Link href="/register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</Link>
                ) : null}
              </li>
              <li>
                {token ? (
                  <button type="button" className=" text-red-800 hover:underline text-left" onClick={logout}>Logout</button>
                ) : null}
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
