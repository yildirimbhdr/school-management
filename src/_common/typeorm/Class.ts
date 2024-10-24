import {  Column, Entity, OneToMany } from "typeorm";
import { Student } from "./Student";
import { BaseEntity } from "src/_base/entity/base.entity";

@Entity()
export class Class extends BaseEntity {
    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 15 })
    code: string;

    @Column({ type: 'varchar', length: 200 })
    description: string;

    @OneToMany(() => Student, (student) => student.class)
    students: Student[];

}