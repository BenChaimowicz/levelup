import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginResponseDTO } from './dto/login-response.dto';
import { User } from 'src/entities/users.entity';
import { LoginDTO } from './dto/login.dto';
import { TokenPayload } from './dto/token-payload.dot';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(tokenPayload: TokenPayload) {
        try {
            const user = await this.userService.findOne({ id: tokenPayload.id, email: tokenPayload.email });
            if (!user) throw new UnauthorizedException();
            return user;
        } catch (err) {
            throw new UnauthorizedException(err);
        }
    }

    async login(userLogin: LoginDTO) {
        const { userNameOrEmail, password } = userLogin;
        console.log(userLogin);
        if (!userNameOrEmail || !password) throw new NotFoundException();
        let user = await this.userService.findOne({ userName: userNameOrEmail });
        if (!user) {
            user = await this.userService.findOne({ email: userNameOrEmail });
        }
        if (user) {
            const passwordMatch = bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const payload = await this.signToken(user);
                return payload;
            }
        }
        return null;
    }

    async register(userDto: CreateUserDTO) {
        try {
            const user = await this.userService.create(userDto);
            if (!user) throw new BadRequestException();
            const payload = await this.signToken(user);
            return payload;
        } catch (err) {
            return err;
        }

    }

    async signToken(user: User) {
        const { password, ...result } = user;
        const tokenContents = { email: result.email, id: result.id };
        const payload: { user: LoginResponseDTO } = {
            user: {
                user: result,
                token: this.jwtService.sign(tokenContents)
            }
        }
        return payload;
    }
}
