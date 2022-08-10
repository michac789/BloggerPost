const express = require('express')
const router = express.Router()


router.get('', (_, res) => {
    res.render('templates/home')
})

module.exports = router
