import { BaseEntity } from "src/_base/entity/base.entity";
import { Exam } from "./Exam";
import { Entity, OneToMany } from "typeorm";

@Entity()
export class Lesson extends BaseEntity {

    name: string;

    @OneToMany(() => Exam, (exam) => exam.lesson)
    exams: Exam[];

}