const { User } = require("../models");

module.exports = {
    getAll: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ["id", "name", "email", "role", "createdAt"],
                order: [
                    ['createdAt', 'DESC'],
                ]
            });
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: ["id", "name", "email", "role", "createdAt"]
            });
            if (!user) return res.status(404).json({ message: "User not found" });

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            const exist = await User.findOne({ where: { email } });
            if (exist) return res.status(400).json({ message: "Email already exists" });

            const user = await User.create({ name, email, password, role });

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

    update: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ message: "User not found" });

            await user.update({ name, email, password, role });

            res.json({
                message: "User updated",
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

    delete: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ message: "User not found" });

            await user.destroy();
            res.json({ message: "User deleted" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
