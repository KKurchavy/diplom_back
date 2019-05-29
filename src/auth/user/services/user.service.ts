import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { USER_INFO_MODEL, USER_MODEL, TEST_MODEL } from '../../../constants';
import { CreateUserDto } from '../dto/create-user.dto';
import { TestDto } from '../dto/test.dto';
import { User, UserInfo } from '../interfaces/user.interface';
import { ITest } from '../interfaces/test.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<User>,
    @InjectModel(USER_INFO_MODEL) private readonly userInfoModel: Model<UserInfo>,
    @InjectModel(TEST_MODEL) private readonly testModel: Model<ITest>,
  ) {}

  async create({ name, password, role, avatarUrl, firstName, lastName, group }: CreateUserDto): Promise<User> {
    const createdUSerInfo = new this.userInfoModel({ name, role, avatarUrl, firstName, lastName, group });
    const createdUser = new this.userModel({
      name,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      info: createdUSerInfo._id,
    });
    await createdUSerInfo.save();
    return await createdUser.save();
  }

  async addResultFor(result: TestDto, userId: string): Promise<any> {
    const { _id, correctWords } = await this.testModel.create({
      ...result,
      result: this.getResult(result.correctWords.length, result.incorrectWords.length),
    });
    const { tests, learnedWords } = await this.userInfoModel.findById(userId);
    await this.userInfoModel.findByIdAndUpdate(userId, {
      tests: [...tests, _id],
      learnedWords: learnedWords + correctWords.length,
    });

    return await this.testModel.findById(_id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findOneByName(name: string): Promise<User> {
    return await this.userModel.findOne({ name });
  }

  async findAllInfo(): Promise<UserInfo[]> {
    return await this.userInfoModel.find();
  }

  async findInfoByName(name: string): Promise<UserInfo> {
    return await this.userInfoModel.findOne({ name })
      .populate('tests')
      .populate('dictionaries');
  }

  async findUserInfoByName(name: string): Promise<UserInfo> {
    return await this.userInfoModel.findOne({ name })
      .populate('tests')
      .populate('dictionaries');
  }

  async findUserInfoById(id: string): Promise<UserInfo> {
    return await this.userInfoModel.findById(id)
      .populate('tests')
      .populate({ path: 'dictionaries', populate: { path: 'words' } });
  }

  async findResultById(id: string): Promise<ITest> {
    return await this.testModel.findById(id)
      .populate('correctWords')
      .populate('incorrectWords');
  }

  async findByIdAndUpdate(id: string, data: any): Promise<UserInfo> {
    return await this.userInfoModel.findByIdAndUpdate(id, data);
  }

  async deleteUser(id: string): Promise<any> {
    const userInfo = await this.userInfoModel.findById(id);
    await this.userModel.findOneAndDelete({ name: userInfo.name });
    return await this.userInfoModel.findByIdAndDelete(id);
  }

  async addDictionaryFor(userId: string, dictionaryId: string): Promise<any> {
    const { dictionaries } = await this.userInfoModel.findById(userId);
    return this.userInfoModel.findByIdAndUpdate(userId, { dictionaries: [...dictionaries, dictionaryId] });
  }

  async deleteDictionaryFor(userId: string, dictionaryId: string): Promise<any> {
    const { dictionaries } = await this.userInfoModel.findById(userId);
    const dictionaryIndex = dictionaries.findIndex(value => value._id == dictionaryId);

    if (dictionaryIndex >= 0) {
      dictionaries.splice(dictionaryIndex, 1);
    }

    return this.userInfoModel.findByIdAndUpdate(userId, { dictionaries: [...dictionaries] });
  }

  private getResult(a: number, b: number): number {
    return Math.floor((a / (a + b)) * 100);
  }
}
