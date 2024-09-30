const userController = require ('../controller/userController')
const express = require ('express');
const multer = require ('multer');
const path = require ('path');
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


router.post('/register', upload.single('image'),userController.userRegister);
router.post('/Login',userController.userLogin);

router.get('/all-users',userController.getAllUsers);
router.get('/single-user/:id',userController.getUserById);

module.exports = router;