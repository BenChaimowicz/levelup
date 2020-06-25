import { User } from "src/entities/users.entity";

export class LoginResponseDTO {
    token: any;
    user: Partial<User>;
}