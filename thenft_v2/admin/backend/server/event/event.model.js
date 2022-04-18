const mongoose = require('mongoose');
const { Schema } = mongoose;


const eventSchema = new Schema({
    start_date: Date,
    end_date: Date,

    division: String,
    source: String,

    collection_id: String,
    name: String,
    name_kor: String,
    image: String,

    created_at: { type: Date, default: new Date( new Date().getTime()+32400000) },
    updated_at: { type: Date, default: new Date( new Date().getTime()+32400000) },
})

eventSchema.statics = {
    load() {
        return this.find({}, {
            _id:1,
            name:1,
            start_date:1,
            end_date:1,
            division:1,
            created_at:1,
            updated_at:1,
        })
        .lean()
        .exec()
    },

    get(id) {
        return this.findById(id)
            .lean()
            .exec()
    },
}

module.exports = mongoose.model('Event', eventSchema)
