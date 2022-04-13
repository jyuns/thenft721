const Partner = require('./partner.model');

function load(req, res, next) {
    Partner.load()
        .then((partner) => {
            return res.status(200).json(partner)
        })
        .catch(err => next(err))
}

function get(req, res, next) {
    Partner.get(req.body.id)
        .then((partner) => {
            return res.status(200).json(partner)
        })
        .catch(err => next(err))
}

function search(req, res, next) {
    Partner.search(req.query.value)
        .then((partner) => {
            return res.status(200).json(partner)
        })
        .catch(err => next(err))
}

function create(req, res, next) {
    
}

function update(req, res, next) {
    
}

function remove(req, res, next) {
    
}

module.exports = { load, get, search, create, update, remove }
