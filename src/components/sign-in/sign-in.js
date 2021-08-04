import { signIn } from '../../api/api-handlers';
import {  passwordLengthValidator,emailValidator } from '../../shared/validators';
import {
  showErrorMessage,
  hideErrorMessage,
  showErrorNotification
} from '../../shared/error-handlers';
import { ERROR_MESSAGES } from '../error-messages';

export const signInHandler = () => {
  const signInForm = document.querySelector('.sign-in__form');
  const signInBtn = document.getElementById('signInBtn');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const btnWatchPassword = document.getElementById('btnWatchPassword');

  const formFields = {
    email: {
      isValid: false
    },
    password: {
      isValid: false
    }
  }

  signInBtn.setAttribute('disabled', true);

  signInForm.addEventListener('submit', event =>{
    event.preventDefault();

    signIn(emailInput.value, passwordInput.value).catch( error => showErrorNotification(error));
  });

  btnWatchPassword.onclick = () => passwordInput.type === "password" ? passwordInput.type = "text" : passwordInput.type = "password";

  passwordInput.oninput = () => {
    if (passwordLengthValidator(passwordInput.value)) {
      formFields.password.isValid = true;
      hideErrorMessage('passwordError');
      passwordInput.classList.remove('invalid');
    } else {
      passwordInput.classList.add('invalid');
      formFields.password.isValid = false;
    }
    checkFormValid();
  };

  emailInput.oninput = () => {
    if (emailValidator(emailInput.value)) {
      formFields.email.isValid = true;
      hideErrorMessage('emailError');
      emailInput.classList.remove('invalid');
    } else {
      formFields.email.isValid = false;
      emailInput.classList.add('invalid');
    }
    checkFormValid();
  };

  passwordInput.onblur = () => {
    !passwordLengthValidator(passwordInput.value) ?
      showErrorMessage('passwordError', ERROR_MESSAGES.password_length):
      hideErrorMessage('passwordError');
  };

  emailInput.onblur = () => {
    !emailValidator(emailInput.value) ?
      showErrorMessage('emailError', ERROR_MESSAGES.email):
      hideErrorMessage('emailError');
  };

  const checkFormValid = () => {
    const isFormValid = Object.values(formFields).every(value => value.isValid);
    isFormValid ? signInBtn.removeAttribute('disabled'): signInBtn.setAttribute('disabled', true);
  };
};
