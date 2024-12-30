// middleware/protectRoute.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Ensure this matches the cookie name in generateTokenAndSetCookie

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.id).select("-password"); // Change userId to id

        if (!user) {
            return res.status(404).json({ error: "User  not found" });
        }

        req.user = user; // Attach user to request object

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;