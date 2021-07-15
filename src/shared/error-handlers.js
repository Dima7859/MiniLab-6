import { ERROR_MESSAGES } from "../components/error-messages";

export const showPasswordLengthErrorMessage = () => {
  const errorTag = document.getElementById('passwordError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.password_length;
}

export const hidePasswordLengthErrorMessage = () => {
  const inputErrorTag = document.getElementById('passwordError');
  inputErrorTag.style.display = 'none';
}

export const showEmailErrorMessage = () => {
  const errorTag = document.getElementById('emailError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.email;
}

export const hideEmailErrorMessage = () => {
  const inputErrorTag = document.getElementById('emailError');
  inputErrorTag.style.display = 'none';
}

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
}
