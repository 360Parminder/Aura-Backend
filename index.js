require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const connectDB = require('./src/db/database');
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
// app.use(cors()); // Enable CORS

// Connect to the database
connectDB();

// Routes
app.use('/', require('./src/routes/userRoutes.js'));
app.use('/', require('./src/routes/playList.js'));
// app.use('/api', require('./src/routes/transactionRoutes'));

// Define PORT from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
