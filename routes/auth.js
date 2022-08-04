const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../models/user')
const asyncWrap = require('../utils/asyncWrap')


// middleware - TODO


router.get('/register', (_, res) => {
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
        console.log(err) // TODO - handle error cases
        req.flash('error', `Error: ${err}`)
        res.redirect('/auth/register')
    }
}))

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/auth/login',
        failureMessage: true,
        keepSessionInfo: true,
    }), (req, res) => {
        req.flash('success', `Welcome back, ${req.user.username}!`)
        const redirectUrl = req.session.returnTo || '/'
        delete req.session.returnTo
        res.redirect(redirectUrl)
})

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err) }
        req.flash('success', `Successfully logged out!`)
        res.redirect('/auth/login')
    })
})

module.exports = router