const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../models/user')
const asyncWrap = require('../utils/asyncWrap')

// middleware - TODO
const loginRequired = (req, res, next) => {
    if (!req.session.user_id) {
        // flash - TODO
        return res.redirect('/auth/login')
    }
    next()
}

router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', asyncWrap(async(req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err)
            res.redirect('/')
        })
    } catch (err) {
        console.log(err)
        res.redirect('/auth/register')
    }
}))

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', passport.authenticate('local',
        { failureFlash: true, failureRedirect: '/auth/login' }),
        (req, res) => {
    //req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.post('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth/login')
})

router.get('/secret', loginRequired, (req, res) => {
    res.send("SECRET")
})

module.exports = router