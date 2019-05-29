import { Controller, Get, Put, Param, Body, Post, UseGuards } from '@nestjs/common';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../interfaces/settings.interface';
import { AuthGuard } from '@nestjs/passport';
import { IsAdmin } from '../../../guards/isAdmin.guard';

@Controller('settings')
export class SettingsController {
    constructor(private readonly settigsService: SettingsService) {}

    @Get()
    async find(): Promise<Settings[]> {
        return this.settigsService.find();
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') settingsId, @Body() settings): Promise<Settings> {
        return this.settigsService.update(settingsId, settings);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), IsAdmin)
    async create(@Body() settings): Promise<Settings> {
        return this.settigsService.create(settings);
    }
}
