import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { LoginRequestDTO } from './dto/request/LoginRequest.dto';
import { Response } from 'express';
import { LoginResponse, LoginResponseDTO } from './dto/response/LoginResponse.dto';
import { BaseResponse } from 'src/_base/response/base.response';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthService) private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: LoginRequestDTO, @Res() res: Response<LoginResponseDTO>): Promise<void> {
        try {
            const data: LoginResponse = await this.authService.login(body);
            res.json(new BaseResponse(data, ResponseMessages.SUCCESS, true));
        } catch (ex) {
            throw ex;
        }

    }

    @Post('register')
    register() {
    }

    @Post('logout')
    logout() { }

    @Post('refresh-token')
    refreshToken() { }





}
