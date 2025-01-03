import express from 'express';
import { getTrendingMovie } from '../controller/movie.controller.js';
import { getMovieTrailers } from '../controller/movie.controller.js';


const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers)

export default router;