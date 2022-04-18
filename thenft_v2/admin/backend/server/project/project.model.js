const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: String,

    created_at: { type: Date, default: new Date(Date.now() + 32400000)},
    updated_at: { type: Date, default: new Date(Date.now() + 32400000)},
})

projectSchema.statics = {
    load() {
        return this.find({}, {
            _id:1,
            name:1,
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

    search(value) {
        return this.find({
            $text: {
                $search: value
            }
        }, {
            _id: 1,
            name: 1,
        })
        .limit(5)
        .lean()
        .exec()
    }
}

module.exports = mongoose.model('Project', projectSchema)
