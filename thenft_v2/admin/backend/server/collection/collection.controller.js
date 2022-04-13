const Collection = require('./collection.model');
const Partner = require('../partner/partner.model');
const Project = require('../project/project.model');

function load(req, res, next) {
    Collection.load()
        .then((collection) => {
            return res.status(200).json(collection)
        })
        .catch(err => next(err))
}

function get(req, res, next) {
    Collection.get(req.body.id)
        .then((collection) => {
            return res.status(200).json(collection)
        })
        .catch(err => next(err))
}

function search(req, res, next) {
    Collection.search(req.query.value)
        .then((collection) => {
            return res.status(200).json(collection)
        })
        .catch(err => next(err))
}

async function create(req, res, next) {

    let data = req.body

    // remove empty array
    data.channel = data.channel.array.filter(val => {
        if(!val.type.length || !val.value.length) return val
    });

    data.team = data.team.array.filter(val => {
        if(!val.name.length || !val.position.length) return val
    });

    data.name = data.name.value;
    data.name_kor = data.name_kor.value;
    data.description = data.description.value;
    data.email = data.email.value;
    data.network = data.network.type;
    data.status = data.status.type;

    let collection, partner, project
    collection = []
    partner = []
    project = []

    for(let i in data.collection.array) {
        let find = await Collection.get(data.collection.array[i]._id)
        if(find) collection.push({
            collection_id: find._id,
            name: find.name,
            name_kor: find.name_kor,
            image: find.sub_image
        })
    }

    for(let i in data.partner.array) {
        let find = await Partner.get(data.partner.array[i]._id)
        if(find) partner.push(find)
    }

    for(let i in data.project.array) {
        let find = await Project.get(data.project.array[i]._id)
        if(find) project.push(find)
    }

    console.log(collection, partner, project)
}

function update(req, res, next) {
    
}

function remove(req, res, next) {
    
}

module.exports = { load, get, search, create, update, remove }