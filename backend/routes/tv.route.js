import express from "express";
import { getTrendingTV, getTvDetails, getTvTrailers, getSimilarTv, getTvByCatagory } from "../controller/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTV);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTv);
router.get("/:catagory", getTvByCatagory);

export default router;