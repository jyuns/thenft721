const mongoose = require('mongoose');
const { Schema } = mongoose;

const newsSchema = new Schema({
    title: String,
    source: String,
    collection_id: String,
    name: String,
    created_at: { type: Date, default: new Date(Date.now() + 32400000) },
    updated_at: { type: Date, default: new Date(Date.now() + 32400000) },
})


newsSchema.statics = {
    load() {
        return this.find()
        .lean()
        .exec()
    },

    get(id) {
        return this.findById(id)
            .lean()
            .exec()
    },
}

module.exports = mongoose.model('news', newsSchema)
