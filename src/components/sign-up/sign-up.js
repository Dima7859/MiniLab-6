import { signUp } from '../../api/api-handlers';
import {
  nameValidator,
  emailValidator,
  passwordLengthValidator
} from '../../shared/validators';
import { showErrorMessage, hideErrorMessage } from '../../shared/error-handlers';
import { currentVersionAgreement } from '../../shared/agreementUser';
import { ERROR_MESSAGES } from '../error-messages';

export const signUpHendler = () => {
  const signUpForm = document.querySelector('.sign-up__form');
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const repeatPasswordInput = document.getElementById('repeatPassword');
  const signUpBtn = document.getElementById('signUpBtn');
  const agreementCheckbox = document.getElementById('agreementCheckbox');
  const btnWatchPassword = document.getElementById('btnWatchPassword');
  const btnWatchRepeatPassword = document.getElementById('btnWatchRepeatPassword');

  const formFields = {
    name: {
      isValid: false
    },
    email: {
      isValid: false
    },
    password: {
      isValid: false
    },
    repeatPassword: {
      isValid: false
    },
    agreementCheckbox: {
      isValid: false
    },
  }

  signUpBtn.setAttribute('disabled', true);

  signUpForm.addEventListener('submit', event => {
    event.preventDefault();

    const user = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      Agreement:currentVersionAgreement
    }

    signUp(user);
  });

  btnWatchPassword.onclick = () => passwordInput.type === "password" ? passwordInput.type = "text" : passwordInput.type = "password";

  btnWatchRepeatPassword.onclick = () => repeatPasswordInput.type === "password" ? repeatPasswordInput.type = "text" : repeatPasswordInput.type = "password";

  nameInput.oninput = () => {
    if (nameValidator(nameInput.value)) {
      formFields.name.isValid = true;
      hideErrorMessage('nameError');
      nameInput.classList.remove('invalid');
    } else {
      formFields.name.isValid = false;
      nameInput.classList.add('invalid');
    }
    checkFormValid();
  };

  nameInput.onblur = () => {
    !nameValidator(nameInput.value) ?
      showErrorMessage('nameError', ERROR_MESSAGES.name):
      hideErrorMessage('nameError');
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

  emailInput.onblur = () => {
    !emailValidator(emailInput.value) ?
    showErrorMessage('emailError', ERROR_MESSAGES.email):
    hideErrorMessage('emailError');
  };

  passwordInput.oninput = () => {
    if (passwordLengthValidator(passwordInput.value)) {
      formFields.password.isValid = true;
      hideErrorMessage('passwordError');
      passwordInput.classList.remove('invalid');
    } else {
      formFields.password.isValid = false;
      passwordInput.classList.add('invalid');
    }

    if (repeatPasswordInput.value !== '' && repeatPasswordInput.value === passwordInput.value) {
      formFields.repeatPassword.isValid = true;
      repeatPasswordInput.classList.remove('invalid');
      hideErrorMessage('repeatPasswordError');
    } else {
      formFields.repeatPassword.isValid = false;
    }

    checkFormValid();
  };

  passwordInput.onblur = () => {
    !passwordLengthValidator(passwordInput.value)?
      showErrorMessage('passwordError', ERROR_MESSAGES.password_length) :
      hideErrorMessage('passwordError');

    if (repeatPasswordInput.value !== '' && repeatPasswordInput.value !== passwordInput.value) {
      showErrorMessage('repeatPasswordError', ERROR_MESSAGES.repeatPassword);
      repeatPasswordInput.classList.add('invalid');
      formFields.repeatPassword.isValid = false;
    } else {
      repeatPasswordInput.classList.remove('invalid');
      hideErrorMessage('repeatPasswordError');
    }

    checkFormValid();
  };

  repeatPasswordInput.oninput = () => {
    if (formFields.password.isValid && password.value === repeatPasswordInput.value) {
      formFields.repeatPassword.isValid = true
      hideErrorMessage('repeatPasswordError');
      repeatPasswordInput.classList.remove('invalid');
    } else {
      formFields.repeatPassword.isValid  = false
      repeatPasswordInput.classList.add('invalid');
    };

    checkFormValid();
  };


  repeatPasswordInput.onblur = () => {
    repeatPasswordInput.value !== passwordInput.value ?
      showErrorMessage('repeatPasswordError', ERROR_MESSAGES.repeatPassword):
      hideErrorMessage('repeatPasswordError');
  };

  agreementCheckbox.onchange = () => {
    if (agreementCheckbox.checked) {
      formFields.agreementCheckbox.isValid = true;
      hideErrorMessage('agreementCheckboxError');
    } else {
      formFields.agreementCheckbox.isValid = false;
      showErrorMessage('agreementCheckboxError', ERROR_MESSAGES.agreementСheckbox);
    }
    checkFormValid();
  };

  agreementCheckbox.onblur = () => {
    !agreementCheckbox.checked ?
      showErrorMessage('agreementCheckboxError', ERROR_MESSAGES.agreementСheckbox):
      hideErrorMessage('agreementCheckboxError');
  };

  const checkFormValid = () => {
    const isFormValid = Object.values(formFields).every(value => value.isValid);
    isFormValid ? signUpBtn.removeAttribute('disabled'): signUpBtn.setAttribute('disabled', true);
  };

};
