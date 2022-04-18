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
    Collection.get(req.params.id)
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

    if(data.channels.array.length) {
        data.channels.array = data.channels.array.filter(val => {
            if (Object.keys(val).length !== 0) {
                if(val.division.length * val.source.length) return true
            } else {
                return false
            }
        });
    }

    data.teams.array = data.teams.array.filter(val => {
        if(val.name.length * val.position.length) return val
    });

    data.name = data.name.value;
    data.name_kor = data.name_kor.value;
    data.description = data.description.value;
    data.email = data.email.value;
    data.network = data.network.type;
    data.status = data.status.type;
    data.partners = data.partners.array;
    data.collections = data.collections.array;

    data.projects = data.projects.array;

    data.channels = data.channels.array;
    data.teams = data.teams.array;

    data.sub_image = data.sub_image.source;
    data.main_image = data.main_image.source;

    let collections, partners, projects;
    collections = []; partners = []; projects = [];

    data.collections = data.collections.filter(val => {
        if (Object.keys(val).length !== 0) return true
    });

    for(let i in data.collections) {
        let find = await Collection.get(data.collections[i]._id)
        if(find) collections.push({
            collection_id: find._id,
            name: find.name,
            name_kor: find.name_kor,
            image: find.sub_image
        })
    }

    data.partners = data.partners.filter(val => {
        if (Object.keys(val).length !== 0) return true
    });

    for(let i in data.partners) {
        let find = await Partner.get(data.partners[i]._id)
        if(find) partners.push({
            partner_id : find._id,
            name: find.name,
            division: find.division,
            source: find.source,
            image: find.image,
        })
    }

    data.projects = data.projects.filter(val => {
        if (Object.keys(val).length !== 0) return true
    });

    for(let i in data.projects) {
        let find = await Project.get(data.projects[i]._id)
        if(find) projects.push({
            project_id : find._id,
            name: find.name,
        })
    }

    data.collections = collections
    data.partners = partners
    data.projects = projects

    // image source 삭제
    delete data.label;

    if(!data.id) {
        delete data.id
        const newCollection = new Collection({
            ...data
        })
    
        newCollection.save()
            .then(saved => res.json(saved))
            .catch(e => next(e));
    } else {
        let _id = data.id
        delete data.id

        await Collection.findByIdAndUpdate({
            _id: _id
        }, {
            ...data
        })

        res.status(200).send('success')
    }
}

function update(req, res, next) {
    
}

function remove(req, res, next) {
    
}

module.exports = { load, get, search, create, update, remove }