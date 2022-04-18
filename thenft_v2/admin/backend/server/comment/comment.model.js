const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
    collection_id: String,
    author: String,
    role: String,
    content: String,
    created_at: { type: Date, default: new Date(Date.now() + 32400000)},
    updated_at: { type: Date, default: new Date(Date.now() + 32400000)},
})