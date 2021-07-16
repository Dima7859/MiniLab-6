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
          const { email } = response.user;
          signIn(email, passwordInput.value)
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

  nameInput.oninput = () => {
    if (nameValidator(nameInput.value)) {
      formFields.name.isValid = true;
      hideNameErrorMessage();
      nameInput.classList.remove('invalid');
    } else {
      formFields.name.isValid = false;
    }
    checkFormValid();
  };

  nameInput.onblur = () => {
    if (!nameValidator(nameInput.value)) {
      showNameErrorMessage();
      nameInput.classList.add('invalid');
    } else hideNameErrorMessage();
  };

  emailInput.oninput = () => {
    if (emailValidator(emailInput.value)) {
      formFields.email.isValid = true;
      hideEmailErrorMessage();
      emailInput.classList.remove('invalid');
    } else {
      formFields.email.isValid = false;
    }
    checkFormValid();
  };

  emailInput.onblur = () => {
    if (!emailValidator(emailInput.value)) {
      showEmailErrorMessage();
      emailInput.classList.add('invalid');
    } else hideEmailErrorMessage();
  };

  passwordInput.oninput = () => {
    if (passwordLengthValidator(passwordInput.value)) {
      formFields.password.isValid = true;
      hidePasswordLengthErrorMessage();
      passwordInput.classList.remove('invalid');
    } else {
      formFields.password.isValid = false;
    }
    checkFormValid();
  };

  passwordInput.onblur = () => {
    if (!passwordLengthValidator(passwordInput.value)) {
      showPasswordLengthErrorMessage();
      passwordInput.classList.add('invalid');
    } else hidePasswordLengthErrorMessage();
  };

  repeatPasswordInput.oninput = () => {
    if (repeatPasswordInput.value === passwordInput.value) {
      formFields.repeatPassword.isValid = true;
      hideRepeatPasswordErrorMessage();
      repeatPasswordInput.classList.remove('invalid');
    } else {
      formFields.repeatPassword.isValid = false;
    }
    checkFormValid();
  };

  repeatPasswordInput.onblur = () => {
    if (repeatPasswordInput.value !== passwordInput.value) {
      showRepeatPasswordErrorMessage();
      repeatPasswordInput.classList.add('invalid');
    } else hideRepeatPasswordErrorMessage();
  };

  agreementCheckbox.onchange = () => {
    if (agreementCheckbox.checked) {
      formFields.agreementCheckbox.isValid = true;
      hideAgreementCheckboxErrorMessage();
    } else {
      formFields.agreementCheckbox.isValid = false;
    }
    checkFormValid();
  };

  agreementCheckbox.onblur = () => {
    if (!agreementCheckbox.checked) {
      showAgreementCheckboxErrorMessage();
    } else hideAgreementCheckboxErrorMessage();
  };

  const checkFormValid = () => {
    const isFormValid = Object.values(formFields).every(value => value.isValid);
    isFormValid ? signUpBtn.removeAttribute('disabled'): signUpBtn.setAttribute('disabled', true);
  };

};
