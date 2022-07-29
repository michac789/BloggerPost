const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: String,
    content: String,
})

module.exports = mongoose.model('BlogPost', blogSchema)
