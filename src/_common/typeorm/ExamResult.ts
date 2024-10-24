import { BaseEntity } from "src/_base/entity/base.entity";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { Lesson } from "./Lesson";
import { Exam } from "./Exam";
import { Student } from "./Student";

@Entity()
export class ExamResult extends BaseEntity {


    @ManyToOne(() => Exam, (exam) => exam.results)
    exam: Exam;

    @ManyToOne(() => Student, (student) => student.results)
    student: Student;
    
    @Column({ type: 'int', nullable: false, default: 0 })
    score: number;



}