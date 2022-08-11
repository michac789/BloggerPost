/*
    This loginRequired middleware ensures the user is the same user as
    the 'username' parameter. Or else, do not grant access.
    Please use the 'loginRequired' middleware before calling this.
*/
const selfUser = (req, res, next) => {
    const { username } = req.params
    if (req.user.username !== username) {
        req.flash('error', "You are not allowed to edit other people's profile!")
        return res.redirect(`/profile/${username}`)
    }
    next()
}

module.exports = { selfUser }
