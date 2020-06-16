import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userName: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column('timestamp with time zone')
    dateOfBirth: Date;

    @Column('timestamp with time zone')
    created: Date;

    @Column()
    active: boolean;
}