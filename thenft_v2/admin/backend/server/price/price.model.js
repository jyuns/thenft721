const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
    collection_id: String,

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

    floor_price_klay_eth: Number, //참고용
    total_volume_eth: Number, //참고용
    average_price_eth: Number //참고용
})
