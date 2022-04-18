const Promotion = require('./promotion.model');

function load(req, res, next) {
    Promotion.load()
        .then((promotion) => {
            return res.status(200).json(promotion)
        })
        .catch(err => next(err))
}

function get(req, res, next) {
    Promotion.get(req.body.id)
        .then((promotion) => {
            return res.status(200).json(promotion)
        })
        .catch(err => next(err))
}

module.exports = { load, get }
