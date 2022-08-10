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
    res.render('profile/view')
}
