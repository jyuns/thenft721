const Project = require('./project.model');

function load(req, res, next) {
    Project.load()
        .then((project) => {
            return res.status(200).json(project)
        })
        .catch(err => next(err))
}

function get(req, res, next) {
    Project.get(req.body.id)
        .then((project) => {
            return res.status(200).json(project)
        })
        .catch(err => next(err))
}

function search(req, res, next) {
    Project.search(req.query.value)
        .then((project) => {
            return res.status(200).json(project)
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
