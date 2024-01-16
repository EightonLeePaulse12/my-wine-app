'use client';
import '@/app/globals.css'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Swal from 'sweetalert2'

const manage = () => {

    const handleDel = async (wineId) => {
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
                console.log(resp)
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your data has been deleted.',
                    icon: 'success',
                });

                setWines((prevWine) => prevWine.filter((wine) => wine.id !== wineId))
            } catch (error) {
                console.log(error)
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

    const [wines, setWines] = useState([])
    useEffect(() => {
        const id = localStorage.getItem("data")

        const handleCall = async () => {
            try {
                const res = await axios.get(`/api/wines?id=${id}`)
                setWines(res.data.wine)
                console.log(res.data.wine)
            } catch (error) {
                console.log(error)
            }

        }

        handleCall()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            console.log(localStorage.getItem("data"))
            console.log(wines)
        }, 2000)
    }, [wines])


    return (
        <>
            <div className="container"></div>
            <h1>Hello World!</h1>
            <div className="add-button">
                        <Link href="/add">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Add Wine
                            </button>
                        </Link>
                    </div>

            {wines.length === 0 ? (

                <div role="status" className="h-screen flex justify-center items-center">
                    <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>

            ) : (
                <>
                    
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                {wines.map((wine) => (
                                    <tr
                                        key={wine.id}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                    >
                                        {/* <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        
                                    </th> */}
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
                </>
            )}
        </>
    )
}

export default manage