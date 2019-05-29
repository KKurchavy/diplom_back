import { Schema } from 'mongoose';

export const WordSchema = new Schema({
    word: {
        type: String,
        unique: true,
    },
    translation: {
        type: String,
        unique: true,
    },
});
