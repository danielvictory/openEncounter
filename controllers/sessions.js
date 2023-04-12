
// Dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();

// Import model in variable
const User = require('../models/user.js');

// ===== Routes =====

    // ====== New (login page) ======
sessionsRouter.get('/new', (req, res) => {
	res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser,
    })
})

    // ===== Delete (logout route) =====
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/')
    })
})

    // ===== Create (login route) =====
sessionsRouter.post('/', async (req, res) => {
    // Try to find user
    const foundUser = await User.findOne({email: req.body.email}).exec();

    // Check for existing user
    if (!foundUser) {
        res.send('oopsie, not a registered email bestie.')
    } else {

        // Check for matching password
        const pwMatch = bcrypt.compareSync(req.body.password, foundUser.password)

        // Check password match
        if (pwMatch) {
            req.session.currentUser = foundUser;
            res.redirect('/')
        } else {
            res.send('NO NO NO WRONG PW >:(')
        }
    }
})

// ===== End Routes =====

// Export Sessions Router
module.exports = sessionsRouter;