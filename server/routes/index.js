const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Session = require('../models/Session');
const {
  Question
} = require('../models/Question');


router.get('/sessions', async(req, res, next) => {
  try {
    const session = await Session.find().exec();
    return res.json(session);
  } catch (err) {
    next(err);
  }
});

router.get('/sessions/:id', async(req, res, next) => {
  try {
    const session = await Session.findOne({
      id: req.params.id
    });
    return res.json(session);
  } catch (err) {
    next(err);
  }
});

router.get('/sessions/:id/meta', async(req, res, next) => {
  try {
    const session = await Session.findOne({
      id: req.params.id
    });
    const response = {
      id: session.id,
      description: session.description,
      title: session.title,
      ownerUid: session.ownerUid
    };

    return res.json(response);
  } catch (err) {
    next(err)
  };
});

router.post('/sessions', async(req, res, next) => {
  try {
    const session = await new Session(req.body).save();
    res.send('Successfully created session');
  } catch (err) {
    next(err);
  }
})

router.get('/questions', async(req, res, next) => {
  try {
    const questions = await Question.find();
    return res.json(questions);
  } catch (err) {
    next(err);
  }
});

router.get('/questions/:id', async(req, res, next) => {
  try {
    const session = await Session.findOne({
      id: req.params.id
    });
    return res.json(session.questions);
  } catch (err) {
    next(err);
  }
})

router.post('/questions', async(req, res, next) => {
  const question = await new Question(req.body).save();
  res.send('Successfully created question');
})

module.exports = router;