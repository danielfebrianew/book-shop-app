import Ratings from "../models/RatingModel.js";

export const getAllRatings = async (req, res) => {
    try {
        const response = await Ratings.findAll({
            attributes: ['id', 'rate', 'count']
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getRatingById = async (req, res) => {
    try {
        const rating = await Ratings.findOne({
            attributes: ['id', 'rate', 'count'],
            where: {
                id: req.params.id
            }
        });

        if (!rating) return res.status(404).json({ msg: "Rating not found!" });

        res.status(200).json(rating);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const addRating = async (req, res) => {
    const { rate, count } = req.body;

    try {
        const rating = await Ratings.create({
            rate: rate,
            count: count
        });

        res.status(201).json({ msg: "Rating successfully added!", rating });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateRating = async (req, res) => {
    try {
        const rating = await Ratings.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!rating) return res.status(404).json({ msg: "Rating not found!" });
        const { rate, count } = req.body;

        await Ratings.update({ rate, count },
            {
                where: {
                    id: rating.id
                }
            });

        res.status(200).json({ msg: "Rating successfully updated!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteRating = async (req, res) => {
    try {
        const rating = await Ratings.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!rating) return res.status(404).json({ msg: "Rating not found!" });
        await Ratings.destroy(
            {
                where: {
                    id: rating.id
                }
            });

        res.status(200).json({ msg: "Rating successfully deleted!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
