const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const exist = await User.findOne({ where: { email } });
            if (exist) return res.status(400).json({ message: "Email already exists" });

            const user = await User.create({ name, email, password });

            res.json({
                message: "Registration success",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) return res.status(404).json({ message: "User not found" });

            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.status(400).json({ message: "Invalid password" });

            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET || "secret123",
                { expiresIn: "1d" }
            );

            res.json({
                message: "Login success",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
