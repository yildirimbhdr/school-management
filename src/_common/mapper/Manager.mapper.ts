import { UserResponse } from "../response/User.response";
import { Manager, Parent } from "../typeorm";

export class ManagerMapper {
    static toUserDto(parent: Manager): UserResponse {
        var userResponse = new UserResponse();
        userResponse.id = parent.id;
        userResponse.name = parent.name;
        userResponse.lastname = parent.lastname;
        userResponse.email = parent.email;
        userResponse.phone = parent.phone;
        return userResponse;

    }
}