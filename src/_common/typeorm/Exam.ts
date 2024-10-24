import { BaseEntity } from "src/_base/entity/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Lesson } from "./Lesson";
import { ExamResult } from "./ExamResult";

@Entity()

export class Exam extends BaseEntity {

    @Column()
    name: string;

    @ManyToOne(() => Lesson, (lesson) => lesson.exams)
    lesson: Lesson;

    @Column({ type: 'timestamp', nullable: true })
    date: Date;

    @OneToMany(() => ExamResult, (result) => result.exam)
    results: ExamResult[];



}