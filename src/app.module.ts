import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { DB_URL } from "../data/config.json";
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { WordsModule } from './words/words.module';
import { DectionariesModule } from './dectionaries/dectionaries.module';
import { ControlTestModule } from './control-test/control-test.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(DB_URL), SettingsModule, WordsModule, DectionariesModule, ControlTestModule],
})
export class AppModule {}
