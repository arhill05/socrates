const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const sessionController = require('../controllers/sessionController');
const questionController = require('../controllers/questionController');
const authController = require('../controllers/authController');

router.get('/sessions', sessionController.getSessions);
router.get('/sessions/:id', sessionController.getSessionById);
router.get('/sessions/:id/meta', sessionController.getSessionMetaById);
router.post('/sessions', sessionController.createSession);

router.get('/questions', questionController.getQuestions);
router.get('/questions/:id', questionController.getQuestionById);
router.post('/questions', questionController.createQuestion);

router.post('/login', passport.authenticate('local'), authController.login);
router.post('/createAccount', authController.createAccount)

module.exports = router;