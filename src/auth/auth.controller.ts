import { Controller, Post, Body } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() login: LoginDTO) {
        return await this.authService.login(login);
    }

    @Post('register')
    async register(@Body() userDto: CreateUserDTO) {
        return await this.authService.register(userDto);
    }
}
