const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
    name: String,
    name_kor: String,
    image: String,
    ranking: Number,
    collection_id: String,
})