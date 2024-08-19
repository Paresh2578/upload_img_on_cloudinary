const multer = require("multer");
const path = require("path");
const fs = require('fs');

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" +file.originalname);
    },
});


const singleUpload = multer({ storage: storage });

module.exports = singleUpload;