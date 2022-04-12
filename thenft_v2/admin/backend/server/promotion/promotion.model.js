const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
    code: String,
    used: Boolean
})