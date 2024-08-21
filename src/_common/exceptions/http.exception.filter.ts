import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseResponse } from 'src/_base/response/base.response';
import { ResponseMessages } from '../enums/ResponseMessages.enum';
import { DtoPrefix } from '../enums/ValidationMessages.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse<Response>();
        const request: Request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const prefixList: DtoPrefix[] = Object.values(DtoPrefix);
        const validationMessages = prefixList.find(prefix => {
            return (exception.message && exception.message.startsWith(prefix));
        });
        if (validationMessages) {
            response
                .status(status)
                .json(new BaseResponse(null, exception.message, false));
        } else {
            var responseMessage: string;
            switch (status) {
                case 404:
                    responseMessage = ResponseMessages.NOT_FOUND;
                    break;
                case 500:
                    responseMessage = ResponseMessages.INTERNAL_SERVER_ERROR;
                    break;
                case 401:
                    responseMessage = ResponseMessages.UNAUTH;
                    break;
                default:
                    responseMessage = ResponseMessages.BAD_GATEWAY + '|' + exception.message;
                    break
            }
            response
                .status(status)
                .json(new BaseResponse(null, responseMessage, false));
        }


    }
}