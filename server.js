// Set up dependencies in variables to call
const express = require('express');
const session = require('express-session')
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

// set call to other functions
const sidecar = require("./public/sidecar")

// Middleware
    // Session Secrets shhhhhh....
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
    // Use static public folder
app.use(express.static('public'));
    // Specific methods for language wrangling
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
     // Controllers
        // Users
const usersController = require('./controllers/users');
app.use('/users', usersController);
        // Sessions
const sessionsController = require('./controllers/sessions')
app.use('/sessions', sessionsController)
        // Encounters
const encountersController = require("./controllers/encounters.js")
app.use('/encounters', encountersController)

// Home/ Landing page connection
app.get('/', (req, res) => {
    res.render("home.ejs", {
        currentUser: req.session.currentUser,
        sidecar: sidecar
    })
})

// Listening for app
app.listen(PORT, () => {
    console.log(`ROLL INITIATIVE on PORT ${PORT}`)
})