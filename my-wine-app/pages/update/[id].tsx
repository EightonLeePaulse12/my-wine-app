// PAGE FOR UPDATING WINE QUERIES IN CASE USERS HAVE CONSUMED IT OR WANT TO CHANGE SOMETHING ON IT
'use client';
import '@/app/globals.css'
const Navbar = dynamic(() => import('@/components/Navbar'), {
    ssr: false,
});
const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: false,
});
import dynamic from 'next/dynamic';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker'

interface UpdateWineProps {
    wineId: number;
}

const UpdateWine: React.FC<UpdateWineProps> = ({ wineId }) => {
    const router = useRouter();
    const { id } = router.query

    const [name, setName] = useState("");
    const [year, setYear] = useState(0);
    const [type, setType] = useState("");
    const [varietal, setVarietal] = useState("CabernetSauvignon");
    const [rating, setRating] = useState(0);
    const [consumed, setConsumed] = useState('false')
    const [dateConsumed, setDateConsumed] = useState<Date | null>(null);

    // API CALL TO FETCH THE DETAILS OF THE WINE THE USER WANTS TO EDIT

    useEffect(() => {
        const fetchWineDetails = async () => {
            try {
                const res = await axios.get(`/api/getWine?id=${id}`);
                if (id) {
                    const wineDetails = res.data.wine;
                    setName(wineDetails.name);
                    setYear(wineDetails.year);
                    setType(wineDetails.type);
                    setVarietal(wineDetails.varietal);
                    setRating(wineDetails.rating || 0);
                    setConsumed(wineDetails.consumed)
                    setDateConsumed(wineDetails.dateConsumed ? new Date(wineDetails.dateConsumed) : null)
                }
            } catch (error) {
                console.error("Error fetching wine details:", error);
                alert("Something went wrong")
            }
        };

        fetchWineDetails();
    }, [wineId, router]);
    // SET DATE CHOSEN BY USER
    const handleDateChange = (date: Date | null) => {
        setDateConsumed(date)
    }

    // FUNCTION TO HANDLE API CALL TO EDIT QUERIES

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const update = await axios.patch(`/api/patchWine`, {
                id: id,
                name,
                year,
                type,
                varietal,
                rating,
            });

            if (update.data.message === "Successfully updated wine") {
                await Swal.fire({
                    title: "Updated successfully",
                    text: "You have successfully updated your wine",
                    icon: "success",
                });
                router.push('/manage')
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    text: "Something went wrong while updating your wine",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Something went wrong",
                text: "Something is not right",
                icon: "error",
            });
        }
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2-1 font-bold mb-4">Update Wine</h1>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-black-600">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 border rounded border-black w-full"
                        />
                    </div>
                    <br />
                    <div className="mb-4">
                        <label htmlFor="year" className="block text-sm font-medium text-black-600">Year:</label>
                        <input
                            type="number"
                            id="year"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))} className="mt-1 p-2 border rounded border-black w-full"
                        />
                    </div>
                    <br />
                    <div className="mb-4">
                        <label htmlFor="type" className="block text-sm font-medium text-black-600">Type:</label>
                        <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="border-black mt-1 p-2 border rounded w-full">
                            <option value="RED">RED</option>
                            <option value="WHITE">WHITE</option>
                            <option value="ROSE">ROSE</option>
                            <option value="WHITE_BLEND">WHITE_BLEND</option>
                            <option value="RED_BLEND">RED_BLEND</option>
                        </select>
                    </div>
                    <br />
                    <div className="mb-4">
                        <label htmlFor="varietal" className="block text-sm font-medium text-black-600 ">Varietal:</label>
                        <select
                            id="varietal"
                            value={varietal}
                            onChange={(e) => setVarietal(e.target.value)}
                            className="mt-1 p-2 border rounded w-full border-black"
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
                    </div>
                    <br />
                    <div className="mb-4">
                        <label htmlFor="rating" className="block text-sm font-medium text-black-600">Rating:</label>
                        <input
                            type="number"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="mt-1 p-2 border rounded w-full border-black"
                        />
                    </div>
                    <br />
                    <div className="mb-4">
                        <label htmlFor="consumed" className="block text-sm font-medium text-black-600">Consumed:</label>
                        <select id="type" value={consumed || "False"} onChange={(e) => setConsumed(e.target.value)} className="border-black mt-1 p-2 border rounded w-full">
                            <option value="RED">True</option>
                            <option value="WHITE">False</option>
                        </select>
                    </div>
                    <br />
                    <div className="mb-4">
                        <label htmlFor="dateConsumed" className="block text-sm font-medium text-black-600">Date Consumed:</label>
                        <DatePicker
                            id="dateConsumed"
                            selected={dateConsumed}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            className="mt-1 p-2 border rounded w-full border-black"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update Wine</button>

                </form>
            </div>
            <Footer/>
        </>
    );
};

export default UpdateWine;

