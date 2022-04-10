const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({

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

    //? 원화, 변화량 기준 확인 필요함
    trackings: {
        _id: false,
        twitter_power: Number,
        discord_power: Number,
    
        klaytn_price: Number,
        eth_price: Number,
        
        floor_price_klay: Number,
        total_volume_klay: Number,
        average_price_klay: Number,
    
        floor_price_klay_eth: Number,
        total_volume_eth: Number,
        average_price_eth: Number,
    
        one_day_change: Number,
        seven_day_change: Number,        
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