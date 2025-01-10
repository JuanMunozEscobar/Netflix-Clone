import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTV(req, res) {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
        const randomTV = data.results[Math.floor(Math.random() * data.results?.length)];

        res.status(200).json({ success: true, content: randomTV })
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Internal Sever Error" });
    }
}
export async function getTvTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.json({ success: true, trailers: data.results });

    } catch (error) {
        if (error.message.includes("404")) {
            console.log("Error: ", error.message);
            return res.status(404).send(null);
        }
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Internal Sever Error" });


    }
}

export async function getTvDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Internal Sever Error" });
    }
}

export async function getSimilarTv(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Internal Sever Error" });

    }
}

export async function getTvByCatagory(req, res) {
    const { catagory } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${catagory}?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results })

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: "Internal Sever Error" });
    }
}