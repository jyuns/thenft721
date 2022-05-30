const mongoose = require('mongoose');
const { Schema } = mongoose;
const { kst } = require('../../helpers');

const schema = new Schema({
    code: String,

    used: Boolean,

    created_at: { 
        type: Date, 
        default: kst()
    },

    updated_at: { 
        type: Date, 
        default: kst()
    },
    
}, {
    versionKey: false,
})

//? statics setting
schema.statics = require('./code.static');

module.exports = mongoose.model('Code', schema);