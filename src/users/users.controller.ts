import { Controller, Get, Post, Param, Patch, Delete, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { GetUserDTO } from './dto/get-user.dto';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) { }

    @Get()
    async all(): Promise<GetUserDTO[]> {
        return (await this.usersService.findAll()).map(user => new GetUserDTO(user));
    }

    @Get(':id')
    async one(@Param('id') id): Promise<GetUserDTO> {
        const user = await this.usersService.findOne({ id });
        return new GetUserDTO(user);
    }

    @Post()
    async create(@Body() createUser: CreateUserDTO) {
        return this.usersService.create(createUser);
    }

    @Put(':id')
    async update() { }

    @Delete(':id')
    async delete() { }
}
