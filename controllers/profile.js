const { register } = require("../models/user")
const User = require("../models/user")


module.exports.view = async (req, res) => {
    console.log(req.params.username)
    const user = await User.findOne({
        "username": req.params.username,
    })
    if (!user) {
        req.flash('error', "Invalid ID!")
        next()
    }
    res.render('profile/view', { user })
}

module.exports.edit = async (req, res) => {
    const user = await User.findOne({
        "username": req.params.username,
    })
    res.render('profile/edit', { user })
}

module.exports.update = async (req, res) => {
    const update = await User.updateOne({ username: req.params.username,}, {
        $set: {
            "email": req.body.email,
            "age": req.body.age,
            "status": req.body.status,
            "description": req.body.description,
            "gender": req.body.gender,
        }
    })
    if (update.acknowledged) {
        req.flash('success', `Successfully modified your profile!`)
    }
    res.redirect(`/profile/${req.params.username}`)
}
