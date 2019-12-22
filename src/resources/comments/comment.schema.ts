import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    joke: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Joke',
    },
    createdAt : {
        type: Date,
        required: true,
        default: Date.now,
    },
});
