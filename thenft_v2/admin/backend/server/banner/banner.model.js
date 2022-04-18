const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
    title: String,
    sub_title: String,

    url: String,    
    source: String,

    created_at: { type: Date, default: new Date(Date.now() + 32400000)},
    updated_at: { type: Date, default: new Date(Date.now() + 32400000)},
})