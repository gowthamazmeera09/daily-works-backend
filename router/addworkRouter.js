const express = require ('express');
const addworkController = require('../controller/addworkController')
const verifyToken = require ('../middleware/VerifyToken');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/addwork/:userId',verifyToken,upload.single('work'),addworkController.workadding);
router.delete('/deletework/:workId',addworkController.deletework);


module.exports = router;