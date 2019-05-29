import { Controller, Post, Get, Param, Put, Body, Delete, UseGuards } from '@nestjs/common';
import { DectionaryDto } from '../interfaces/dectionary.dto';
import { DectionariesService } from '../dectionaries.service';
import { Dectionary } from '../interfaces/dectionary.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('dictionaries')
export class DectionariesController {
  constructor(private service: DectionariesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createDectionary(@Body() dectionary: DectionaryDto): Promise<Dectionary> {
    return await this.service.createDectionary(dectionary);
  }

  @Post(':id/words/delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteWordFromDectionary(@Param('id') id: string, @Body() { word }: any): Promise<Dectionary> {
    const { words } = await this.service.getById(id);
    const wordIndex = words.findIndex(value => value._id == word);

    if (wordIndex >= 0) {
      words.splice(wordIndex, 1);
    }

    return await this.service.updateDectionary(id, { words: [ ...words ] });
  }

  @Post(':id/words')
  @UseGuards(AuthGuard('jwt'))
  async addWordToDectionary(@Param('id') id: string, @Body() { word }: any): Promise<Dectionary> {
    const { words } = await this.service.getById(id);
    return await this.service.updateDectionary(id, { words: [ ...words, word ] });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(): Promise<Dectionary[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<Dectionary> {
    return await this.service.getById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateOne(@Param('id') id: string, @Body() newData: any): Promise<Dectionary> {
    return await this.service.updateDectionary(id, newData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteOne(@Param('id') id: string): Promise<any> {
    return await this.service.deleteOne(id);
  }
}
