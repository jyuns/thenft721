const Collection = require('../collection/collection.model');
const Partner = require('../partner/partner.model');

function upload(req, res, next) {
    console.log(req.file)
}

function update(req, res, next) {

}

module.exports = {upload, update};