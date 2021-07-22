import { ERROR_MESSAGES } from '../components/error-messages';

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
  const notificationImg = document.createElement('div');
  const notificationText = document.createElement('p');
  const body = document.getElementsByTagName('body')[0];

  switch (error.response.data.error.message) {
    case 'INVALID_PASSWORD':
      notificationText.innerText = 'Invalid password';
      break;
    case 'EMAIL_NOT_FOUND':
      notificationText.innerText = 'Email account not registered';
      break;
      default:
        notificationText.innerText = error.response.data.error.message;
        break;
      }

      notificationImg.className = 'error-notification__img';
      notification.className = 'error-notification';
      body.append(notification);
      notification.append(notificationImg);
      notification.append(notificationText);

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

export const showErrorRegisterNotification = error => {
  const notification = document.createElement('div');
  const notificationImg = document.createElement('div');
  const notificationText = document.createElement('p');
  const body = document.getElementsByTagName('body')[0];

  notification.innerText = error.message;
  notification.className = 'error-notification';
  notificationImg.className = 'error-notification__img';
  body.append(notification);
  notification.append(notificationImg);
  setTimeout( () => notification.style.display = 'none', 5000);
};
