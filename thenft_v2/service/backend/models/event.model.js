const mongoose = require('mongoose');
const { Schema } = mongoose;


const schema = new Schema({
    start_date: Date,
    end_date: Date,

    division: String,
    source: String,

    collection_id: String,
    name: String,
    name_kor: String,
    description: String,
    image: String,

    //! 모두 반영 필요
    page_str: String,

    created_at: { type: Date, default: new Date( new Date().getTime()+32400000) },
    updated_at: { type: Date, default: new Date( new Date().getTime()+32400000) },
})

schema.statics = {

    load(date) {
        return this.find({
            end_date: {$gte: date},
            start_date: {$lte: date},
        })
        .limit(20)
        .lean()
        .exec()
    },

    next(last_id, date) {
        return this.find({
            _id: {$gt: last_id},
            end_date: {$gte: date},
            start_date: {$lte: date},
        })
        .sort({
            start_date: 1
        })
        .limit(20)
        .lean()
        .exec()
    },

    total(date) {
        return this.countDocuments({
            end_date: {$gte: date},
            start_date: {$lte: date},
        })
        .lean()
        .exec()
    }
}

module.exports = mongoose.model('Event', schema)