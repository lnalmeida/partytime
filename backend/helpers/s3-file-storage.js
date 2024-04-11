const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

require("dotenv").config();

//S3 credentials
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region:  process.env.S3_REGION
});

//AWS-S3 storage config
const s3Storage = multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => cb(null, {fieldname: "photos"}),
    key: (req, file, cb) => cb(null, Date.now().toString()+".jpg")
});

module.exports = s3Storage;