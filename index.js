const express = require('express');
const app = express();
const fildUpload = require('express-fileupload');

require('dotenv').config();

const PORT = process.env.PORT || 8000;

// processing request bodies
app.use(express.json());
// uploading file 
app.use(fildUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
// cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// cloudinary connection
const {cloudinaryConnect }= require('./config/Cloudinary');
cloudinaryConnect();
// connection db
const dbConnect = require('./config/Database');
dbConnect();

// getting routes
const fileUploading = require('./routes/FileUploader');
// mounting routes
app.use('/api/v1', fileUploading);
// starting server and listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
