import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WORD_MODEL } from '../constants';
import { WordsController } from './controllers/words/words.controller';
import { WordSchema } from './schemas/word.schema';
import { WordService } from './word.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: WORD_MODEL, schema: WordSchema}])],
  controllers: [WordsController],
  providers: [WordService]
})
export class WordsModule {}
