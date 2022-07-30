const logger = (req, res, next) => {
    console.log("logger helloooo")
    next()
}

module.exports = { logger }
