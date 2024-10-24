import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";
import { DtoPrefix, getValidationMessage, ValidationType } from "src/_common/enums/ValidationMessages.enum";

export class CreateStudentRequestDTO {
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.NAME, ValidationType.NOT_EMPTY) })
    @MaxLength(25, { message: getValidationMessage(DtoPrefix.NAME, ValidationType.MAX_LENGTH, 25) })
    name: string;

    @MaxLength(25, { message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.MAX_LENGTH, 25) })
    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.NOT_EMPTY) })
    lastname: string;

    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.IDENTITY_NUMBER, ValidationType.NOT_EMPTY) })
    @IsNumber({}, { message: getValidationMessage(DtoPrefix.IDENTITY_NUMBER, ValidationType.MUST_BE_NUMBER) })
    identityNumber: number;
}
//Okul yönetim projesi
//Personel
//Öğrenciler
//Veliler
//Dersler
//Notlar
//Sınıflar