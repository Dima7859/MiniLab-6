import { ERROR_MESSAGES } from "../components/error-messages";

export const showPasswordLengthErrorMessage = () => {
  const errorTag = document.getElementById('passwordError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.password_length;
};

export const hidePasswordLengthErrorMessage = () => {
  const inputErrorTag = document.getElementById('passwordError');
  inputErrorTag.style.display = 'none';
};

export const showEmailErrorMessage = () => {
  const errorTag = document.getElementById('emailError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.email;
};

export const hideEmailErrorMessage = () => {
  const inputErrorTag = document.getElementById('emailError');
  inputErrorTag.style.display = 'none';
};

export const showErrorNotification = error => {
  const notification = document.createElement('div');
  const body = document.getElementsByTagName('body')[0];
  console.log(error.response.data.error.message);
  switch (error.response.data.error.message) {
    case 'INVALID_PASSWORD':
      notification.innerText = 'Неверный пароль';
      break;
    case 'EMAIL_NOT_FOUND':
      notification.innerText = 'email аккаунт не зарегистрирован';
      break;
    default:
      notification.innerText = error.response.data.error.message;
      break;
  }
  notification.className = 'error-notification';
  body.append(notification);
  setTimeout( () => notification.style.display = 'none', 5000);
};

export const showNameErrorMessage = () => {
  const errorTag = document.getElementById('nameError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.name;
};

export const hideNameErrorMessage = () => {
  const inputErrorTag = document.getElementById('nameError');
  inputErrorTag.style.display = 'none';
};

export const showRepeatPasswordErrorMessage = () => {
  const errorTag = document.getElementById('repeatPasswordError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.repeatPassword;
};

export const hideRepeatPasswordErrorMessage = () => {
  const inputErrorTag = document.getElementById('repeatPasswordError');
  inputErrorTag.style.display = 'none';
};

export const showAgreementCheckboxErrorMessage = () => {
  const errorTag = document.getElementById('agreementCheckboxError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.agreementСheckbox;
};

export const hideAgreementCheckboxErrorMessage = () => {
  const inputErrorTag = document.getElementById('agreementCheckboxError');
  inputErrorTag.style.display = 'none';
};
