import { BadGatewayException, Body, Controller, Get, Inject, Post, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { LoginRequestDTO } from './dto/request/LoginRequest.dto';
import { Response } from 'express';
import { LoginResponse, LoginResponseDTO } from './dto/response/Login.response.dto';
import { BaseResponse } from 'src/_base/response/base.response';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';
import { AuthService } from './auth.service';
import { RegisterRequestDTO } from './dto/request/RegisterRequest.dto';
import { UserTypes } from 'src/_common/enums/UserTypes.enum';
import { RegisterResponseDTO } from './dto/response/Register.response.dto';
import { ParentMapper } from 'src/_common/mapper/Parent.mapper';
import { Manager, Parent } from 'src/_common/typeorm';
import { ManagerMapper } from 'src/_common/mapper/Manager.mapper';
import { RolesGuard } from 'src/_common/guard/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthService) private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: LoginRequestDTO, @Res() res: Response<LoginResponseDTO>): Promise<void> {
        try {
            const result: { user: any, refreshToken: string, accessToken: string } = await this.authService.login(body);
            const userData = result.user instanceof Parent ? ParentMapper.toUserDto(result.user) : ManagerMapper.toUserDto(result.user);
            res.json(new BaseResponse({ user: userData, accessToken: result.accessToken, refreshToken: result.refreshToken }, ResponseMessages.SUCCESS, true));
        } catch (ex) {
            throw ex;
        }
    }

    @Post('register')
    async register(@Body() body: RegisterRequestDTO, @Res() res: Response<RegisterResponseDTO>): Promise<void> {
        try {
            if (body.userType === UserTypes.STUDENT)
                throw new BadGatewayException(ResponseMessages.USR_TYPE_NOT_VALID_FOR_REGISTER);
            const result: { user: any, refreshToken: string, accessToken: string } = await this.authService.register(body);

            const userData = result.user instanceof Parent ? ParentMapper.toUserDto(result.user) : ManagerMapper.toUserDto(result.user);

            res.json(new BaseResponse({ user: userData, accessToken: result.accessToken, refreshToken: result.refreshToken }, ResponseMessages.SUCCESS, true));

        } catch (ex) {
            throw ex;
        }
    }
    @Get('token')
    getToken(@Req() req: Request) {
        return req.headers['authorization'];
    }



    @Post('logout')
    logout() { }

    @Post('refresh-token')
    refreshToken() { }


    @Get('guard')
    @UseGuards(RolesGuard)
    @SetMetadata('roles', [UserTypes.PARENT , UserTypes.MANAGER])
    guard(@Req() req: any) {
        console.log(req.user);
        return "Success";
    }





}
