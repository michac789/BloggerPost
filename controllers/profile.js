const { register } = require("../models/user")
const User = require("../models/user")


module.exports.view = async (req, res) => {
    console.log(req.params.username)
    const curr_user = await User.findOne({
        "username": req.params.username,
    })
    if (!curr_user) {
        req.flash('error', "Invalid username!")
        next()
    }
    res.render('profile/view', { curr_user })
}

module.exports.edit = async (req, res) => {
    const curr_user = await User.findOne({
        "username": req.params.username,
    })
    res.render('profile/edit', { curr_user })
}

module.exports.update = async (req, res) => {
    console.log(req.body)
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
