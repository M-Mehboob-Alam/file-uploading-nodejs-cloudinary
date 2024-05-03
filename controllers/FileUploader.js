
// importing models
// const {File} = require('../models/File');
const cloudinary = require('cloudinary').v2;

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

exports.fileUploadCloudinay = async (req, res) => {
    try {
        const imageFile = req.files.imageFile;
        console.log('file data', imageFile);

        let path = __dirname + '/uploads/' + Date.now() + `.${imageFile.name.split('.')[1]}`;
        console.log('path', path);

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          };

          imageFile.mv(path, (error)=>{
            console.log(error);
          });
          try {
            // Upload the image
            const result = await cloudinary.uploader.upload(path, options);
            console.log(result);
            // return result.public_id;
          } catch (error) {
            console.error(error);
          }

        return res.status(200).json({
            success:true,
            message:'file uploading successfully',
            // data:imageFile
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            data:error
        })
    }
}