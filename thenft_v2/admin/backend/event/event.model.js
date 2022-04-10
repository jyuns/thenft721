const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
    start_date: Date,
    end_date: Date,

    type: String,
    source: String,

    collection_id: String,
    name: String,
    name_kor: String,
    image: String,
    project_name: String,

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})