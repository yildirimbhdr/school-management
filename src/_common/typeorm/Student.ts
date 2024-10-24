import { BaseEntity } from "src/_base/entity/base.entity";
import { Class } from "./Class";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Parent } from "./Parent";
import { UserStatus as StudentStatus } from "../enums/StudentStatus.enum";
import { ExamResult } from "./ExamResult";

@Entity()
export class Student extends BaseEntity {
    @Column({ type: 'varchar', length: 50, nullable: false })
    firstName: string;
    @Column({ type: 'varchar', length: 50, nullable: false })
    lastName: string;

    @Column({ type: 'timestamp', nullable: true })
    dateOfBirth: Date;

    @ManyToOne(() => Class, (element) => element.students)
    class: Class;
    @Column({ type: 'enum', enum: StudentStatus, default: StudentStatus.ACTIVE })
    status: StudentStatus;

    @ManyToMany(() => Parent, (element) => element.students)
    parents: Parent[]

    @OneToMany(() => ExamResult, (element) => element.student)
    results:ExamResult[];

}