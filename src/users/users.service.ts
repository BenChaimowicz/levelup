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

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
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
        let newUser: User = new User();
        try {
            newUser.userName = userDto.userName;
            newUser.firstName = userDto.firstName;
            newUser.lastName = userDto.lastName;
            newUser.email = userDto.email;
            newUser.active = true;
            newUser.createdAt = new Date();
            newUser.password = await bcrypt.hashSync(userDto.password, 8);
            return await this.userRepository.save(newUser);
        } catch (err) {
            console.error(err);
            throw new BadRequestException(err);
        }
    }

    async update(id: string, updateUser: DeepPartial<User>): Promise<User> {
        try {
            const userToUpdate: User = await this.userRepository.findOne({ id });
            const updatedUser = await this.userRepository.save({ ...userToUpdate, ...updateUser });
            return updatedUser;
        } catch (err) {
            throw new NotFoundException();
        }
    }

    async delete(userPart: DeepPartial<User>) {
        let user = await this.userRepository.findOne(userPart);
        try {
            await this.userRepository.remove(user);
            return user;
        } catch (err) {
            throw new NotFoundException();
        }
    }
}
