const express = require('express');
const router = express.Router();
const {fileUploader} = require('../controllers/FileUploader');

router.post('/fileUploader', fileUploader);
module.exports = router;