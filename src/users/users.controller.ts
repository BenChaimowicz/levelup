import { AuthService } from './../auth/auth.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Controller, Get, Post, Param, Patch, Delete, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { GetUserDTO } from './dto/get-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
        private authService: AuthService
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
    async create(@Body() createUser: CreateUserDTO): Promise<GetUserDTO> {
        let newUser = await this.usersService.create(createUser);
        return new GetUserDTO(newUser);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: UpdateUserDTO): Promise<GetUserDTO> {
        let updatedUser = await this.usersService.update(id, user);
        return new GetUserDTO(updatedUser);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<GetUserDTO> {
        const deletedUser = await this.usersService.delete({ id });
        return new GetUserDTO(deletedUser);
    }
}
