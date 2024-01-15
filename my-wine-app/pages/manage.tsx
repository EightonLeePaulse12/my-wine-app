import React, { useState, useEffect } from 'react'
import WineTable from '@/components/WineTable'
import axios from 'axios'

const manage = () => {
    const [wines, setWines] = useState([])

    useEffect(() => {
        const data = async () => {
            try {
                let id = localStorage.getItem("data")
                console.log("ID: ", id)
                console.log(typeof id)

                const res = await axios.get(`api/wines/${id}`)
                console.log(res.data)
                setWines(res.data.wines)    
            } catch (e) {
                console.error("Error fetching wines: ", e)
            }
        }
        data()
    }, [])

    return (
        <>
            <div className="container">
                <h1>Your Wine List</h1>
                { wines ? <WineTable wines={wines} /> : <p>Loading...</p> }
            </div>
        </>
    )
}

export default manage