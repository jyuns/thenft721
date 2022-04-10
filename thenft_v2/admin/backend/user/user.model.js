const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
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