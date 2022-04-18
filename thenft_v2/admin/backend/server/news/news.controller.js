const News = require('./news.model');
const Collection = require('../collection/collection.model')

function load(req, res, next) {
    News.load()
        .then((news) => {
            return res.status(200).json(news)
        })
        .catch(err => next(err))
}

function get(req, res, next) {
    News.get(req.params.id)
        .then((news) => {
            return res.status(200).json(news)
        })
        .catch(err => next(err))
}

async function create(req, res, next) {
    let data = req.body;

    let find = await Collection.get(data.collections.array[0])
    data.collection_id = find._id
    data.name = find.name

    delete data.collections
    delete data.label

    data.title = data.title.value
    data.source = data.source.value

    if(!data.id) {
        delete data.id
        const newNews = new News({
            ...data
        })
    
        newNews.save()
            .then(saved => res.json(saved))
            .catch(e => next(e));
    } else {
        let _id = data.id
        delete data.id

        await News.findByIdAndUpdate({
            _id: _id
        }, {
            ...data
        })

        res.status(200).send('success')
    }
}

function remove(req, res, next) {    
    News.findByIdAndDelete({_id:req.params.id})
        .then((news) => {
            return res.status(200).json(news)
        })
        .catch(err => next(err))
}

module.exports = { load, get, create, remove }
