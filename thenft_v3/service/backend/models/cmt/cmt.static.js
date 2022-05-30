module.exports = {
    load: (nft_id) => {
        return this.find({
            nft_id: nft_id
        }).limit(10)
          .lean()
          .exec()
    },

    next: (nft_id, cursor) => {
        return this.find({
            _id: {$gt: cursor},
            nft_id: nft_id
        }).limit(10)
          .lean()
          .exec()
    },

    count: (nft_id) => {
        return this.countDocuments({
            nft_id: nft_id
        }).lean()
          .exec()
    }
}