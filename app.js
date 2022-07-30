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
app.use(logger)

// load util functions
const asyncWrap = require('./utils/asyncWrap')
const ExpressError = require('./utils/ExpressError')

// load our models
const BlogPost = require('./models/blog')
const User = require('./models/user')

// connect to mongoose
const mongoose = require('mongoose')
const { wrap } = require('module')
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
app.use(express.static('static'))

// parse incoming request body
app.use(express.urlencoded({ extended: true,}))

app.get('/', (req, res) => {
    res.render('templates/home')
})

// auth - login, register, logout
app.get('/login', (req, res) => {
    res.render('auth/login')
})
app.post('/login', asyncWrap(async(req, res) => {
    const { username, password } = req.body
    const user = await User.validate(username, password)
    if(user) {
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
}))

app.get('/register', (req, res) => {
    res.render('auth/register')
})
app.post('/register', asyncWrap(async(req, res) => {
    const user = new User(req.body)
    await user.save()
    res.redirect('/')
}))

// blog - read all
app.get('/blog', asyncWrap(async(req, res) => {
    const blogs = await BlogPost.find({})
    res.render('blog/index', { blogs })
}))

// blog - create
app.get('/blog/create', (req, res) => {
    res.render('blog/create')
})
app.post('/blog/create', asyncWrap(async(req, res) => {
    const newblog = new BlogPost(req.body)
    await newblog.save()
    res.redirect(`/blog/${newblog.id}`)
}))

// blog - read
app.get('/blog/:id', asyncWrap(async(req, res) => {
    const blog = await BlogPost.findById(req.params.id)
    res.render('blog/view', { blog })
}))

// blog - update
app.get('/blog/:id/edit', asyncWrap(async(req, res) => {
    const blog = await BlogPost.findById(req.params.id)
    res.render('blog/edit', { blog })
}))

// blog - save update
app.put('/blog/:id', asyncWrap(async(req, res) => {
    const { id } = req.params
    // console.log("put route")
    // console.log(req.body)
    const blog = await BlogPost.findByIdAndUpdate(
        id, { ...req.body }
    )
    res.redirect(`/blog/${blog._id}`)
}))

// blog - delete TODO
app.delete('/blog/:id', asyncWrap(async(req, res) => {
    console.log("DELETE ROUTE")
    const { id } = req.params
    await BlogPost.findByIdAndDelete(id)
    res.redirect('/blog')
}))

app.all("*", (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

// custom middleware to catch all errors here
app.use(
    (err, req, res, next) => {
        const { statusCode = 500 } = err
        if (!err.message) err.message = "Default Error Message!"
        res.status(statusCode).render('layout/error', { err, statusCode })
    }
)

// display active port
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}...`)
})
