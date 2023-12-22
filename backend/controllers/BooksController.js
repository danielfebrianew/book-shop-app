import Ratings from "../models/RatingModel.js";
import Books from "../models/BookModel.js";

export const getAllBooks = async (req, res) => {
    try {
        const response = await Books.findAll({
            attributes: ['id', 'title', 'author', 'price', 'synopsis', 'category', 'image'],
            include: [{ model: Ratings, attributes: ['rate', 'count'] }]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getBookById = async (req, res) => {
    try {
        const book = await Books.findOne({
            attributes: ['id', 'title', 'author', 'price', 'synopsis', 'category', 'image'],
            where: {
                id: req.params.id
            },
            include: [{ model: Ratings, attributes: ['rate', 'count'] }]
        });

        if (!book) return res.status(404).json({ msg: "Data tidak ditemukan!" });

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const addBook = async (req, res) => {
    const { title, author, price, synopsis, category, image, ratingId } = req.body;

    try {
        const book = await Books.create({
            title: title,
            author: author,
            price: price,
            synopsis: synopsis,
            category: category,
            image: image,
            ratingId: ratingId
        });
        console.log("Synopsis in Response:", book.synopsis);
        console.log("Synopsisss:", synopsis);
        res.status(201).json({ msg: "Book successfully added!", book });
    } catch (error) {
        console.error("Validation error details:", error.errors);
        res.status(500).json({ msg: "Validation error", errors: error.errors });
    }
}

export const updateBook = async (req, res) => {
    try {
        const book = await Books.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!book) return res.status(404).json({ msg: "Data tidak ditemukan!" });
        const { title, author, price, synopsis, category, image, ratingId } = req.body;

        await Books.update({ title, author, price, synopsis, category, image, ratingId },
            {
                where: {
                    id: book.id
                }
            });

        res.status(200).json({ msg: "Book successfully updated!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteBook = async (req, res) => {
    try {
        const book = await Books.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!book) return res.status(404).json({ msg: "Data tidak ditemukan!" });
        await Books.destroy(
            {
                where: {
                    id: book.id
                }
            });

        res.status(200).json({ msg: "Book successfully deleted!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
