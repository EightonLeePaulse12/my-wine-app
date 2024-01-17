import '@/app/globals.css'
import { useState } from "react";
import axios from 'axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
const Navbar = dynamic(() => import('@/components/Navbar'), {
    ssr: false,
});
const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: false,
});
import dynamic from 'next/dynamic';
// COMPONENT TO ADD A NEW WINE INTO THE DATABASE

const add = () => {
    const [name, setName] = useState('')
    const [year, setYear] = useState<number>(0)
    const [type, setType] = useState('')
    const [varietal, setVarietal] = useState<string>('CabernetSauvignon')
    const [rating, setRating] = useState<number>(0)
    const router = useRouter()

    const handleSubmit = async () => {

        const userId = Number(localStorage.getItem("data"))
        try {
            const add = await axios.post('/api/postWine', {
                id: userId,
                user: userId,
                name,
                year,
                type,
                varietal,
                rating
            })
            console.log("HERE, YOU'RE LOOKING FOR ME: ", userId)
            console.log(typeof userId)
            console.log(add.data)
            if (add.data.message === "Successfully added the wine to the database") {
                Swal.fire({
                    title: "Added successfully",
                    text: "You have successfully added your wine",
                    icon: "success"
                })
                // setTimeout(() => {
                //     router.push('/manage')
                // }, 1000)
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    text: "Something went wrong while adding your wine",
                    icon: "error"
                })
            }
        } catch (e) {
            console.log(e)
            Swal.fire({
                title: "Something went wrong",
                text: "Something is not right",
                icon: "error"
            })
        }


    }

    return (
        <>
        <Navbar/>
            <div>
                <h1>Add Wine</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <label htmlFor="year">Year:</label>
                    <input
                        type="number"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                    />
                    <br />
                    <label htmlFor="type">Type:</label>
                    <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="RED">RED</option>
                        <option value="WHITE">WHITE</option>
                        <option value="ROSE">ROSE</option>
                        <option value="WHITE_BLEND">WHITE_BLEND</option>
                        <option value="RED_BLEND">RED_BLEND</option>
                    </select>
                    <br />
                    <label htmlFor="varietal">Varietal:</label>
                    <select
                        id="varietal"
                        value={varietal}
                        onChange={(e) => setVarietal(e.target.value)}
                    >
                        <option value="CabernetSauvignon">Cabernet Sauvignon</option>
                        <option value="Merlot">Merlot</option>
                        <option value="Shiraz">Shiraz</option>
                        <option value="CheninBlanc">Chenin Blanc</option>
                        <option value="SauvignonBlanc">Sauvignon Blanc</option>
                        <option value="Verdelho">Verdelho</option>
                        <option value="Chardonnay">Chardonnay</option>
                        <option value="Durif">Durif</option>
                        <option value="Pinotage">Pinotage</option>
                        <option value="Semillion">Semillion</option>
                        <option value="Syrah">Syrah</option>
                        <option value="Barbera">Barbera</option>
                        <option value="Pinotnoir">Pinot Noir</option>
                        <option value="Carmenere">Carmenere</option>
                        <option value="Gewurztraminer">Gewurztraminer</option>
                        <option value="Gamay">Gamay</option>
                        <option value="Mourvedre">Mourvedre</option>
                        <option value="Zinfandel">Zinfandel</option>
                        <option value="Carignan">Carignan</option>
                        <option value="Muscat">Muscat</option>
                        <option value="Grenache">Grenache</option>
                        <option value="Tempranillo">Tempranillo</option>
                        <option value="Malbec">Malbec</option>
                    </select>
                    <br />
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="number"
                        id="rating"
                        value={rating | 0}
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                    <br />
                    <button type="button" onClick={handleSubmit}>Add Wine</button>
                </form>
            </div>
            <Footer/>
        </>
    )
}

export default add