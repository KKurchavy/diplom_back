import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Settings } from '../interfaces/settings.interface';

@Injectable()
export class SettingsService {
  constructor(@InjectModel('Settings') private readonly settingsModel: Model<Settings>) {}

  async create(settings: Settings): Promise<Settings> {
    const createdSettings = new this.settingsModel(settings);
    return await createdSettings.save();
  }

  async find(): Promise<Settings[]> {
    return await this.settingsModel.find().exec();
  }

  async update(settings: Settings, settingsId: string): Promise<Settings> {
    return await this.settingsModel.findByIdAndUpdate(settingsId, settings);
  }
}
