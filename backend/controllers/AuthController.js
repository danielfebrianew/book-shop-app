import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                username: req.body.username
            }
        });
    
        if (!user) return res.status(404).json({ msg: "User not found!" });
    
        const match = await argon2.verify(user.password, req.body.password);
    
        if(!match) return res.status(400).json({msg: "Wrong Password!"});
    
        req.session.userId = user.uuid;
    
        const uuid = user.uuid;
        const name = user.name;
        const username = user.username;
        const email = user.email;
        const role = user.role;
    
        res.status(200).json({uuid, name, username, email, role});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const currentUser = async (req, res) => {
    try {
        if(!req.session.userId){
            return res.status(401).json({msg: "Mohon Login ke Akun Anda!"});
        }
    
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'username', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        });
    
        if (!user) return res.status(404).json({ msg: "User not found!" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const Logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).json({ msg: "Internal Server Error" });
            }
            res.status(200).json({ msg: "Successfully Logged Out!" });
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
