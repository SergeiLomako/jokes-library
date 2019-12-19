import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export const JokeSchema = new mongoose.Schema({
    joke: {
        type: String,
        index: true,
    },
});

JokeSchema.plugin(mongoosePaginate);

export default JokeSchema;
