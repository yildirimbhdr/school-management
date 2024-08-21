import { ResponseMessages } from "src/_common/enums/ResponseMessages.enum";

export class BaseResponse<T> {
    data: T;
    success: boolean;
    message: string;
    constructor(data: T, message: string, success: boolean) {
        this.data = data;
        this.message = message;
        this.success = success
    }

}

