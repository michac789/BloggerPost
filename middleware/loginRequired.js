const loginRequired = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Please sign in first to view this route!')
        return res.redirect('/auth/login')
    }
    next()
}

module.exports = { loginRequired }