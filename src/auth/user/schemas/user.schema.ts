import { Schema } from 'mongoose';
import { USER_INFO_MODEL } from '../../../constants';

export const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  info: {
    type: Schema.Types.ObjectId,
    ref: USER_INFO_MODEL,
  },
});
