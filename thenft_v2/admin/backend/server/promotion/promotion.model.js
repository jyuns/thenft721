const mongoose = require('mongoose');
const { Schema } = mongoose;

const promotionSchema = new Schema({
    code: String,
    used: Boolean
})

promotionSchema.statics = {
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

module.exports = mongoose.model('Promotion', promotionSchema)