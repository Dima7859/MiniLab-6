import { signIn } from '../../api/api-handlers';
import { setToken } from '../../shared/ls-service';
import { routes } from '../../shared/constants/routes';
import {  passwordLengthValidator,emailValidator } from '../../shared/validators';
import { showFormErrorMessage, hideFormErrorMessage } from '../../shared/error-hendlers';

export const signInHandler = () => {
  const signInForm = document.querySelector('.sing-in__form');
  const signInBtn = document.getElementById('signInBtn');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const inputError = document.querySelector('.input-error');

  const formFields = {
    email: {
      isValid: true
    },
    password: {
      isValid: false
    }
  }

  signInBtn.setAttribute('disabled', true);

  signInForm.addEventListener('submit', event =>{
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signIn(email, password)
      .then( response => {
        if (response) {
          const { idToken: token } = response.data;
          setToken(token);
          window.location.href = routes.home;
        };
      });
  });

  passwordInput.oninput = () => {
    if (passwordLengthValidator(passwordInput.value)) {
      formFields.password.isValid = true ;
      passwordInput.style.backgroundColor = '#fff';
      hideFormErrorMessage();
    } else {
      formFields.password.isValid = false ;
    }
    checkFormValid();
  };

  // emailInput.oninput = () => {
  //   if (emailValidator(emailInput.value)) {
  //     formFields.email.isValid = true ;
  //     hideFormErrorMessage();
  //   } else {
  //     formFields.email.isValid = false ;
  //   }
  //   checkFormValid();
  // };

  passwordInput.onblur = () => {
    !passwordLengthValidator(passwordInput.value)? showFormErrorMessage() : hideFormErrorMessage();
  };

  passwordInput.onblur = () => {
    if (!passwordLengthValidator(passwordInput.value)) {
      showFormErrorMessage();
      passwordInput.style.backgroundColor = 'red';
    } else hideFormErrorMessage();
  };

  const checkFormValid = () => {
    const isFormValid = Object.values(formFields).every(value => value.isValid);
    isFormValid ? signInBtn.removeAttribute('disabled'): signInBtn.setAttribute('disabled', true);
  };

};
