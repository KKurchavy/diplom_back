import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Word } from './interfaces/word.interface';
import { WORD_MODEL } from '../constants';
import { isArray } from 'util';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(WORD_MODEL) private readonly wordModel: Model<Word>,
  ) {}

  async create(word: Word | Word[]): Promise<Word | Word[]> {
    if (isArray(word)) {
      return await this.wordModel.create(word);
    }

    const createdWord = new this.wordModel(word);
    return await createdWord.save();
  }

  async find(): Promise<Word[]> {
    return await this.wordModel.find().exec();
  }

  async update(word: Word, wordId: string): Promise<Word> {
    return await this.wordModel.findByIdAndUpdate(wordId, word);
  }

  async delete(wordId: string): Promise<Word> {
    return await this.wordModel.findByIdAndDelete(wordId);
  }
}
