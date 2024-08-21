import { BadGatewayException, Controller, Get, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseResponse } from './_base/response/base.response';
import { ResponseMessages } from './_common/enums/ResponseMessages.enum';

@Controller()

export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    const users = [{ id: 2, username: 'bahadir' }];
    return new BaseResponse(users, ResponseMessages.SUCCESS, true);
  }
}
