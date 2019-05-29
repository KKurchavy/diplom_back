import { Document } from 'mongoose';

export interface Dectionary extends Document {
  name: string;
  description: string;
  words: any[];
  avatarUrl: string;
  wordsCount: number;
}
