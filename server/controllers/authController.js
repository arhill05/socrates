const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/User');

exports.login = async(req, res, next) => {
    const userResponse = {
        id: req.user._id,
        ownedSessions: req.user.ownedSessions,
        username: req.user.username
    };
    res.json(userResponse);
}

exports.createAccount = async(req, res, next) => {
    const user = await User.register(new User({
        username: req.body.createUsername
    }), req.body.createPassword, (err, user, info) => {
        if (err) {
            return next(err);
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            const userResponse = {
                id: user._id,
                ownedSessions: user.ownedSessions,
                username: user.username
            };
            return res.json(userResponse);
        });
    });
}