import { ERROR_MESSAGES } from "../components/error-messages";

export const showFormErrorMessage = () => {
  const inputErrorTag = document.querySelector('.input-error');
  inputErrorTag.textContent = ERROR_MESSAGES.password_length ;
  inputErrorTag.style.display = 'block';
};

export const hideFormErrorMessage = () => {
  const inputErrorTag = document.querySelector('.input-error');
  inputErrorTag.style.display = 'none';
};
