var express = require('express');
var router = express.Router();
const studentController =require('../controllers/student.controllers');
/* GET home page. */
router.get('/',studentController.getAll);
router.post('/new',studentController.createUser);
module.exports = router;
