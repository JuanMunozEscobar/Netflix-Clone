import express from 'express';
import { getMovieDetails, getTrendingMovie, getMovieTrailers, getSimilarMovies, getMovieByCatagory } from '../controller/movie.controller.js';


const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:catagory", getMovieByCatagory);

export default router;