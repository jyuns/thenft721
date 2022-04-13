const mongoose = require('mongoose');
const { Schema } = mongoose;

const partnerSchema = new Schema({

    name: String,
    image: String,

    type: String,
    source: String,
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})

partnerSchema.statics = {
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

module.exports = mongoose.model('Partner', partnerSchema)
