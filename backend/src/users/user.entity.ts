import { OneToMany } from 'typeorm';
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

    @OneToMany(
        () => GoodDeed,
        (goodDeed) => goodDeed.user
    )
    goodDeeds!: GoodDeed[];
}

