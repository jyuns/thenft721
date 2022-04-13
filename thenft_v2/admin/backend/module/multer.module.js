const multer = require('multer');
const multerS3 = require('multer-s3');

const aws = require('aws-sdk');

const { s3 } = require('../config');

const storage = new aws.S3({
    accessKeyId: s3.accessKeyId,
    secretAccessKey: s3.secretAccessKey,
    region: s3.region,
})

const upload = multer({
    storage: multerS3({
        s3: storage,
        acl: 'public-read',
        bucket: (req, file, cb) => {
            cb(null, `${storage.bucket}/${req.query.label}`)
        },
        key: (req, file, cb) => {
            cb(null, `${req.query.name}.${file.mimetype.split('/').pop()}`)
        },
    })
})

module.exports = upload