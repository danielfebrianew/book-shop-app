import express from "express";
import {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
} from "../controllers/UsersController.js";

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:uuid', getUserById);
router.post('/users', addUser);
router.patch('/users/:uuid', updateUser);
router.delete('/users/:uuid', deleteUser);

export default router;
