// Required dependencies
const express = require('express')
// const mongoose = require('mongoose');

// Set Router
const encounterRouter = express.Router();

// Import Schema
const Encounter = require('../models/encounter.js');

// ============ Routes =============

// Index
encounterRouter.get('/', async(req, res) => {
    const allEncounters = await Encounter.find({})
    res.render('encounters/index.ejs', {
        headerTitle: 'Encounters',
        encounters: allEncounters
    })
})

// ============== New ==============
encounterRouter.get('/new', (req, res) => {
    res.render("encounters/new.ejs",)
})




// Export the controller
module.exports = encounterRouter;