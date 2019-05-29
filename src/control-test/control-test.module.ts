import { Module } from '@nestjs/common';
import { ControlTestService } from './control-test.service';
import { ControlTestController } from './controllers/control-test/control-test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CONTROL_TEST_MODEL } from 'src/constants';
import { ControlTestSchema } from './schemas/control-test.schema';

@Module({
  providers: [ControlTestService],
  imports: [
    MongooseModule.forFeature([{
      name: CONTROL_TEST_MODEL,
      schema: ControlTestSchema,
    }]),
  ],
  controllers: [ControlTestController],
})
export class ControlTestModule {}
