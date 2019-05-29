import { ObjectId } from 'bson';

export interface TestDto {
  date: Date;
  correctWords: ObjectId[];
  incorrectWords: ObjectId[];
}
