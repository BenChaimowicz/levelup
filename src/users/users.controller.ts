import { Controller, Get, Post, Param, Patch, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) { }

    @Get()
    async all() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async one(@Param('id') id) { }

    @Post()
    async create() { }

    @Put(':id')
    async update() { }

    @Delete(':id')
    async delete() { }
}
