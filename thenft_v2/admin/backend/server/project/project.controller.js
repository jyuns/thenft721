const Project = require('./project.model');
const Collection = require('../collection/collection.model');
const Partner = require('../partner/partner.model');

function load(req, res, next) {
    Project.load()
        .then((project) => {
            return res.status(200).json(project)
        })
        .catch(err => next(err))
}

function get(req, res, next) {
    Project.get(req.params.id)
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

async function create(req, res, next) {
    let data = req.body;

    delete data.label
    data.name = data.name.value;

    if(!data.id) {
        delete data.id
        const newProject = new Project({
            ...data
        })
    
        newProject.save()
            .then(saved => res.json(saved))
            .catch(e => next(e));
    } else {
        let _id = data.id
        delete data.id

        await Project.findByIdAndUpdate({
            _id: _id
        }, {
            ...data
        })

        res.status(200).send('success')
    }

}

function remove(req, res, next) {

}

async function bulk(req, res, next) {

    let data = req.body;
    let collections = [];
    let partners = [];

    data.collections = data.collections.array
    data.partners = data.partners.array
    data.projects = data.projects.array

    if(data.collections.length) {
        data.collections = data.collections.filter(val => {
            if (Object.keys(val).length !== 0) return true
        });
    }

    for(let i in data.collections) {
        let find = await Collection.get(data.collections[i]._id)
        if(find) collections.push({
            collection_id: find._id,
            name: find.name,
            name_kor: find.name_kor,
            sub_image: find.sub_image
        })
    }

    if(data.partners.length) {
        data.partners = data.partners.filter(val => {
            if (Object.keys(val).length !== 0) return true
        });
    }

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

    if(data.projects.length) {
        data.projects = data.projects.filter(val => {
            if (Object.keys(val).length !== 0) return true
        });
    } else {
        return res.status(200)
    }

    let project_id = data.projects[0]._id

    // update collections 
    for(let i in collections) {
        await Collection.updateMany({
            projects: {
                '$elemMatch' : {
                    'project_id': project_id
                }
            }
        }, {
            '$addToSet' : {
                'collections' : collections[i]
            }
        }).lean().exec()
    }

    // update partners 
    for(let i in partners) {
        await Collection.updateMany({
            projects: {
                '$elemMatch' : {
                    'project_id': project_id
                }
            }
        }, {
            '$addToSet' : {
                'partners' : partners[i]
            }
        }).lean().exec()
    }

    

}

module.exports = { load, get, search, create, remove, bulk}
