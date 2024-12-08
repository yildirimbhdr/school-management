import { BaseResponse } from "src/_base/response/base.response";
import { ParentResponse } from "src/_common/response/Parent.response";
import { UserResponse } from "src/_common/response/User.response";

export class RegisterResponse {
    accessToken: string;
    refreshToken: string;
    user: UserResponse;
}

export class RegisterResponseDTO extends BaseResponse<RegisterResponse> {
    data: RegisterResponse;
}