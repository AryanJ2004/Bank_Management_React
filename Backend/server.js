const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS and allow requests from your frontend
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Allow credentials (if needed)
};

app.use(cors(corsOptions)); // Use the cors middleware with options
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/banks', require('./routes/banks'));
app.use('/api/admin', require('./routes/admin'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
