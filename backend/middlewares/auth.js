import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Function to verify a JWT token

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    // If there is no token, return an error
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // Continue to the next middleware/route handler
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expired' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }    
}

export default verifyToken;