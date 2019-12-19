import { Document } from 'mongoose';

export interface Joke extends Document {
    readonly _id?: string;
    readonly joke: string;
}
