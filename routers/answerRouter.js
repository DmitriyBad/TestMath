const express = require('express');
const router = express.Router();
const answerController = require('../controlers/answerController.js');

router.post('/writeAnswer', answerController.writeAnswer);//видалити writeAnswer
router.get('/getAllAnswer', answerController.getAllAnswer);//обєднати
router.get('/getAnswerUser', answerController.getAnswerUser);//обєднати
router.get('/downloadFileAnswerUser', answerController.downloadFileAnswerUser);// переназвати

module.exports = router;