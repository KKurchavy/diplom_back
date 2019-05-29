import { Schema } from 'mongoose';
import { WORD_MODEL } from '../../constants';

export const DectionarySchema = new Schema({
    name: String,
    description: String,
    avatarUrl: String,
    words: [{
      type: Schema.Types.ObjectId,
      ref: WORD_MODEL,
    }],
    wordsCount: Number,
});
