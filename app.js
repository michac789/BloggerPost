// load express, path, define port number
const express = require('express')
const app = express()
const path = require('path')
const PORT = 3100

// allow other request methods such as "PUT" or "DELETE"
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

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
    res.render('templates/home')
})

// blog - read all
app.get('/blog', async(req, res) => {
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
    res.redirect(`/blog/${newblog.id}`)
})

// blog - read
app.get('/blog/:id', async(req, res) => {
    const blog = await BlogPost.findById(req.params.id)
    res.render('blog/view', { blog })
})

// blog - update
app.get('/blog/:id/edit', async(req, res) => {
    const blog = await BlogPost.findById(req.params.id)
    res.render('blog/edit', { blog })
})

// blog - save update
app.put('/blog/:id', async(req, res) => {
    const { id } = req.params
    // console.log("put route")
    // console.log(req.body)
    const blog = await BlogPost.findByIdAndUpdate(
        id, { ...req.body }
    )
    res.redirect(`/blog/${blog._id}`)
})

// blog - delete TODO
app.delete('/blog/:id', async(req, res) => {
    console.log("DELETE ROUTE")
    const { id } = req.params
    await BlogPost.findByIdAndDelete(id)
    res.redirect('/blog')
})

// display active port
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}...`)
})
