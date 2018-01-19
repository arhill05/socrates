const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Session = require('../models/Session');

module.exports = (io) => {
    io.on('connection', (client) => {
        console.log('Client connected...');

        client.on('join session', async(sessionId) => {
            client.join(sessionId);
            io.sockets.in(sessionId).emit('user joined');
            const session = await Session.findOne({
                id: sessionId
            });

            const sortedQuestions = session.questions.sort((a, b) => {
                return b.upvotes - a.upvotes
            })
            client.emit('questionUpdated', sortedQuestions);
        });

        client.on('updateQuestion', async(req) => {
            await Session.updateOne({
                'questions._id': req.question._id
            }, {
                'questions.$.upvotes': req.question.upvotes
            });

            const session = await Session.findOne({
                id: req.sessionId
            })

            const sortedQuestions = session.questions.sort((a, b) => {
                return b.upvotes - a.upvotes
            })

            io.sockets.in(req.sessionId).emit('questionUpdated', sortedQuestions);

        })
    });
}