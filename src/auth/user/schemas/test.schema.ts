import { Schema } from 'mongoose';
import { WORD_MODEL } from '../../../constants';

export const TestSchema = new Schema({
  date: Date,
  timeSpent: Number,
  correctWords: [{
    type: Schema.Types.ObjectId,
    ref: WORD_MODEL,
  }],
  incorrectWords: [{
    type: Schema.Types.ObjectId,
    ref: WORD_MODEL,
  }],
  result: Number,
});
