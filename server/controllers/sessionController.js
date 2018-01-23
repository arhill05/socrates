const mongoose = require('mongoose');
const Session = require('../models/Session');

exports.getSessions = async(req, res, next) => {
    try {
        const session = await Session.find().exec();
        return res.json(session);
    } catch (err) {
        next(err);
    }
}

exports.getSessionById = async(req, res, next) => {
    try {
        const session = await Session.findOne({
            id: req.params.id
        });
        return res.json(session);
    } catch (err) {
        next(err);
    }
}

exports.getManySessionsById = async(req, res, next) => {
    res.status(200).send();
}

exports.getSessionMetaById = async(req, res, next) => {
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
}

exports.createSession = async(req, res, next) => {
    try {
        const session = await new Session(req.body).save();
        res.send('Successfully created session');
    } catch (err) {
        next(err);
    }
}