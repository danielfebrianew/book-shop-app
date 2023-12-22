import express from "express";
import {
    currentUser, 
    Login,
    Logout
} from "../controllers/AuthController.js";

const router = express.Router();

router.get('/currentUser', currentUser);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router;
