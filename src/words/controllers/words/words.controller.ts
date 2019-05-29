import { Body, Controller, Get, Param, Post, Put, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsAdmin } from 'src/guards/isAdmin.guard';
import { WordService } from 'src/words/word.service';

@Controller('words')
export class WordsController {
    constructor(private readonly wordService: WordService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll() {
        return await this.wordService.find();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), IsAdmin)
    async create(@Body() word: any | any[]) {
        return await this.wordService.create(word);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), IsAdmin)
    async findOneAndUpdate(@Param('id') id: string, @Body() word) {
        return await this.wordService.update(word, id);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), IsAdmin)
    async findOneAndDelete(@Param('id') wordId: string) {
        return await this.wordService.delete(wordId);
    }
}
