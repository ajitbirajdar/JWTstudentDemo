var express = require('express');
var router = express.Router();
let loginAuthController = require('../controllers/login.controllers');
/* GET home page. */
router.post('/login',loginAuthController.loginAuth );

module.exports = router;