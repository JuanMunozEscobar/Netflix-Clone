import { fetchFromTMDB } from "../services/tmdb.service.js"


export async function getTrendingMovie (req,res){
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({success: true, content: randomMovie});

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({success:false, message: "Internal Sever Error"});
    }
}

export async function getMovieTrailers(req, res){
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.json({success: true, trailers: data.results});

    } catch (error) {
        if(error.message.includes("404")){
            console.log("Error: " ,error.message);
            return res.status(404).send(null);
        }
        console.log("Error: ",error.message);
        res.status(500).json({success: false, message: "Internal Sever Error"});

        
    }
}