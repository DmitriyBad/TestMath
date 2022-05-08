const express = require('express');
const router = express.Router();
const controller = require('../controlers/userControler.js');

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.post('/loginRecovery', controller.loginRecovery);
router.get('/getuser', controller.getuser);
//router.post('registration', controller.registration);



module.exports = router;