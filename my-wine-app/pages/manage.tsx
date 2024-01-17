// MAIN PAGE - THIS IS WHERE USERS MANAGE THEIR WINES, THEY CAN ADD, UPDATE AND DELETE FROM THIS PAGE

'use client';
import dynamic from 'next/dynamic';
import '@/app/globals.css'
const Navbar = dynamic(() => import('@/components/Navbar'), {
    ssr: false,
  });
  const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: false,
  });
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';



interface Wine {
    id: number;
    wine: {
      id: number;
      name: string;
      year: number;
      type: string;
      varietal: string;
      rating: number;
      consumed: boolean;
    };
    dateConsumed: string;
  }
  
const manage = () => {
    const router = useRouter()
    const [perPage, setPerPage] = useState(20)
    const [current, setCurrent] = useState(1)

    useEffect(()=>{
        const token = Cookies.get("token")
        if(!token){
          router.push('/')
        }
      }, [router])

    // API CALL FOR DELETE BUTTON
    const handleDel = async (wineId: number) => {
        const res = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        })

        if (res.isConfirmed) {
            try {
                const resp = await axios.delete(`/api/deleteWine`, {
                    data: { id: wineId }
                })
                await Swal.fire({
                    title: 'Deleted!',
                    text: 'Your data has been deleted.',
                    icon: 'success',
                });
                console.log(resp)

                location.reload()
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while deleting the data.',
                    icon: 'error',
                });
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while deleting the data.',
                icon: 'error',
            });
        }
    }
    // API CALL TO ADD THE REST OF THE QUERIES IN
    const handleSkip = ()=>{
        setCurrent((prevPage) => prevPage + 1)
    }

    

    const [wines, setWines] = useState<Wine[]>([])
    // VARIABLE TO DECLARE ONLY 20 SETS OF WINE FOR SHOW MORE BUTTON
    const displayWine = wines?.slice(0, perPage * current)
    useEffect(() => {
        const id = localStorage.getItem("data")
        if (!id) {
            router.push('/login')
        }
    }, [])
    useEffect(() => {
        const id = localStorage.getItem("data")
        // GET ALL THE WINES THAT BELONGS TO A SPECIFIC USER
        const handleCall = async () => {
            try {
                const res = await axios.get(`/api/wines?id=${id}`)
                setWines(res.data.wine)
            } catch (error) {
            }

        }

        handleCall()
    }, [])


    // MAIN TABLE WHERE ALL THE MAGIC HAPPENS (CRUD SYSTEM)
    return (
        <>
        <Navbar/>
            <div className="add-button flex justify-center items-center p-11">
                <Link href="/add">
                    <button className="bg-blue-700 text-white hover:text-white font-bold py-2 px-4 rounded border-blue-600 border-solid">
                        + Add Wine
                    </button>
                </Link>
            </div>

            {displayWine.length === 0 ? (
                <div className="w-full flex h-96 justify-center items-center p-11">
                <h1 className="font-light">Add Wine to your collection</h1>
                </div>

            ) : (
                <>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-12">
                        <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
                            <thead className="text-s text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th className="px-6 py-4">
                                        ID
                                    </th>
                                    <th className="px-6 py-4">
                                        Name
                                    </th>
                                    <th className="px-6 py-4">
                                        Year
                                    </th>
                                    <th className="px-6 py-4">
                                        Type
                                    </th>
                                    <th className="px-6 py-4">
                                        Varietal
                                    </th>
                                    <th className="px-6 py-4">
                                        Rating
                                    </th>
                                    <th className="px-6 py-4">
                                        Consumed
                                    </th>
                                    <th className="px-6 py-4">
                                        Date Consumed
                                    </th>
                                    <th className="px-6 py-4">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayWine.map((wine) => (
                                    <tr
                                        key={wine.id}
                                        className="odd:bg-white odd:dark:bg-gray-900  even:dark:bg-gray-800 border-b dark:border-black"
                                    >
                                        <td className="px-6 py-4">{wine.wine.id}</td>
                                        <td className="px-6 py-4">{wine.wine.name}</td>
                                        <td className="px-6 py-4">{wine.wine.year}</td>
                                        <td className="px-6 py-4">{wine.wine.type}</td>
                                        <td className="px-6 py-4">{wine.wine.varietal}</td>
                                        <td className="px-6 py-4">{wine.wine.rating}</td>
                                        <td className="px-6 py-4">{wine.wine.consumed ? "true" : "false"}</td>
                                        <td className="px-6 py-4">{wine.dateConsumed ? wine.dateConsumed : "N/A"}</td>
                                        <td className="px-6 py-4">
                                            <Link href={`/update/${wine.id}`} passHref className="font-medium text-blue-600 dark:text-blue-500 hover:underline p-4">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDel(wine.id)}
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {wines.length > perPage * current && (
                        <div className="flex justify-center items-center p-5">
                        <button onClick={handleSkip} className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Show More 
                        </button>
                        </div>
                    )}
                </>
            )}
            <Footer/>
        </>
    )
}

export default manage