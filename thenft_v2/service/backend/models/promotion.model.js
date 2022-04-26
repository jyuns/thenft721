const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    code: String,
    used: Boolean
})

schema.statics = {
    available(code) {
        return this.findOne({
            code: code,
            used: false,
        })
            .lean()
            .exec()
    },

    used(code) {
        return this.findOneAndUpdate({
            code: code
        }, {
            $set: {
                used: true
            }
        })
        .lean()
        .exec()
    }
}

module.exports = mongoose.model('Promotion', schema)