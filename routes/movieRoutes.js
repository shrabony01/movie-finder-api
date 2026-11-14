import express from "express";

import { searchMovies,getMovieDetails } from "../controllers/movieController.js";

//creating a mini-router to organize all movie-related routes
const router = express.Router();

router.get("/search",searchMovies);
router.get("/movies/:id",getMovieDetails);

export default router;