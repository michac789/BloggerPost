const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: [true, 'Username cannot be empty!'],
        unique: true,
    },
    age: {
        type: Number,
        required: false,
        min: [12, "You must be at least 12 years old!"],
        max: [100, "Maximum age is 100 years old!"],
    },
})

module.exports = mongoose.model('User', userSchema)
