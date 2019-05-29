import { Module } from '@nestjs/common';
import { DectionariesService } from './dectionaries.service';
import { DectionariesController } from './controllers/dectionaries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DECTIONARY_MODEL } from '../constants';
import { DectionarySchema } from './schemas/dectionary.schema';

@Module({
  providers: [DectionariesService],
  imports: [
    MongooseModule.forFeature([{
      name: DECTIONARY_MODEL,
      schema: DectionarySchema,
    }]),
  ],
  controllers: [DectionariesController],
})
export class DectionariesModule {}
