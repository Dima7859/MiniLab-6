export const REGEXP = {
  PASSWORD_LENGTH: /^(?<!\\s+)[\S]{6,}$/,
  EMAIL: /^[a-z0-9.\-_+]+@[a-z0-9\-_+]+\.[a-z0-9.\-_+]{2,6}$/i,
  NAME: /^([a-z]+\s)*[a-z]+$/i,
  CONTENT: /^([\S]+\s)*[\S]+$/i,
  TASK: /(?<!\\s+)[\S]{2,}/i,
  dragAndDropMobileTask: /^(?!Names columns$).*$/
};
