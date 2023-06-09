// Require
const mongoose = require('mongoose')

// Set base Schema
const encounterSchema = new mongoose.Schema({
    title: {type: String, default: "Anonymous Encounter"},
    campaign: String,
    isPublic: {type: Boolean, default: true},
    playerCharacter: [],
    adversaries: [],
    createdBy: String,
    },
    {timestamps: true}
)

// Set Schema to class variable with mongoose
const Encounter = mongoose.model("Encounter", encounterSchema)

// export
module.exports = Encounter;