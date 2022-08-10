const express = require('express')
const router = express.Router()

const asyncWrap = require('../utils/asyncWrap')
const Profile = require('../controllers/profile')


router.route('/:username').get(asyncWrap(Profile.view))


module.exports = router
