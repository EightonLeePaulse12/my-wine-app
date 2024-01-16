// PAGE FOR UPDATING WINE QUERIES IN CASE USERS HAVE CONSUMED IT OR WANT TO CHANGE SOMETHING ON IT
'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

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

    // API CALL TO FETCH THE DETAILS OF THE WINE THE USER WANTS TO EDIT

    useEffect(() => {
        const fetchWineDetails = async () => {
            try {
                console.log(id)
                if (id) {
                    const response = await axios.get(`/api/getWine?id=${id}`);
                    console.log(response)
                    const wineDetails = response.data.wine;
                    setName(wineDetails.name);
                    setYear(wineDetails.year);
                    setType(wineDetails.type);
                    setVarietal(wineDetails.varietal);
                    setRating(wineDetails.rating || 0);
                }
            } catch (error) {
                console.error("Error fetching wine details:", error);
                router.push("/manage");
            }
        };

        fetchWineDetails();
    }, [wineId, router]);

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
                Swal.fire({
                    title: "Updated successfully",
                    text: "You have successfully updated your wine",
                    icon: "success",
                });
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
        <div>
            <h1>Update Wine</h1>
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
                <button type="submit">Update Wine</button>
            </form>
        </div>
    );
};

export default UpdateWine;

