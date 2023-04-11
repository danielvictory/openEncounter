// Required dependencies
const express = require('express')
// const mongoose = require('mongoose');

// Set Router
const encounterRouter = express.Router();

// Import Schema
const Encounter = require('../models/encounter.js');

// ============ Routes =============

// ============ Index ==============
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

// ============= Delete ============
encounterRouter.delete('/:id', async (req, res) => {
    await Encounter.findByIdAndDelete(req.params.id)
    res.redirect("/encounters")
})


// ============= Update ============
encounterRouter.put('/:id', async (req, res) => {
    await Encounter.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/encounters/" + req.params.id)
})


// ============= Create ============
encounterRouter.post('/', (req, res) => {
    const e = new Encounter(req.body)
    e.save().then(res.redirect('/encounters/'+ e.id))
})


// ============= Edit ==============
encounterRouter.get("/:id/edit", async (req, res) => {
    const foundE = await Encounter.findById(req.params.id)
    res.render("encounters/edit.ejs", {
        encounter: foundE,
    })
})

// ============= Show ==============
encounterRouter.get("/:id", async (req, res) => {
    const foundE = await Encounter.findById(req.params.id)
    res.render("encounters/show.ejs", {
        encounter: foundE,
    })
})

// Export the controller
module.exports = encounterRouter;