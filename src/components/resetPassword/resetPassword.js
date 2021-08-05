import { resetPassword } from '../../api/api-handlers';
import { routes } from '../../shared/constants/routes';
import { emailValidator } from '../../shared/validators';
import { hideErrorMessage, showErrorMessage } from '../../shared/error-handlers';
import { ERROR_MESSAGES } from '../error-messages';

export const resetPasswordHandler = () => {
  const resetPasswordForm = document.querySelector('.resetPassword__form');
  const emailInput = document.getElementById('email');
  const resetPasswordBtn = document.getElementById('resetPasswordBtn');
  const modalCompleted = document.getElementById('modalCompleted');

  resetPasswordBtn.setAttribute('disabled', true);

  resetPasswordForm.addEventListener('submit', event =>{
    event.preventDefault();

    resetPassword(emailInput.value)
      .then(response => {
        if (response) {
          modalCompleted.style.display = 'flex';
          setTimeout(() => window.location.href = routes.sign_in, 3000);
        }
      });
  });

  emailInput.oninput = () => {
    if (emailValidator(emailInput.value)) {
      hideErrorMessage('emailError');
      emailInput.classList.remove('invalid');
      resetPasswordBtn.removeAttribute('disabled')
    } else {
      resetPasswordBtn.setAttribute('disabled', true);
    };
  };

  emailInput.onblur = () => {
    if (!emailValidator(emailInput.value)) {
      showErrorMessage('emailError', ERROR_MESSAGES.email);
      emailInput.classList.add('invalid');
      resetPasswordBtn.setAttribute('disabled', true);
    } else {
      hideErrorMessage('emailError');
      resetPasswordBtn.removeAttribute('disabled')
    };
  };
};
