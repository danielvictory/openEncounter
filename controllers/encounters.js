// Required dependencies
const express = require('express')
// const mongoose = require('mongoose');

// Set Router
const encounterRouter = express.Router();

// Import Schema
const Encounter = require('../models/encounter.js');
const User = require('../models/user.js');

// ============ Routes =============

// ============ Index ==============
encounterRouter.get('/', async(req, res) => {
    const allEncounters = await Encounter.find({})
    res.render('encounters/index.ejs', {
        currentUser: req.session.currentUser,
        headerTitle: 'Encounters',
        encounters: allEncounters
    })
})

// ============== New ==============
encounterRouter.get('/new', (req, res) => {
    res.render("encounters/new.ejs",{
        currentUser: req.session.currentUser,
        pcCount: 1,
        adversaryCount: 1,
    })
})

// ============= Delete ============
encounterRouter.delete('/:id', async (req, res) => {
    let foundE = await Encounter.findById(req.params.id)
    let foundU = await User.findById(foundE.createdBy)

    if(foundU){
        foundU.encounters = foundU.encounters.filter(e => e !== req.params.id)
        await User.findByIdAndUpdate(foundE.createdBy, foundU)
    }

    await Encounter.findByIdAndDelete(req.params.id)
    res.redirect("/encounters")
})


// ============= Update ============
encounterRouter.put('/:id', async (req, res) => {
    let b = req.body
    b.isPublic = b.isPublic === 'on' ? true : false

    await Encounter.findByIdAndUpdate(req.params.id, b)
    res.redirect("/encounters/" + req.params.id)
})


// ============= Create ============
encounterRouter.post('/', async (req, res) => {

    const e = new Encounter(req.body)

    e.isPublic = req.body.isPublic === "on" ? true : false
    // console.log(e)

    if (req.session.currentUser) {

        console.log(req.session.currentUser._id)
        e.createdBy = req.session.currentUser._id
        e.save()

        let u = await User.findByIdAndUpdate(req.session.currentUser._id, {
            $push: {encounters: e.id}
        })
        console.log(u)
        console.log(e)

    } else {
        e.save()
    }
    res.redirect('/encounters/'+ e.id)
})


// ============= Edit ==============
encounterRouter.get("/:id/edit", async (req, res) => {
    const foundE = await Encounter.findById(req.params.id)
    res.render("encounters/edit.ejs", {
        currentUser: req.session.currentUser,
        encounter: foundE,
    })
})

// ============= Show ==============
encounterRouter.get("/:id", async (req, res) => {
    const foundE = await Encounter.findById(req.params.id)
    res.render("encounters/show.ejs", {
        currentUser: req.session.currentUser,
        encounter: foundE,
    })
})

// Export the controller
module.exports = encounterRouter;