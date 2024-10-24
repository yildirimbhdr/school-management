import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LoginRequestDTO } from './dto/request/LoginRequest.dto';
import { LoginResponse } from './dto/response/LoginResponse.dto';
import { ParentService } from 'src/parent/parent.service';
import { Parent } from 'src/_common/typeorm';
import * as bcrypt from 'bcrypt';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(() => ParentService)) private readonly parentService: ParentService) { }
    async login(data: LoginRequestDTO): Promise<LoginResponse> {
        //parent, manager
        const parent: Parent | null = await this.parentService.findParentForLogin(data.emailOrPhone, this.isEmail(data.emailOrPhone));

        if (parent && bcrypt.compareSync(data.password, parent.password)) {
            return { accessToken: '', refreshToken: '', user: { 'lastname': 'asdf', 'name': 'asd', 'pay': 25 } };
        } else {
            throw new NotFoundException(ResponseMessages.PASSWORD_OR_EMAIL_WRONG);
        }
    }
    private isEmail(emailOrPhone: string) {
        return emailOrPhone.includes('@');
    }
}
