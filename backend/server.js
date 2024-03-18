require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();

// Connect to the database
const connectDB = require('./config/db');
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Routes
const chatRoute = require('./routes/chatRoute');
const authRoute = require('./routes/authRoutes');
app.use('/api/chat', chatRoute);
app.use('/api/auth', authRoute);

// Error handling middleware
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

// Start the server
const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
