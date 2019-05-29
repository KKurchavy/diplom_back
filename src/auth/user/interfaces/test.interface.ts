import { Document } from 'mongoose';
import { ObjectId } from 'bson';

export interface ITest extends Document {
  readonly date: Date;
  readonly timeSpent: number;
  readonly correctWords: ObjectId[];
  readonly incorrectWords: ObjectId[];
}
