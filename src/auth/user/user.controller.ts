import { Body, Controller, Post, UseGuards, Get, Param, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserInfo } from './interfaces/user.interface';
import { UserService } from './services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { IsAdmin } from 'src/guards/isAdmin.guard';
import { UserDecorator } from './decorators/user.decorator';
import { TestDto } from './dto/test.dto';
import { ITest } from './interfaces/test.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), IsAdmin)
  async getAll(): Promise<UserInfo[]> {
    return await this.userService.findAllInfo();
  }

  @Get('refresh')
  @UseGuards(AuthGuard('jwt'))
  async updateCurrentUserData(@UserDecorator() user: any): Promise<UserInfo> {
    return await this.userService.findUserInfoById(user._id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), IsAdmin)
  async getUserById(@Param('id') id: string): Promise<UserInfo> {
    return await this.userService.findUserInfoById(id);
  }

  @Get('results/:id')
  @UseGuards(AuthGuard('jwt'))
  async getResult(@Param('id') id: string): Promise<ITest> {
    return await this.userService.findResultById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), IsAdmin)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Post('results')
  @UseGuards(AuthGuard('jwt'))
  async addResult(@UserDecorator() user: any, @Body() testDto: TestDto): Promise<UserInfo> {
    return await this.userService.addResultFor(testDto, user._id);
  }

  @Post('dictionary')
  @UseGuards(AuthGuard('jwt'))
  async addDictionary(@UserDecorator() user: any, @Body() dictionary: any): Promise<UserInfo> {
    return await this.userService.addDictionaryFor(user._id, dictionary.id);
  }

  @Delete('dictionary/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteDictionary(@UserDecorator() user: any, @Param('id') id: string): Promise<UserInfo> {
    return await this.userService.deleteDictionaryFor(user._id, id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Param('id') id: string, @Body() data: any): Promise<UserInfo> {
    return await this.userService.findByIdAndUpdate(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), IsAdmin)
  async deleteUser(@Param('id') id: string): Promise<any> {
    return await this.userService.deleteUser(id);
  }
}
