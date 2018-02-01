const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { QuestionSchema } = require('./Question');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
mongoose.Promise = global.Promise;

const sessionSchema = new Schema({
    id: {
        type: String,
        lowercase: true,
        trim: true,
        minlength: [4, 'Id must be no less than 4 characters'],
        maxlength: [12, 'Id must be no more than 12 characters'],
        required: [true, 'A session ID is required']
    },
    description: String,
    title: String,
    questions: [QuestionSchema],
    ownerUid: String,
    createdOn: Date
});

sessionSchema.pre('save', (next) => {
    if (this.isNew) {
        this.createdOn = Date.now();
    }

    next();
});

module.exports = mongoose.model("Session", sessionSchema);