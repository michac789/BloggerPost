const express = require('express')
const router = express.Router()


router.get('', (_, res) => {
    res.render('templates/home')
})

router.get('/about', (_, res) => {
    res.render('templates/about')
})

module.exports = router
