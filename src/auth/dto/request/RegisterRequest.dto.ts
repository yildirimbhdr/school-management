import { IsEnum, IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { UserTypes } from "src/_common/enums/UserTypes.enum";
import { DtoPrefix, getValidationMessage, ValidationType } from "src/_common/enums/ValidationMessages.enum";

export class RegisterRequestDTO {
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.NOT_EMPTY) })
    @MinLength(6, { message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.MIN_LENGTH, 6) })
    @MaxLength(50, { message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.MAX_LENGTH, 50) })
    email: string;
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.PHONE, ValidationType.NOT_EMPTY) })
    @MinLength(6, { message: getValidationMessage(DtoPrefix.PHONE, ValidationType.MIN_LENGTH, 6) })
    @MaxLength(50, { message: getValidationMessage(DtoPrefix.PHONE, ValidationType.MAX_LENGTH, 50) })
    phone: string;

    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.NAME, ValidationType.NOT_EMPTY) })
    @MinLength(6, { message: getValidationMessage(DtoPrefix.NAME, ValidationType.MIN_LENGTH, 2) })
    @MaxLength(50, { message: getValidationMessage(DtoPrefix.NAME, ValidationType.MAX_LENGTH, 50) })
    name: string;

    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.NOT_EMPTY) })
    @MinLength(6, { message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.MIN_LENGTH, 2) })
    @MaxLength(50, { message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.MAX_LENGTH, 50) })
    lastname: string;

    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.EMAIL_OR_PHONE, ValidationType.NOT_EMPTY) })
    @MinLength(6, { message: getValidationMessage(DtoPrefix.EMAIL_OR_PHONE, ValidationType.MIN_LENGTH, 6) })
    @MaxLength(50, { message: getValidationMessage(DtoPrefix.EMAIL_OR_PHONE, ValidationType.MAX_LENGTH, 50) })
    @IsStrongPassword({}, { message: getValidationMessage(DtoPrefix.PASSWORD, ValidationType.NOT_STRONG) })
    password: string;

    @IsEnum(UserTypes, { message: getValidationMessage(DtoPrefix.USR_TYPE, ValidationType.NOT_VALID) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.USR_TYPE, ValidationType.NOT_EMPTY) })

    userType: UserTypes;
}