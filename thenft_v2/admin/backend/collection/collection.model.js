const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
    ranking: Number,

    name: String,
    name_kor: String,

    email: String,
    description: String,

    network: String,
    status: String,

    main_image: String,
    sub_image: String,

    teams: [
        {
            _id: false,
            name: String,
            position: String,
            verified: Boolean,
        }
    ],

    price: {
        _id: false,
        klaytn_price: Number, //원화 가격기준
        eth_price: Number, //원화 가격기준
    
        total_volume_klay: Number,
        chg_total_volume_klay: Number,
    
        floor_price_klay: Number,
        chg_floor_price_klay: Number,
    
        one_day_average_price_klay: Number,
        chg_one_day_average_price_klay: Number,
    
        one_day_volume_klay: Number,
        chg_one_day_volume_klay: Number,
    
        num_owners: Number,
        chg_num_owners: Number,
    
        total_supply: Number,
    },

    media: {
        _id: false,

        twitter_power: Number,
        chg_twitter_power: Number,
        twitter_power_chart: [Number], //aggregate 7 days
        
        discord_power: Number,
        chg_discord_power: Number,
        discord_power_chart: [Number], //aggregate 7 days
    },

    channels: [
        {
            _id: false,
            type: String,
            source: String,
        }
    ],

    project_id: String,
    project_name: String,

    collections: [
        {
            _id: false,
            collection_id: String,
            name: String,
            name_kor: String,
            image: String,
        }
    ],

    partners: [
        {
            _id: false,
            partner_id: String,
            name: String,
            image: String,
            type: String,
            source: String,
        }
    ],

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})