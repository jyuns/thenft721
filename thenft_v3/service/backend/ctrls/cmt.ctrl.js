const Cmt = require('../models/cmt/cmt.model');
const { emptyCheck, maxLengthCheck, minLengthCheck, kst } = require('../helpers');

// create
//! user, nft check 선행 필요함.
async function create(req, res) {

    let valid = true;
    let data = {};

    data.content = req?.body?.content
    valid = emptyCheck(data?.content)
    valid = minLengthCheck(data?.content, 1)
    if(!valid) throw new Error;

    if(maxLengthCheck(data.content)) {
        let temp_content = data.content
        temp_content = temp_content.slice(0, 500)
        data.content = temp_content
    }

    let cmt = new Cmt({...data});

    await cmt.save()
             .catch(() => { throw new Error })

    res.status(200).send('success')
}

// read
async function read(req, res) {
    let valid = true;
    let data = {};

    data.nft_id = req?.body?.nft_id;
    valid = emptyCheck(data?.nft_id);
    if(!valid) throw new Error

    data.cursor = req?.body?.cursor;
    valid = emptyCheck(data?.cursor);

    if(!valid) {
        await Cmt.load()
            .then((docs) => {
                return res.status(200).json(docs)
            })
            .catch(() => {
                throw new Error
            })
            
    } else {
        await Cmt.next(data.cursor)
            .then((docs) => {
                return res.status(200).json(docs)
            })
            .catch(() => {
                throw new Error
            })
    }
}

// update
async function update(req, res) {

    let valid = true;
    let data = {};

    data._id = req?.body?._id;
    valid = emptyCheck(data?._id);
    if(!valid) throw new Error

    data.content = req?.body?.content;
    valid = emptyCheck(data?.content);
    if(!valid) throw new Error

    data.updated_at = await kst();

    await Cmt.findByIdAndUpdate({ _id: data._id }, { ...data })
                          .catch(() => { 
                            throw new Error } )

    res.status(200).send('success')
}

// delete
async function remove(req, res) {

    let valid = true;
    let data = {};
    
    data._id = req?.body?._id;
    valid = emptyCheck(data?._id);
    if(!valid) throw new Error
    
    await Cmt.findByIdAndDelete({ _id: data._id })
                          .catch( () => { throw new Error } )
    
    res.status(200).send('success')
}

module.exports = { create, read, update, remove }