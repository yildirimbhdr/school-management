import { IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { DtoPrefix, getValidationMessage, ValidationType } from "src/_common/enums/ValidationMessages.enum";

export class LoginRequestDTO {
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.EMAIL_OR_PHONE, ValidationType.NOT_EMPTY) })
    @MinLength(6, { message: getValidationMessage(DtoPrefix.EMAIL_OR_PHONE, ValidationType.MIN_LENGTH, 6) })
    @MaxLength(50, { message: getValidationMessage(DtoPrefix.EMAIL_OR_PHONE, ValidationType.MAX_LENGTH, 50) })
    emailOrPhone: string;

    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.EMAIL_OR_PHONE, ValidationType.NOT_EMPTY) })
    @MinLength(6, { message: getValidationMessage(DtoPrefix.EMAIL_OR_PHONE, ValidationType.MIN_LENGTH, 6) })
    @MaxLength(50, { message: getValidationMessage(DtoPrefix.EMAIL_OR_PHONE, ValidationType.MAX_LENGTH, 50) })
    @IsStrongPassword({}, { message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.NOT_STRONG) })
    password: string;
}