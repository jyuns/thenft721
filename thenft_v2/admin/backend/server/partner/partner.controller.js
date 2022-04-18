const Partner = require('./partner.model');

function load(req, res, next) {
    Partner.load()
        .then((partner) => {
            return res.status(200).json(partner)
        })
        .catch(err => next(err))
}

function get(req, res, next) {
    Partner.get(req.params.id)
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

async function create(req, res, next) {
    let data = req.body;

    data.name = data.name.value
    data.source = data.source.value
    data.division = data.division.type
    data.image = data.image.sorce

    delete data.label

    if(!data.id) {
        delete data.id
        
        const newPartner = new Partner({
            ...data
        })

        newPartner.save()
            .then(saved => res.json(saved))
            .catch(e => next(e));

    } else {
        let _id = data.id
        delete data.id

        await Partner.findByIdAndUpdate({
            _id: _id
        }, {
            ...data
        })
        res.status(200).send('success')
    }
}

function remove(req, res, next) {
    
}

module.exports = { load, get, search, create, remove }
