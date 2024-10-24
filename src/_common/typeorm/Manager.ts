import { BaseEntity } from "src/_base/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Manager extends BaseEntity {
    @Column({ type: 'varchar', nullable: false, length: 150 })
    email: string;
    @Column({ type: 'varchar', nullable: false, length: 150 })
    name: string;
    @Column({ type: 'varchar', nullable: false, length: 150 })
    lastname: string;

    @Column({ type: 'varchar', length: 50, comment: 'Format = 905051234567' })
    phone: string;

    @Column({ type: 'varchar', length: 200 })
    password: string;
}