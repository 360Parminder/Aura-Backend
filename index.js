require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/db/database');
const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Correct CORS configuration to handle all requests
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Connect to the database
connectDB();

// Routes
app.use('/', require('./src/routes/userAuthRoutes.js'));
app.use('/', require('./src/routes/adminAuthRoutes.js'));
app.use('/', require('./src/routes/userRoutes.js'));
app.use('/', require('./src/routes/MediaRoutes.js'));


// Additional routes can be uncommented as needed
// app.use('/', require('./src/routes/playList.js'));
// app.use('/', require('./src/routes/Video.js'));
// app.use('/',require('./src/routes/show.js'));
// app.use('/api', require('./src/routes/transactionRoutes'));

// Define PORT from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
