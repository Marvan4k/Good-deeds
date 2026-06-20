import { JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { GoodDeed } from '../good-deeds/good-deed.entity';
import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    passwordHash!: string;

    @Column({
        unique: true,
    })
    username!: string;

    @OneToMany(
        () => GoodDeed,
        (goodDeed) => goodDeed.user
    )
    goodDeeds!: GoodDeed[];

    @ManyToMany(() => User)
    @JoinTable()
    friends!: User[];
}

