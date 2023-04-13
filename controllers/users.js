// Required Dependencies
const express = require('express');
const bcrypt = require('bcrypt');

// Set Router
const userRouter = express.Router();

// Set model to variable
const User = require('../models/user.js');
const Encounter = require('../models/encounter.js');

// Routes
// ======= Index =======
userRouter.get('/myencounters', async (req, res) => {
    const u = await User.findById(req.session.currentUser._id)

    if (u) {
        let es = []
        let x

        for(i=0; i<u.encounters.length; i++) {
            x = await Encounter.findById(u.encounters[i])
            es.push(x)
        }

        res.render('users/index.ejs', {
            currentUser: req.session.currentUser,
            encounters: es,
        })
    } else {
        res.redirect('/')
    }
})

// ======= New =======
userRouter.get('/new', (req, res) => {
	res.render('users/new.ejs', {
        currentUser: req.session.currentUser,
    });
}); 

// ====== Create ======
userRouter.post('/', (req, res) => {
    let b = req.body
    
    b.password = bcrypt.hashSync(b.password, bcrypt.genSaltSync(10));

    const u = new User(b)
    u.save()
    req.session.currentUser = u
    res.redirect('/')
});

// Export
module.exports = userRouter;