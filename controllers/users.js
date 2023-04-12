// Required Dependencies
const express = require('express');
const bcrypt = require('bcrypt');

// Set Router
const userRouter = express.Router();

// Set model to variable
const User = require('../models/user.js');

// Routes
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