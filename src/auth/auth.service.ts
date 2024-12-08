import { BadGatewayException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LoginRequestDTO } from './dto/request/LoginRequest.dto';
import { LoginResponse } from './dto/response/Login.response.dto';
import { ParentService } from 'src/parent/parent.service';
import { Manager, Parent } from 'src/_common/typeorm';
import * as bcrypt from 'bcrypt';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';
import { RegisterRequestDTO } from './dto/request/RegisterRequest.dto';
import { UserTypes } from 'src/_common/enums/UserTypes.enum';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/_common/payloads/jwt.payload';
import { ManagerService } from 'src/manager/manager.service';
import { UserResponse } from 'src/_common/response/User.response';

@Injectable()
export class AuthService {
    async register(body: RegisterRequestDTO): Promise<{ user: any, refreshToken: string, accessToken: string }> {
        const isAvailable = await this.isAvailableForRegister(body);
        if (isAvailable) {
            if (body.userType === UserTypes.PARENT) {
                const hashedPassword = await bcrypt.hash(body.password, 10);
                const parent = await this.parentService.createParent({ ...body, password: hashedPassword });
                const payload: JwtPayload = { 'email': parent?.email, 'phone': parent?.phone, 'name': parent?.name, 'lastname': parent?.lastname, 'id': parent.id, type: UserTypes.PARENT };
                const accessToken = this.jwtService.sign(payload);
                const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
                return { 'user': parent, 'refreshToken': refreshToken, 'accessToken': accessToken };
            } else {
                const hashedPassword = await bcrypt.hash(body.password, 10);
                const manager = await this.managerService.createManager({ ...body, password: hashedPassword });
                const payload: JwtPayload = { 'email': manager?.email, 'phone': manager?.phone, 'name': manager?.name, 'lastname': manager?.lastname, 'id': manager.id, type: UserTypes.MANAGER };
                const accessToken = this.jwtService.sign(payload);
                const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
                return { 'user': manager, 'refreshToken': refreshToken, 'accessToken': accessToken };
            }
        }
    }
    constructor(@Inject(forwardRef(() => ParentService)) private readonly parentService: ParentService, private readonly jwtService: JwtService, @Inject(forwardRef(() => ManagerService)) private readonly managerService: ManagerService) { }
    async login(data: LoginRequestDTO): Promise<{ user: any, refreshToken: string, accessToken: string }> {
        const parent: Parent | null = await this.parentService.findParentForLogin(data.emailOrPhone, this.isEmail(data.emailOrPhone));
        const manager: Manager | null = await this.managerService.findManagerForLogin(data.emailOrPhone, this.isEmail(data.emailOrPhone));
        
        if (parent && bcrypt.compareSync(data.password, parent.password)) {
            const payload: JwtPayload = { 'email': parent?.email, 'phone': parent?.phone, 'name': parent?.name, 'lastname': parent?.lastname, 'id': parent.id, 'type': UserTypes.PARENT };
            const accessToken = this.jwtService.sign(payload);
            const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
            return { 'user': parent, 'refreshToken': refreshToken, 'accessToken': accessToken };
        } else if (manager && bcrypt.compareSync(data.password, manager.password)) {
            const payload: JwtPayload = { 'email': manager?.email, 'phone': manager?.phone, 'name': manager?.name, 'lastname': manager?.lastname, 'id': manager.id, 'type': UserTypes.MANAGER };
            const accessToken = this.jwtService.sign(payload);
            const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
            return { 'user': manager, 'refreshToken': refreshToken, 'accessToken': accessToken };
        } else {
            throw new NotFoundException(ResponseMessages.PASSWORD_OR_EMAIL_WRONG);
        }
    }
    private isEmail(emailOrPhone: string) {
        return emailOrPhone.includes('@');
    }

    private async isAvailableForRegister(body: RegisterRequestDTO) {
        if (body.userType === UserTypes.PARENT) {
            const isEmailAvailableForParent = await this.parentService.isEmailAvailable(body.email);
            const isPhoneAvailableForParent = await this.parentService.isPhoneAvailable(body.phone);
            if (isEmailAvailableForParent) {
                throw new BadGatewayException(ResponseMessages.EMAIL_ALREADY_EXISTS);
            } else if (isPhoneAvailableForParent) {
                throw new BadGatewayException(ResponseMessages.PHONE_ALREADY_EXISTS);
            }
            return true;
        } else {
            const isEmailAvailableForParent = await this.managerService.isEmailAvailable(body.email);
            const isPhoneAvailableForParent = await this.managerService.isPhoneAvailable(body.phone);
            if (isEmailAvailableForParent) {
                throw new BadGatewayException(ResponseMessages.EMAIL_ALREADY_EXISTS);
            } else if (isPhoneAvailableForParent) {
                throw new BadGatewayException(ResponseMessages.PHONE_ALREADY_EXISTS);
            }
            return true;
        }






    }
}
