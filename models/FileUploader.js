const mongoose = require('mongoose');

const fileUploader = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
    },
    tags:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }  
     
});

const File = mongoose.model('File', fileUploader);
module.exports = File;