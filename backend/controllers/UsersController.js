import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getAllUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'username', 'email', 'role'],
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'username', 'email', 'role'],
            where: {
                uuid: req.params.uuid
            },
        });

        if (!user) return res.status(404).json({ msg: "User not found!" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const addUser = async (req, res) => {
    const { username, name, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak sama!" });
    const hashPassword = await argon2.hash(password);

    try {
        const user = await Users.create({
            username: username,
            name: name,
            email: email,
            password: hashPassword,
            role: role,
        });

        res.status(201).json({ msg: "User successfully added!", user });
    } catch (error) {
        console.error("Validation error details:", error.errors);
        res.status(400).json({ msg: "Validation error", errors: error.errors });
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.uuid
            }
        });

        if (!user) return res.status(404).json({ msg: "User not found!" });

        const { username, name, email, password, confirmPassword } = req.body;

        let hashPassword;
        if (password === "" || password == null) {
            hashPassword = user.password;
        } else {
            hashPassword = await argon2.hash(password);
        }

        if (password !== confirmPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok!" });

        await Users.update({
            username: username, 
            name: name, 
            email: email, 
            password: hashPassword
        },
            {
                where: {
                    uuid: user.uuid
                }
            });

        res.status(200).json({ msg: "User successfully updated!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.uuid
            }
        });

        if (!user) return res.status(404).json({ msg: "User not found!" });

        await Users.destroy(
            {
                where: {
                    uuid: user.uuid
                }
            });

        res.status(200).json({ msg: "User successfully deleted!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
