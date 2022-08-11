const express = require('express')
const router = express.Router()

const asyncWrap = require('../utils/asyncWrap')
const Profile = require('../controllers/profile')

const { loginRequired } = require('../middlewares/loginRequired')
const { selfUser } = require('../middlewares/selfUser')


router.route('/:username')
    .get(asyncWrap(Profile.view))
    .post(asyncWrap(Profile.update))

router.route('/:username/edit')
    .get(loginRequired, selfUser, asyncWrap(Profile.edit))


module.exports = router
