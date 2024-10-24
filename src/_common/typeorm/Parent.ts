import { BaseEntity } from "src/_base/entity/base.entity";
import { Column, Entity, ManyToMany } from "typeorm";
import { UserStatus } from "../enums/StudentStatus.enum";
import { Student } from "./Student";

@Entity()
export class Parent extends BaseEntity {
    @Column({ type: 'varchar', length: 50 })
    name: string;
    @Column({ type: 'varchar', length: 50 })
    lastname: string;
    @Column({ type: 'varchar', length: 150 })
    email: string;
    @Column({ type: 'varchar', length: 50, comment: 'Format = 905051234567' })
    phone: string;
    @Column({ type: 'varchar', length: 200 })
    password: string;



    @ManyToMany(() => Student, (student) => student.parents)
    students: Student[];

    //TODO relations 
    //student
}