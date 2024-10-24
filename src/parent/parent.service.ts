import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parent } from 'src/_common/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParentService {
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
