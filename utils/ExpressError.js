/*
    This ExpressError class extends from the default js Error class.
    It provides two new instance variables:
    message of the error, and status code of the error
*/

class ExpressError extends Error {
    constructor(message, statusCode) {
        super()
        this.message = message
        this.statusCode = statusCode
    }
}

module.exports = ExpressError
