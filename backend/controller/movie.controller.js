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

export async function getMovieDetails(req,res){
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({success: true, content: data});
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({success: false, message: "Internal Sever Error"});
    }
}

export async function getSimilarMovies(req,res){
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success: true, similar: data});
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({success: false, message: "Internal Sever Error"});
        
    }
}

export async function getMovieByCatagory(req, res){
    const { catagory } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${catagory}?language=en-US&page=1`);
        res.status(200).json({success: true, content: data.results})

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({success: false, message: "Internal Sever Error"});
    }
}