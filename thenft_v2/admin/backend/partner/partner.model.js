const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({

    name: String,
    name_kor: String,
    image: String,

    type: String,
    source: String,
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})