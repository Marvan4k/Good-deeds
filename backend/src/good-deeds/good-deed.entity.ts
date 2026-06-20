import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('good_deeds')
export class GoodDeed {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @ManyToOne(
        () => User,
        (user) => user.goodDeeds,
        {
            onDelete: 'CASCADE',
        }
    )
    user!: User;
}