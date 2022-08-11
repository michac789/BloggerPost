const express = require('express')
const router = express.Router()

const asyncWrap = require('../utils/asyncWrap')
const Profile = require('../controllers/profile')


router.route('/:username')
    .get(asyncWrap(Profile.view))
    .post(asyncWrap(Profile.update))

router.route('/:username/edit')
    .get(asyncWrap(Profile.edit))


module.exports = router
