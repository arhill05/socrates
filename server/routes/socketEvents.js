const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Session = require('../models/Session');
const {
    Question
} = require('../models/Question');

module.exports = (io) => {
    io.on('connection', (client) => {
        console.log('Client connected...');

        client.on('join session', async(sessionId) => {
            client.join(sessionId);
            io.sockets.in(sessionId).emit('user joined');

            const questions = (await Question.find({
                sessionId
            })).sort((a, b) => {
                return b.upvotes - a.upvotes
            })

            client.emit('questionsUpdated', questions);
        });

        client.on('updateQuestion', async(question) => {
            await Question.updateOne({
                _id: question._id
            }, question);

            const questions = (await Question.find({
                sessionId: question.sessionId
            })).sort((a, b) => {
                return b.upvotes - a.upvotes
            })

            io.sockets.in(question.sessionId).emit('questionsUpdated', questions);
        })

        client.on('createQuestion', async(question) => {
            await new Question(question).save();

            const questions = (await Question.find({
                sessionId: question.sessionId
            })).sort((a, b) => {
                return b.upvotes - a.upvotes
            });

            io.sockets.in(question.sessionId).emit('questionsUpdated', questions);
        })

        client.on('removeQuestion', async(question) => {
            await Question.remove({
                _id: question._id
            });

            const questions = (await Question.find({
                sessionId: question.sessionId
            })).sort((a, b) => {
                return b.upvotes - a.upvotes
            });

            io.sockets.in(question.sessionId).emit('questionsUpdated', questions);
        })

        client.on('clearQuestions', async(sessionId) => {
            await Question.remove({
                sessionId
            });

            const questions = (await Question.find({
                sessionId
            })).sort((a, b) => {
                return b.upvotes - a.upvotes
            });

            io.sockets.in(sessionId).emit('questionsUpdated', questions);
        })
    });
}