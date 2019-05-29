import { Document } from 'mongoose';

export interface Word extends Document {
    word: string;
    translation: string;
}