import { resetPassword } from '../../api/api-handlers';
import { routes } from '../../shared/constants/routes';
import { emailValidator } from '../../shared/validators';
import { hideEmailErrorMessage, showEmailErrorMessage } from '../../shared/error-handlers';

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
      hideEmailErrorMessage();
      emailInput.classList.remove('invalid');
      resetPasswordBtn.removeAttribute('disabled')
    } else {
      resetPasswordBtn.setAttribute('disabled', true);
    };
  };

  emailInput.onblur = () => {
    if (!emailValidator(emailInput.value)) {
      showEmailErrorMessage();
      emailInput.classList.add('invalid');
      resetPasswordBtn.setAttribute('disabled', true);
    } else {
      hideEmailErrorMessage();
      resetPasswordBtn.removeAttribute('disabled')
    };
  };
};
