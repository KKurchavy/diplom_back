import { Document } from 'mongoose';

export interface User extends Document {
  readonly name: string;
  readonly password: string;
  readonly info: UserInfo;
}

export interface UserInfo extends Document {
  readonly name: string;
  readonly role: string;
  readonly tests: any[];
  readonly group: number;
  readonly lastName: string;
  readonly firstName: string;
  readonly dictionaries: any[];
  readonly learnedWords: number;
}
