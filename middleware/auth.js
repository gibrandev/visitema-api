const jwt = require("jsonwebtoken");

module.exports = function(requiredRole = 'user') {
    return function (req, res, next) {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(401).json({ message: "No token provided" });

        try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
        req.user = decoded;

        // Jika API membutuhkan role
        if (requiredRole) {
            const rolesAllowed = Array.isArray(requiredRole)
            ? requiredRole
            : [requiredRole];

            if (!rolesAllowed.includes(decoded.role) && decoded.role !== 'admin') {
                return res.status(403).json({ message: "Access forbidden: insufficient role" });
            }
        }

        next();
        } catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    };
};