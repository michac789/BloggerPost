/*
    This loginRequired middleware ensures the user is logged in to access a view.
    If the user is not logged in, they will be redirected to login page.
    After they are logged in, they will be redirected to where they left.
    (this last logic is handled in login post route)
*/
const loginRequired = (req, res, next) => {
    console.log(req.originalUrl)
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Please sign in to view this route!')
        return res.redirect('/auth/login')
    }
    next()
}

module.exports = { loginRequired }
