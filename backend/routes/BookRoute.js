import express from "express";
import {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
} from "../controllers/BooksController.js"

const router = express.Router();

router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books', addBook);
router.patch('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;