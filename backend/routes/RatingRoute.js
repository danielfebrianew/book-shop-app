// ratingsRoutes.js
import express from "express";
import {
    getAllRatings,
    getRatingById,
    addRating,
    updateRating,
    deleteRating
} from "../controllers/RatingsController.js";

const router = express.Router();

router.get('/ratings', getAllRatings);
router.get('/ratings/:id', getRatingById);
router.post('/ratings', addRating);
router.patch('/ratings/:id', updateRating);
router.delete('/ratings/:id', deleteRating);

export default router;
