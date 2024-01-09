import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
const port = process.env.PORT || 3000;
import mongoose from 'mongoose';
import router from './routes/index.js';

// Use JSON middleware to parse JSON bodies
app.use(express.json());

// Database Connection URL from .env file
const dbURI = process.env.DB_URI;

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error: ', err));

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DATABASE_URL');
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Use the router for handling routes
app.use('/api', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});