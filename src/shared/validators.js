import { REGEXP } from './constants/regexp';

export const passwordLengthValidator = password => password.match(REGEXP.PASSWORD_LENGTH);
export const emailValidator = email => email.match(REGEXP.EMAIL);
export const nameValidator = name => name.match(REGEXP.NAME);
