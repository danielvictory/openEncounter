// Set up dependencies in variables to call
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();

// Set up app
const PORT = process.env.PORT || 4000;
const app = express();

// Set up database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
    // Database Connection Error/Success
    // Define callback functions for various events
    db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
    db.on('connected', () => console.log('mongo connected'));
    db.on('disconnected', () => console.log('mongo disconnected'));

// Define Controllers as variables
// const authorsController = require("./controllers/authors.js")
// const articlesController = require("./controllers/articles.js")

// Middleware
    // Use static public folder
app.use(express.static('public'));
    // Specific methods for language wrangling
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
//     // Controllers
// app.use('/authors', authorsController)
// app.use('/articles', articlesController)

// First Route for Hookup
app.get('/', (req, res) => {
    res.send(`<h1>Get yr dice ready, kid</h1>`)
})

// Listening for app
app.listen(PORT, () => {
    console.log(`ROLL INITIATIVE on PORT ${PORT}`)
})