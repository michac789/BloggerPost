const express = require('express')
const app = express()

PORT = 3100

app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>")
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}...`)
})
