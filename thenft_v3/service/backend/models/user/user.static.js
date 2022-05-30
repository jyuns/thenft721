module.exports = {
    duplicate: (object) => {
        return this.findOne(object)
                   .lean()
                   .exec()
    },
}