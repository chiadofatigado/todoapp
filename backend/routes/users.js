import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const router = express.Router();

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already in use.' });
    }

    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();

    const token = generateToken(savedUser);
    res.status(201).json({
      username: savedUser.username,
      email: savedUser.email,
      token: token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering new user.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = generateToken(user);
    res.json({
      username: user.username,
      email: user.email,
      token: token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in.' });
  }
});

//TODO: Protect this route, admins only
// Get all users route
router.get('/', async (req, res) => {
  try {
    // Pagination
    // We are destructuring the variables from the request. We provide default values if they come empty
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find()
                            .limit(limit * 1) // We multiply by 1 to convert the string to a number
                            .skip((page - 1) * limit) // We skip the number of documents that we have already retrieved
                            .sort({ createdAt: -1 }) // We sort the documents by their creation date in descending order
                            .exec();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users.' });
  }
});

// Logout route is not implemented. 

// Logout is handled on the client side by removing the token from storage.

export default router;
