import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DECTIONARY_MODEL } from '../constants';
import { Dectionary } from './interfaces/dectionary.interface';
import { DectionaryDto } from './interfaces/dectionary.dto';

@Injectable()
export class DectionariesService {
  constructor(@InjectModel(DECTIONARY_MODEL) private readonly model: Model<Dectionary>) {}

  public async createDectionary(dectionary: DectionaryDto): Promise<Dectionary> {
    return await this.model.create(dectionary);
  }

  public async getAll(): Promise<Dectionary[]> {
    return await this.model.find().populate('words');
  }

  public async getById(id: string): Promise<Dectionary> {
    return await this.model.findById(id).populate('words');
  }

  public async updateDectionary(id: string, updateData: any): Promise<Dectionary> {
    return await this.model.findByIdAndUpdate(id, updateData);
  }

  public async deleteOne(id: string): Promise<any> {
    return await this.model.findByIdAndDelete(id);
  }
}
