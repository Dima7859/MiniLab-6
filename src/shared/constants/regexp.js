export const REGEXP = {
  PASSWORD_LENGTH: /^.{6,}$/,
  EMAIL: /^[a-z0-9.\-_+]+@[a-z0-9\-_+]+\.[a-z0-9.\-_+]{2,6}$/i,
  UPPER_CASE: /(?=.*[A-Z])/,
  LOWER_CASE: /(?=.*[a-z])/,
  NUMBERS: /(?=.*\d)/,
  EIGHT_CHARACTERS: /[a-zA-Z\d@$#!%?&*^()-=+_]{8,}/
}