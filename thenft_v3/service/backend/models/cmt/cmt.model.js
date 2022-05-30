const mongoose = require('mongoose');
const { Schema } = mongoose;
const { kst } = require('../../helpers');

//? schema setting
const schema = new Schema({
    nft_id: String,
    user_id: String,

    content: String,

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
});

//? index setting
schema.index({'nft_id': 1});

//? statics setting
schema.statics = require('./cmt.static');

module.exports = mongoose.model('Cmt', schema);