import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SETTINGS_MODEL } from "../constants";
import { SettingsController } from './controllers/settings/settings.controller';
import { SettingsSchema } from './schemas/settings.schema';
import { SettingsService } from './services/settings.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: SETTINGS_MODEL, schema: SettingsSchema}])],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}
