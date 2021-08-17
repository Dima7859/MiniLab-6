import { ERROR_MESSAGES } from '../components/error-messages';

export const showErrorMessage = (id, message) => {
  const errorTag = document.getElementById(id);
  errorTag.style.display = 'block';
  errorTag.innerText = message;
}

export const hideErrorMessage = id => {
  const inputErrorTag = document.getElementById(id);
  inputErrorTag.style.display = 'none';
}

export const showErrorNotification = error => {
  const notification = document.createElement('div');
  const notificationImg = document.createElement('div');
  const notificationText = document.createElement('p');
  const body = document.getElementsByTagName('body')[0];

  if (error.response) {
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
  } else {
    if (error.message) {
      notificationText.innerText = error.message;
    } else {
      if (error === 'EMAIL_NOT_FOUND') {
        notificationText.innerText = 'Email account not registered';
      } else notificationText.innerText = 'Such an Element already exists';
    };
  }

  notification.className = 'error-notification';
  notificationImg.className = 'error-notification__img';
  body.append(notification);
  notification.append(notificationImg);
  notification.append(notificationText);

  setTimeout( () => notification.remove(), 5000);
};
