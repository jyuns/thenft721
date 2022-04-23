const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    nickname: String,

    role: String,

    password: {
        type: String,
        required: true,
        trim: true,
    },

    newsletter: Boolean,
    code: String,

})

schema.statics = {
    duplicate(object) {
        return this.findOne(object)
            .lean()
            .exec()
            .length
    }
}

module.exports = mongoose.model('User', schema)