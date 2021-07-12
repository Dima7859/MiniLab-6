import { PASSWORD_LENGTH,EMAIL_VALID } from './constants/regexp';

export const passwordLengthValidator = password => password.match(PASSWORD_LENGTH);
export const emailValidator = email => email.match(EMAIL_VALID);
