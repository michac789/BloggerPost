// load express, path, define port number
const express = require('express')
const app = express()
const path = require('path')
const PORT = 3100

// load our models
const BlogPost = require('./models/blog')

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
app.use(express.static('static'))

// parse incoming request body
app.use(express.urlencoded({ extended: true,}))

app.get('/', (req, res) => {
    res.render('blog/home')
})

// blog - read all
app.get('/blog/all', async(req, res) => {
    const blogs = await BlogPost.find({})
    res.render('blog/index', { blogs })
})

// blog - create
app.get('/blog/create', (req, res) => {
    res.render('blog/create')
})
app.post('/blog/create', async(req, res) => {
    const newblog = new BlogPost(req.body)
    await newblog.save()
    res.redirect(`/blog/all`)
})

// blog - read
app.get('/blog/:id', async(req, res) => {
    const blog = await BlogPost.findById(req.params.id)
    res.render('blog/view', { blog })
})

// blog - update TODO

// blog - delete TODO

// display active port
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}...`)
})
