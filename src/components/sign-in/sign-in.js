import { signIn } from '../../api/api-handlers';
import {  passwordLengthValidator,emailValidator } from '../../shared/validators';
import {
  showPasswordLengthErrorMessage,
  hidePasswordLengthErrorMessage,
  showEmailErrorMessage,
  hideEmailErrorMessage,
  showErrorNotification
} from '../../shared/error-handlers';

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
      hidePasswordLengthErrorMessage();
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
      hideEmailErrorMessage();
      emailInput.classList.remove('invalid');
    } else {
      formFields.email.isValid = false;
      emailInput.classList.add('invalid');
    }
    checkFormValid();
  };

  passwordInput.onblur = () => {
    !passwordLengthValidator(passwordInput.value) ?
      showPasswordLengthErrorMessage():
      hidePasswordLengthErrorMessage();
  };

  emailInput.onblur = () => {
    !emailValidator(emailInput.value) ?
      showEmailErrorMessage():
      hideEmailErrorMessage();
  };

  const checkFormValid = () => {
    const isFormValid = Object.values(formFields).every(value => value.isValid);
    isFormValid ? signInBtn.removeAttribute('disabled'): signInBtn.setAttribute('disabled', true);
  };
};
