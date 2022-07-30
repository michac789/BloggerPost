// load express
const express = require('express')
const router = express.Router()

// load models
const User = require('../models/user')

// load utils
const asyncWrap = require('../utils/asyncWrap')
const ExpressError = require('../utils/ExpressError')

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', asyncWrap(async(req, res) => {
    const { username, password } = req.body
    const user = await User.validate(username, password)
    if(user) {
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
}))

router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', asyncWrap(async(req, res) => {
    const user = new User(req.body)
    await user.save()
    res.redirect('/')
}))

module.exports = router