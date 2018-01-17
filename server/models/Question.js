const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const questionSchema = new Schema({
    questionText: String,
    upvotes: Number,
    createdOn: Date
});

questionSchema.pre('save', (next) => {
    if (this.isNew) {
        this.createdOn = Date.now();
    }

    next();
});

exports.QuestionSchema = questionSchema;
exports.Question = mongoose.model("Question", questionSchema);