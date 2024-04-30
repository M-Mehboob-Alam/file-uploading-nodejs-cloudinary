
// importing models
// const {File} = require('../models/File');

exports.fileUploader = async (req, res) => {
    try {
        const file = req.files.file;
        console.log('file', file);
        // creating path 
        let path = __dirname + '/uploads/' + Date.now() + `.${file.name.split('.')[1]}`;
        // uploading with mv
        file.mv(path, (error)=>{
            console.log(error);
        });
        console.log('file path --->', path);
        return res.status(200).json({
            success:true,
            message : 'file uploaded successfully',
            data : path
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message : error.message,
            data : error.message,

        })
    }
}