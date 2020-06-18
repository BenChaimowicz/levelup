import { User } from './../../entities/users.entity';

export class GetUserDTO {

    constructor(user: User) {
        this.id = user.id;
        this.userName = user.userName;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.dateOfBirth = user.dateOfBirth;
        this.createdAt = user.createdAt;
    }

    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth?: Date;
    createdAt: Date;
}