import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginResponseDTO } from './dto/login-response.dto';
import { User } from 'src/entities/users.entity';
import { LoginDTO } from './dto/login.dto';
import { TokenPayload } from './dto/token-payload.dot';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(tokenPayload: TokenPayload) {
        const user = await this.userService.findOne(tokenPayload);
        console.log('validateUser:', user);
        if (!user) throw new UnauthorizedException();
        return user;
    }

    async login(userLogin: LoginDTO) {
        const { userNameOrEmail, password } = userLogin;
        let user = await this.userService.findOne({ userName: userNameOrEmail });
        if (!user) {
            user = await this.userService.findOne({ email: userNameOrEmail });
        }
        if (user) {
            const passwordMatch = bcrypt.compare(password, user.password);
            if (passwordMatch) {
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
        return null;
    }

}
