const express = require('express');
const router = express.Router();
const answerController = require('../controlers/answerController.js');

router.post('/writeAnswer', answerController.writeAnswer);
router.get('/getAllAnswer', answerController.getAllAnswer);
router.get('/getAnswerUser', answerController.getAnswerUser);

module.exports = router;