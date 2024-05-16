
// importing models
const File= require('../models/FileUploader');
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
// Function to check if file type is supported
function checkSupportedFileType(fileName, supportedFiles){
    const extension = fileName.split('.').pop().toLowerCase();
    return supportedFiles.includes(extension);
}

// Function to upload file to Cloudinary
async function uploadFileCloudinary(filePath, folder) {
    const options = { folder };
    return await cloudinary.uploader.upload(filePath, options);
}

exports.fileUploadCloudinay = async (req, res) => {
    try {
        // const {name, profile} = req.body;
        const imageFile = req.files.imageFile;
        console.log('file data', imageFile);

        const supportedFiles = ['png', 'jpg', 'jpeg'];

        const fileName = imageFile.name;
        if (!checkSupportedFileType(fileName, supportedFiles)) {
            return res.status(400).json({
                success: false,
                message: 'File type is not supported',
            });
        }

        const uploadPath = __dirname + '/uploads/' + Date.now() + `.${fileName.split('.').pop()}`;
        console.log('upload path', uploadPath);

        // Move the uploaded file to the desired path
        await imageFile.mv(uploadPath);

        // Upload the file to Cloudinary
        const result = await uploadFileCloudinary(uploadPath, 'testing');
        console.log('Cloudinary upload result', result);

        const storeToDb = await File.create({
            name: 'test',
            fileUrl: result.secure_url,
            tags: 'test',
            email: 'testing email',
        });

        return res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
            data: storeToDb,
        });
        
    } catch (error) {
        console.error('Error while uploading file:', error);
        return res.status(500).json({
            success: false,
            message: 'Error while uploading file',
            data: error.message,
        });
    }
}