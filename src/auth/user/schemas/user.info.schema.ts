import { Schema } from 'mongoose';
import { DECTIONARY_MODEL, TEST_MODEL } from '../../../constants';

export const UserInfoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  dictionaries: [{
    type: Schema.Types.ObjectId,
    ref: DECTIONARY_MODEL,
  }],
  tests: [{
    type: Schema.Types.ObjectId,
    ref: TEST_MODEL,
  }],
  updated: String,
  learnedWords: {
    type: Number,
    default: 0,
  },
  avatarUrl: String,
  firstName: String,
  lastName: String,
  group: Number,
});
