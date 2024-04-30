const  cloudinary = require('cloudinary').v2 ;

require('dotenv').config();

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret
          });
        //   console.log('cloudinary connected');
    } catch (error) {
        console.log('error connecting to cloudinary');
    }
  
}

