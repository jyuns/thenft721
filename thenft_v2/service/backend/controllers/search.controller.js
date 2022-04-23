const Search = require('../models/search.model');

function load(req, res, next) {
    let keyword = req.query.keyword;
    if(!keyword) return

    Search.load(keyword)
    .then((cursor) => {
        return res.json(cursor)
    })
    .catch(err => next(err))
}

module.exports = { load }