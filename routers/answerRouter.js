const express = require('express');
const router = express.Router();
const answerController = require('../controlers/answerController.js');

router.post('/writeAnswer', answerController.writeAnswer);
router.get('/getAnswer', answerController.getAnswer);

module.exports = router;