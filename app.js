// load express, path, define port number
const express = require('express')
const app = express()
const path = require('path')
const PORT = 3100

// ejs-mate: allow making 'extended' view
const ejsMate = require('ejs-mate')
app.engine('ejs', ejsMate)

// method-override middleware
// allow other request methods such as "PUT" and "DELETE"
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// custom logger middleware
const { logger } = require('./middleware/logger')
const { errorhandler } = require('./middleware/errorhandler')
app.use(logger)

// load util functions
const asyncWrap = require('./utils/asyncWrap')
const ExpressError = require('./utils/ExpressError')

// connect to mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/blogpost', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("MongoDB database connected...")
})

// load views & static folder
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))


// parse incoming request body
app.use(express.urlencoded({ extended: true,}))

// load static files
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
    res.render('templates/home')
})

// auth app (register, login, logout)
const auth = require('./routes/auth')
app.use('/auth', auth)

// blog app
const blog = require('./routes/blog')
app.use('/blog', blog)

// error handler for other undefined routes
app.all("*", (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

// custom middleware to catch all errors here
app.use(errorhandler)

// display active port
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}...`)
})
