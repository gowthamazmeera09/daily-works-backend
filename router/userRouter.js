const userController = require ('../controller/userController');
const express = require ('express');

const router = express.Router();

router.post('/register',userController.userRegister);
router.post('/Login',userController.userLogin);

router.get('/all-users',userController.getAllUsers);
router.get('/single-user/:id',userController.getUserById);

module.exports = router;