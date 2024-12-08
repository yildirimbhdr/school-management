import { BaseResponse } from "src/_base/response/base.response";
import { UserResponse } from "src/_common/response/User.response";

export class LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: UserResponse;
}

export class LoginResponseDTO extends BaseResponse<LoginResponse> {
    data: LoginResponse;
}