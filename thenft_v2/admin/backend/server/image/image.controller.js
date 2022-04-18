const Collection = require('../collection/collection.model');
const Partner = require('../partner/partner.model');

function upload(req, res, next) {

    let _id = req.query._id
    let data = {}

    data[req.query.label] = req.file.location
    
    if(req.query.label != 'image') {
        return Collection.findByIdAndUpdate({
            _id: _id,
        }, {
            ...data
        }).lean().exec()

    } else {
        return Partner.findByIdAndUpdate({
            _id: _id,
        }, {
            ...data
        }).lean().exec()
    }
}

module.exports = { upload };