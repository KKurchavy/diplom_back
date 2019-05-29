import { Schema } from 'mongoose';
import { USER_INFO_MODEL, WORD_MODEL, TEST_MODEL } from 'src/constants';

export const ControlTestSchema = new Schema({
  executor: {
    type: Schema.Types.ObjectId,
    ref: USER_INFO_MODEL,
  },
  words: [{
    type: Schema.Types.ObjectId,
    ref: WORD_MODEL,
  }],
  result: {
    type: Schema.Types.ObjectId,
    ref: TEST_MODEL,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  dateCreated: Date,
});
