const User = require('../models/user')


module.exports.registerForm = (_, res) => {
    res.render('auth/register')
}

module.exports.registerDo = async(req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err)
            res.redirect('/')
        })
    } catch (err) {
        console.log(err) // TODO - handle error cases
        req.flash('error', `Error: ${err}`)
        res.redirect('/auth/register')
    }
}

module.exports.loginForm = (_, res) => {
    res.render('auth/login')
}

module.exports.loginDo = (req, res) => {
    req.flash('success', `Welcome back, ${req.user.username}!`)
    const redirectUrl = req.session.returnTo || '/'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logoutDo = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err) }
        req.flash('success', `Successfully logged out!`)
        res.redirect('/auth/login')
    })
}
