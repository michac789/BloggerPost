/*
    This utility function wraps asynchronous function and catches is error.
    With this function, we don't have to do try catch for every function,
    instead we can just wrap the function inside (aka use decorator).
    It is then passed on to the next middleware that catches the error, and
    gracefully handle the error.
*/

module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next)
    }
}
