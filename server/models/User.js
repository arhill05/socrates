const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: String,
    password: String,
    ownedSessions: [String]
});

UserSchema.plugin(passportLocalMongoose, {usernameField: 'username'});

module.exports = mongoose.model('User', UserSchema);
