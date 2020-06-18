import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    userName: string;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('text', { unique: true })
    email: string;

    @Column()
    password: string;

    @Column('timestamp with time zone', { nullable: true })
    dateOfBirth?: Date;

    @Column('timestamp with time zone')
    createdAt: Date;

    @Column()
    active: boolean;

}