const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({

    name: String,
    name_kor: String,
    image: String,
    page_str: String,
    ranking: Number,
    collection_id: String,

})

schema.index({name: 'text', name_kor: 'text'}, {'default_language':'ngram'})

schema.statics = {
    //! sort 추가
    load(keyword) {
        return this.find({
            $text: {
                $search: keyword
            }
        })
        .limit(5)
        .lean()
        .exec()
    },
}

module.exports = mongoose.model('Search', schema)