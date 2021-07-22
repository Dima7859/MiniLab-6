import { signIn, createdUser } from '../../api/api-handlers';
import { setToken } from '../../shared/ls-service';
import { routes } from '../../shared/constants/routes';
import {
  nameValidator,
  emailValidator,
  passwordLengthValidator
} from '../../shared/validators';
import {
  showNameErrorMessage,
  hideNameErrorMessage,
  showEmailErrorMessage,
  hideEmailErrorMessage,
  showPasswordLengthErrorMessage,
  hidePasswordLengthErrorMessage,
  showRepeatPasswordErrorMessage,
  hideRepeatPasswordErrorMessage,
  showAgreementCheckboxErrorMessage,
  hideAgreementCheckboxErrorMessage
} from '../../shared/error-handlers';

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

    createdUser(nameInput.value, emailInput.value, passwordInput.value)
      .then( response => {
        if (response) {
          signIn(emailInput.value, passwordInput.value)
            .then( response => {
              if (response) {
                const { idToken: token } = response.data;
                setToken(token);
                window.location.href = routes.home;
              };
            });
        };
      });
  });

  btnWatchPassword.onclick = () => passwordInput.type === "password" ? passwordInput.type = "text" : passwordInput.type = "password";

  btnWatchRepeatPassword.onclick = () => repeatPasswordInput.type === "password" ? repeatPasswordInput.type = "text" : repeatPasswordInput.type = "password";

  nameInput.oninput = () => {
    if (nameValidator(nameInput.value)) {
      formFields.name.isValid = true;
      hideNameErrorMessage();
      nameInput.classList.remove('invalid');
    } else {
      formFields.name.isValid = false;
      nameInput.classList.add('invalid');
    }
    checkFormValid();
  };

  nameInput.onblur = () => {
    !nameValidator(nameInput.value) ?
      showNameErrorMessage():
      hideNameErrorMessage();
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

  emailInput.onblur = () => {
    !emailValidator(emailInput.value) ?
    showEmailErrorMessage():
    hideEmailErrorMessage();
  };

  passwordInput.oninput = () => {
    if (passwordLengthValidator(passwordInput.value)) {
      formFields.password.isValid = true;
      hidePasswordLengthErrorMessage();
      passwordInput.classList.remove('invalid');
    } else {
      formFields.password.isValid = false;
      passwordInput.classList.add('invalid');
    }

    if (repeatPasswordInput.value !== '' && repeatPasswordInput.value === passwordInput.value) {
      formFields.repeatPassword.isValid = true;
      repeatPasswordInput.classList.remove('invalid');
      hideRepeatPasswordErrorMessage();
    } else {
      formFields.repeatPassword.isValid = false;
    }

    checkFormValid();
  };

  passwordInput.onblur = () => {
    !passwordLengthValidator(passwordInput.value)?
      showPasswordLengthErrorMessage():
      hidePasswordLengthErrorMessage();

    if (repeatPasswordInput.value !== '' && repeatPasswordInput.value !== passwordInput.value) {
      showRepeatPasswordErrorMessage();
      repeatPasswordInput.classList.add('invalid');
      formFields.repeatPassword.isValid = false;
    } else {
      repeatPasswordInput.classList.remove('invalid');
      hideRepeatPasswordErrorMessage();
    }

    checkFormValid();
  };

  repeatPasswordInput.oninput = () => {
    if (formFields.password.isValid && password.value === repeatPasswordInput.value) {
      formFields.repeatPassword.isValid = true
      hideRepeatPasswordErrorMessage();
      repeatPasswordInput.classList.remove('invalid');
    } else {
      formFields.repeatPassword.isValid  = false
      repeatPasswordInput.classList.add('invalid');
    };

    checkFormValid();
  };


  repeatPasswordInput.onblur = () => {
    repeatPasswordInput.value !== passwordInput.value ?
      showRepeatPasswordErrorMessage():
      hideRepeatPasswordErrorMessage();
  };

  agreementCheckbox.onchange = () => {
    if (agreementCheckbox.checked) {
      formFields.agreementCheckbox.isValid = true;
      hideAgreementCheckboxErrorMessage();
    } else {
      formFields.agreementCheckbox.isValid = false;
      showAgreementCheckboxErrorMessage();
    }
    checkFormValid();
  };

  agreementCheckbox.onblur = () => {
    !agreementCheckbox.checked ?
      showAgreementCheckboxErrorMessage():
      hideAgreementCheckboxErrorMessage();
  };

  const checkFormValid = () => {
    const isFormValid = Object.values(formFields).every(value => value.isValid);
    isFormValid ? signUpBtn.removeAttribute('disabled'): signUpBtn.setAttribute('disabled', true);
  };

};
