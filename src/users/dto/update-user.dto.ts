import { User } from './../../entities/users.entity';

export class UpdateUserDTO {

    constructor(user: User) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.userName = user.userName;
        this.dateOfBirth = user.dateOfBirth;
    }

    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    userName?: string;
    dateOfBirth?: Date;
}