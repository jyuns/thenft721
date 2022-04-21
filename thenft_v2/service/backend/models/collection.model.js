const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    ranking: Number,

    name: String,
    name_kor: String,

    email: String,
    description: String,

    network: String,
    status: String,

    //! 모두 반영 필요
    page_str: String,

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
        klaytn_price: { type: Number, default: 0 },
        eth_price: { type: Number, default: 0 },
    
        total_volume_klay: { type: Number, default: 0 },
        chg_total_volume_klay: { type: Number, default: 0 },
    
        floor_price_klay: { type: Number, default: 0 },
        chg_floor_price_klay: { type: Number, default: 0 },
    
        one_day_average_price_klay: { type: Number, default: 0 },
        chg_one_day_average_price_klay: { type: Number, default: 0 },

        one_day_volume_klay: { type: Number, default: 0 },
        chg_one_day_volume_klay: { type: Number, default: 0 },

        one_day_sales: { type: Number, default: 0 },

        num_owners: { type: Number, default: 0 },
        chg_num_owners: { type: Number, default: 0 },
    
        total_supply: { type: Number, default: 0 },
    },

    media: {
        _id: false,

        twitter_power: { type: Number, default: 0 },
        chg_twitter_power: { type: Number, default: 0 },
        twitter_power_chart: [Number], //aggregate 7 days
        
        discord_power: { type: Number, default: 0 },
        chg_discord_power: { type: Number, default: 0 },
        discord_power_chart: [Number], //aggregate 7 days
    },

    channels: [
        {   
            _id: false,
            division: String,
            source: String,
        },
        
    ],

    projects: [
        {
            _id: false,
            project_id: String,
            name: String
        }
    ],

    collections: [
        {
            _id: false,
            collection_id: String,
            name: String,
            name_kor: String,
            sub_image: String,
        }
    ],

    partners: [
        {
            _id: false,
            partner_id: String,
            name: String,
            image: String,
            division: String,
            source: String,
        }
    ],

    created_at: { type: Date, default: new Date(Date.now() + 32400000)},
    updated_at: { type: Date, default: new Date(Date.now() + 32400000)},
})

schema.statics = {
    load() {
        console.log('load ctrl')
    }
}

module.exports = mongoose.model('Collection', schema)