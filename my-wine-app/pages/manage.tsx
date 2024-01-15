import { useEffect, useState } from 'react'

interface wine {
    id: number,
    name: string,
    year: number,
    type: string,
    rating: number,
    consumed: boolean
}

const manage = () => {
    const [wines, setWines] = useState<wine[]>([]);

    useEffect(() => {
        const userId = localStorage.getItem("data")

        if (userId) {
            fetch(`/api/wines/${userId}`)
                .then((res) => res.json())
                .then((data) => setWines(data))
                .catch((e) => console.error("Error while fetching wine: ", e))
        }
    }, [])

    return (

        <div>
            <h1>Winee</h1>
            <ul>
                {wines.map((wine) => (
                    <li key={wine.id}>{wine.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default manage