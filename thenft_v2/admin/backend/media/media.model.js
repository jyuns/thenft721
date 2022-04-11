const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
    collection_id: String,

    twitter_power: Number,
    chg_twitter_power: Number,
    
    discord_power: Number,
    chg_discord_power: Number,
})
