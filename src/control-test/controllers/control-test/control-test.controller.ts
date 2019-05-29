import { Controller, Post, Body, Put, Param, Get, UseGuards } from '@nestjs/common';
import { ControlTest, ControlTestDTO, UpdateControlTestDTO } from 'src/control-test/interfaces/control-test.interfaces';
import { ControlTestService } from 'src/control-test/control-test.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from 'src/auth/user/decorators/user.decorator';
import { IsAdmin } from 'src/guards/isAdmin.guard';

@Controller('control')
export class ControlTestController {
  constructor(private controlService: ControlTestService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), IsAdmin)
  public async createControlTest(@Body() test: ControlTestDTO): Promise<ControlTest> {
    return await this.controlService.createControlTest(test);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  public async updateControlTest(@Param('id') testId: string, @Body() updateData: UpdateControlTestDTO): Promise<ControlTest> {
    return await this.controlService.updateControlTest(testId, updateData);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async getAllForCurrentUser(@UserDecorator() { _id }: any): Promise<ControlTest[]> {
    return this.controlService.findAllByUserId(_id);
  }

  @Get('/tests')
  @UseGuards(AuthGuard('jwt'), IsAdmin)
  public async getAll(): Promise<ControlTest[]> {
    return this.controlService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), IsAdmin)
  public async getAllByUserId(@Param('id') id: string): Promise<ControlTest[]> {
    return this.controlService.findAllByUserId(id);
  }

  @Get('test/:id')
  @UseGuards(AuthGuard('jwt'))
  public async getById(@Param('id') id: string): Promise<ControlTest> {
    return this.controlService.getControlTestById(id);
  }
}
