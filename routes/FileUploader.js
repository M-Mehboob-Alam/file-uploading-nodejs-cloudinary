const express = require('express');
const router = express.Router();
const {fileUploader} = require('../controllers/FileUploader');
const {fileUploadCloudinay} = require('../controllers/FileUploader');

router.post('/fileUploader', fileUploader);
router.post('/file/Upload/Cloudinay', fileUploadCloudinay);
module.exports = router;