const mongoose = require('mongoose');
const {
    Question
} = require('../models/Question');

exports.getQuestions = async(req, res, next) => {
    try {
        const questions = await Question.find();
        return res.json(questions);
    } catch (err) {
        next(err);
    }
}

exports.getQuestionById = async(req, res, next) => {
    try {
        const session = await Session.findOne({
            id: req.params.id
        });
        return res.json(session.questions);
    } catch (err) {
        next(err);
    }
}

exports.createQuestion = async(req, res, next) => {
    const question = await new Question(req.body).save();
    res.status(200).send();
}