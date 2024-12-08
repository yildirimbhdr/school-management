import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { Parent } from 'src/_common/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParentService {
    async createParent(data: { email: string, password: string, phone: string, name: string, lastname: string }) {
        const parent = this.parentRepo.create(data);
        return (await this.parentRepo.save(parent));
    }

    async isPhoneAvailable(phone: string) {
        return await this.parentRepo.exists({ where: { phone: phone }, withDeleted: true },);
    }
    async isEmailAvailable(email: string) {
        return await this.parentRepo.exists({ where: { email: email }, withDeleted: true },);
    }
    constructor(@InjectRepository(Parent) private readonly parentRepo: Repository<Parent | null>) { }
    async findParentForLogin(emailOrPhone: string, isEmail: boolean) {
        let parent: Parent | null;
        if (isEmail) {
            parent = await this.parentRepo.findOneBy({ email: emailOrPhone });
        } else {
            parent = await this.parentRepo.findOneBy({ phone: emailOrPhone });
        }
        return parent;
    }
}
