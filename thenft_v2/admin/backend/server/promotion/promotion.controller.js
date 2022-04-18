const Promotion = require('./promotion.model');

function load(req, res, next) {
    Promotion.load()
        .then((promotion) => {
            return res.status(200).json(promotion)
        })
        .catch(err => next(err))
}

function get(req, res, next) {
    Promotion.get(req.params.id)
        .then((promotion) => {
            return res.status(200).json(promotion)
        })
        .catch(err => next(err))
}

async function create(req, res, next) {
    let data = req.body;

    delete data.label

    data.code = data.code.value;
    data.used = data.used.type;

    if(!data.id) {
        delete data.id
        const newPromotion = new Promotion({
            ...data
        })
    
        newPromotion.save()
            .then(saved => res.json(saved))
            .catch(e => next(e));
    } else {
        let _id = data.id
        delete data.id

        await Promotion.findByIdAndUpdate({
            _id: _id
        }, {
            ...data
        })

        res.status(200).send('success')
    }

}

module.exports = { load, get, create }
