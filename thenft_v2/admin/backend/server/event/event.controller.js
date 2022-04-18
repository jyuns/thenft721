const Event = require('./event.model');
const Collection = require('../collection/collection.model');

function load(req, res, next) {
    Event.load()
        .then((event) => {
            return res.status(200).json(event)
        })
        .catch(err => next(err))
}

function get(req, res, next) {
    Event.get(req.params.id)
        .then((event) => {
            return res.status(200).json(event)
        })
        .catch(err => next(err))
}

async function create(req, res, next) {
    let data = req.body;

    data.division = data.division.type
    data.source = data.source.value

    data.start_date = data.start_date.date.length? `${data.start_date.date} ${data.start_date.time}` : new Date()
    data.end_date = data.end_date.date.length? `${data.end_date.date} ${data.end_date.time}` : new Date()

    // KST 변환
    data.start_date = new Date(new Date(data.start_date).getTime()+32400000 )
    data.end_date = new Date(new Date(data.end_date).getTime()+32400000)

    let find = await Collection.get(data.collections.array[0])

    data.collection_id = find._id
    data.name = find.name
    data.name_kor = find.name_kor
    data.image = find.sub_image

    delete data.collections
    delete data.label

    if(!data.id) {
        delete data.id
        const newEvent = new Event({
            ...data
        })
    
        newEvent.save()
            .then(saved => res.json(saved))
            .catch(e => next(e));
    } else {
        let _id = data.id
        delete data.id

        await Event.findByIdAndUpdate({
            _id: _id
        }, {
            ...data
        })

        res.status(200).send('success')
    }
}

function remove(req, res, next) {    
    Event.findByIdAndDelete({_id:req.params.id})
        .then((event) => {
            return res.status(200).json(event)
        })
        .catch(err => next(err))
}

module.exports = { load, get, create, remove }
