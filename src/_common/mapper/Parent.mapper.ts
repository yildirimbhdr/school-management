import { UserResponse } from "../response/User.response";
import { Parent } from "../typeorm";

export class ParentMapper {
    static toUserDto(parent: Parent): UserResponse {
        var userResponse = new UserResponse();
        userResponse.id = parent.id;
        userResponse.name = parent.name;
        userResponse.lastname = parent.lastname;
        userResponse.email = parent.email;
        userResponse.phone = parent.phone;
        return userResponse;

    }
}