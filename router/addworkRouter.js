const express = require('express');
const addworkController = require('../controller/addworkController');
const verifyToken = require('../middleware/VerifyToken');
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

// Initialize multer with storage settings
const upload = multer({ storage });

// Route to add a new work with multiple images
router.post('/addwork/:userId', verifyToken, upload.array('work', 5), addworkController.workadding);

// Route to delete an entire work
router.delete('/deletework/:workId', verifyToken, addworkController.deletework);

// New route to add images to an existing work
router.post('/addimage/:workId', verifyToken, upload.array('images', 5), addworkController.addImageToWork);

// New route to delete a specific image from a work
router.delete('/deleteimage/:workId/:imageName', verifyToken, addworkController.deleteImageFromWork);

module.exports = router;