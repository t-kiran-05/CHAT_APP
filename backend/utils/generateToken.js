
       // utils/generateToken.js
import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '15d', // Set to 15 days for longer sessions
    });

    res.cookie('jwt', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
        maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expiration time (15 days in milliseconds)
        sameSite: 'strict', // Helps prevent CSRF attacks
    });

    return token; // Optionally return the token if needed
};

export default generateTokenAndSetCookie;
       
       