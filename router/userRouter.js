const { userRegister,userLogin, getAllUsers, getUserById} = require('../controller/userController')
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


router.post('/register', upload.single('image'),userRegister);
router.post('/Login',userLogin);

router.get('/all-users',getAllUsers);
router.get('/single-user/:id',getUserById);

module.exports = router;