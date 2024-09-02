const express = require ('express');
const addworkController = require('../controller/addworkController')
const verifyToken = require ('../middleware/VerifyToken');

const router = express.Router();

router.post('/addwork/:userId',verifyToken,addworkController.workadding)


module.exports = router;