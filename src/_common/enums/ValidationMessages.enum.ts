export enum DtoPrefix {
    NAME = 'NAME',
    LASTNAME = 'LASTNAME',
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    IDENTITY_NUMBER = 'IDENTITY_NUMBER',
    EMAIL_OR_PHONE = 'EMAIL_OR_PHONE',
    PASSWORD = 'PASSWORD',
    USR_TYPE = 'USR_TYPE'
}
export enum ValidationType {
    NOT_EMPTY = 'NOT_EMPTY',
    MUST_BE_NUMBER = 'MUST_BE_NUMBER',
    MUST_BE_STRING = 'MUST_BE_STRING',
    MAX_LENGTH = 'MAX_LENGTH',
    NOT_VALID = 'NOT_VALID',
    MIN_LENGTH = 'MIN_LENGTH',
    NOT_STRONG = 'NOT_STRONG',
    WRONG_EMAIL_FORMAT = 'WRONG_EMAIL_FORMAT'
}

export function getValidationMessage(prefix: DtoPrefix, validationType: ValidationType, ...args: any): string {
    const message = `${prefix}_${validationType}${args.length > 0 ? '|' + args.join('|') : ''}`;
    return message;
}

