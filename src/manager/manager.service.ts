import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from 'src/_common/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerService {
    async createManager(data: { email: string, password: string, phone: string, name: string, lastname: string }) {
        const manager = this.managerRepo.create(data);
        return (await this.managerRepo.save(manager));
    }

    async isPhoneAvailable(phone: string) {
        return await this.managerRepo.exists({ where: { phone: phone }, withDeleted: true },);
    }
    async isEmailAvailable(email: string) {
        return await this.managerRepo.exists({ where: { email: email }, withDeleted: true },);
    }
    constructor(@InjectRepository(Manager) private readonly managerRepo: Repository<Manager | null>) { }
    async findManagerForLogin(emailOrPhone: string, isEmail: boolean) {
        let manager: Manager | null;
        if (isEmail) {
            manager = await this.managerRepo.findOneBy({ email: emailOrPhone });
        } else {
            manager = await this.managerRepo.findOneBy({ phone: emailOrPhone });
        }
        return manager;
    }
}
