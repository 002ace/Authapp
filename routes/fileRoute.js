const express  =  require('express');

const router  = express.Router();


const {fileUpload , image ,video}   =  require('../controllers/fileUpload');


router.post('/fileupload' , fileUpload);
router.post('/image' , image);
router.post('/video' , video)

module.exports =  router