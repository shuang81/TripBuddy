const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/question.controller')
const authUtils = require('../utils/auth.js')

router.delete('/deleteById/:id', authUtils.isAuthenticated, QuestionController.deleteQuestion)
router.post('/addQuestion', authUtils.isAuthenticated, QuestionController.addQuestion)//API to create new question and answer
router.put('/editById/:id', authUtils.isAuthenticated, QuestionController.editQuestion)//API to edit question by id
router.get('/getQuestions', QuestionController.getAllQuestions)//API to get all questions

module.exports = router;