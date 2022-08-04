const express = require('express')
const passport = require('passport')
const router = express.Router()

const asyncWrap = require('../utils/asyncWrap')
const Auth = require('../controllers/auth')


router.route('/register')
    .get(Auth.registerForm)
    .post(asyncWrap(Auth.registerDo))

router.route('/login')
    .get(Auth.loginForm)
    .post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/auth/login',
        failureMessage: true,
        keepSessionInfo: true,
    }), Auth.loginDo)

router.get('/logout', Auth.logoutDo)

module.exports = router
