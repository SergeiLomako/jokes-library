import { Document } from 'mongoose';

export interface Comment extends Document {
    readonly _id?: string;
    readonly comment: string;
    readonly user: string;
    readonly joke: string;
}
