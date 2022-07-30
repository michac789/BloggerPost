const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: [true, 'Username cannot be empty!'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password cannot be empty!"],
    },
    age: {
        type: Number,
        required: false,
        min: [12, "You must be at least 12 years old!"],
        max: [100, "Maximum age is 100 years old!"],
    },
})

userSchema.statics.validate = async function(username, password) {
    const user = await this.findOne({ username })
    const valid = await bcrypt.compare(password, user.password)
    return (valid ? user: false)
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

module.exports = mongoose.model('User', userSchema)
