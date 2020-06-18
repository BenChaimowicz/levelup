import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './../entities/users.entity';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAll() {
        return this.userRepository.find();
    }

    async findOne(u: DeepPartial<User>): Promise<User> {
        let user: User;
        try {
            user = await this.userRepository.findOne(u);
        } catch (err) { throw new BadRequestException(err) };

        if (!user) { throw new NotFoundException(`${JSON.stringify(u)} does not exist!`) };

        return user;
    }
    async create(userDto: CreateUserDTO): Promise<User> {
        let newUser: User;
        newUser.active = true;
        newUser.createdAt = new Date();
        try {
            newUser.password = await bcrypt.hashSync(userDto.password, 8);
            return await this.userRepository.save(newUser);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }
}
