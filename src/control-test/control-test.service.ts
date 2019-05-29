import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CONTROL_TEST_MODEL } from 'src/constants';
import { Model } from 'mongoose';
import { ControlTest, ControlTestDTO, UpdateControlTestDTO } from './interfaces/control-test.interfaces';

@Injectable()
export class ControlTestService {
  constructor(@InjectModel(CONTROL_TEST_MODEL) private readonly model: Model<ControlTest>) {}

  public async createControlTest(test: ControlTestDTO): Promise<ControlTest> {
    return await this.model.create({
      ...test,
      dateCreated: new Date(),
    });
  }

  public async updateControlTest(testId: string, test: UpdateControlTestDTO): Promise<ControlTest> {
    return await this.model.findByIdAndUpdate(testId, test);
  }

  public async findAllByUserId(userId: string): Promise<ControlTest[]> {
    return await this.model.find({ executor: userId })
      .populate('words');
  }

  public async findAll(): Promise<ControlTest[]> {
    return await this.model.find()
      .populate('executor');
  }

  public async getControlTestById(id: string): Promise<ControlTest> {
    return await this.model.findById(id)
      .populate('words')
      .populate('executor')
      .populate({ path: 'result', populate: { path: 'correctWords' } })
      .populate({ path: 'result', populate: { path: 'incorrectWords' } });
  }
}
