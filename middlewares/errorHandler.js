/*
    This errorhandler middleware is called whenever any error is caught.
    It will then render the error page, passing the appropriate error messages
    and status code.
*/
const errorHandler = (err, _, res, __) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = "Default Error Message!"
    res.status(statusCode).render('layout/error', { err, statusCode })
}

module.exports = { errorHandler }
