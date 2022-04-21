const Event = require('../models/event.model');

function load(req, res, next) {
    let date = req.body.date

    Event.load(date)
    .then((cursor) => {
        return res.json(cursor)
    })
    .catch(err => next(err))
}

function next(req, res, next) {
    let last_id = req.body.last_id
    let date = req.body.date

    Event.next(last_id, date)
    .then((cursor) => {
        return res.json(cursor)
    })
    .catch(err => next(err))
}

function total(req, res, next) {

    let date = req.body.date

    Event.total(date)
    .then((total) => {
        return res.json(total)
    })
    .catch(err => next(err))
}

module.exports = { load, next, total }