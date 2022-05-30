// user active type 포함해야함

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

    nickname: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },


    membership: {
        role: {
            type: String,
            default: '느프터',
        },

        code: {
            type: String,
            default: null,
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },

    optional: {
        newsletter: {
            type: Boolean,
            default: false,
        },
        privacy: {
            type: Boolean,
            default: true,
        },
        termsOfService: {
            type: Boolean,
            default: true,
        },
    },

    active: {
        type: Boolean,
        default: true,
    },
    
}, {
    versionKey: false,
})

//? statics setting
schema.statics = require('./user.static');

module.exports = mongoose.model('User', schema)