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
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// load views & static folder
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static('static'))

app.get('/', (req, res) => {
    res.render('blog/home')
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}...`)
})
