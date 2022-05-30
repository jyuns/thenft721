module.exports = {

    check(code) {
        return this.findOne({
            code: code,
            used: false,
        }).lean()
          .exec()
    },

    used: (code) => {
        return this.findOneAndUpdate({
            code: code
        }, {
            $set: {
                used: true
            }
        }).lean()
          .exec()
    },
}