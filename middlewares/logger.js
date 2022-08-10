/*
    This logger middleware mimics the 'morgan' middleware.
    It displays the date and time, request method, url route, and
    time taken for the server to respond.
*/
const chalk = require("chalk")

const logDateTime = () => {
    const current_datetime = new Date()
    const formatted_date =
        current_datetime.getFullYear() + "-" +
        ("0" + (current_datetime.getMonth() + 1)).slice(-2) + "-" +
        ("0" + current_datetime.getDate()).slice(-2) + " " +
        ("0" + current_datetime.getHours()).slice(-2) + ":" +
        ("0" + current_datetime.getMinutes()).slice(-2) + ":" +
        ("0" + current_datetime.getSeconds()).slice(-2)
    return `[${chalk.magenta(formatted_date)}]`
}

const logMethodAndRoute = (req, res) => {
    const method = req.method
    const url = req.url
    const status = res.statusCode
    return `${chalk.blue(method)} ${url} ${chalk.cyan(status)}`
}

const logResponseTime = () => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(process.hrtime())
    const time = (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
    return `${chalk.yellow(time.toLocaleString() + " ms")}`
}

const logger = (req, res, next) => {
    console.log(
        logDateTime() + " " +
        logMethodAndRoute(req, res) + " - " +
        logResponseTime() 
    )
    next()
}

module.exports = { logger }
