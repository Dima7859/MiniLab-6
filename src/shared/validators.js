import { REGEXP } from './constants/regexp';
import moment from 'moment';
import { hideErrorMessage, showErrorMessage } from './error-handlers';

export const passwordLengthValidator = password => password.match(REGEXP.PASSWORD_LENGTH);
export const emailValidator = email => email.match(REGEXP.EMAIL);
export const nameValidator = name => name.match(REGEXP.NAME);
export const contentNameValidator = name => name.match(REGEXP.CONTENT);
export const contentTaskValidator = content => content.match(REGEXP.TASK);
export const dragAndDropMobileTaskValidator = content => content.match(REGEXP.dragAndDropMobileTask);

export const validAllTaskContent = {
  content: {
    isValid: false
  },
  date: {
    isValid: false
  },
}

export const dateTaskValidator = TaskDate => {
  let toDay = moment().format('YYYY-MM-DD').split('-');
  let calendar = TaskDate.split('-');
  let status;

  const validDate = {
    year: {
      isValid: false
    },
    month: {
      isValid: false
    },
    day: {
      isValid: false
    },
  }

  toDay.forEach( ( item, i ) => {
    switch (i) {
      case 0:
        if (Number(item) < Number(calendar[i])) {
          validDate.year.isValid = true;
        }
        break;
      case 1:
        if (Number(item) < Number(calendar[i])) {
          validDate.month.isValid = true;
        }
        break;
      case 2:
        if (Number(item) <= Number(calendar[i])) {
          validDate.day.isValid = true;
        }
        break;
      default:
        break;
    }
  })

  validDate.year.isValid || validDate.month.isValid || validDate.day.isValid ?
  status = true :
  status = false;

  return status;
};

export const validContentTaskOnblur = ( inp, validFun, idError, messagesError ) => {
  if (!validFun(inp.value)) {
    inp.classList.add('invalid');
    showErrorMessage( idError, messagesError);
    validAllTaskContent.content.isValid = false;
  } else {
    hideErrorMessage(idError);
  };

  checkFormValid();
}

export const validContentTaskOninput = ( inp, validFun, idError ) => {
  if (validFun(inp.value)) {
    inp.classList.remove('invalid');
    hideErrorMessage(idError);
    validAllTaskContent.content.isValid = true;
  };

  checkFormValid();
}

export const validDateTaskOnblur = ( inp, validFun, idError, messagesError ) => {
  if (!validFun(inp.value)) {
    inp.classList.add('invalid');
    showErrorMessage( idError, messagesError);
    validAllTaskContent.date.isValid = false;
  } else {
    hideErrorMessage(idError);
  };

  checkFormValid();
}

export const validDateTaskOninput = ( inp, validFun, idError ) => {
  if (validFun(inp.value)) {
    inp.classList.remove('invalid');
    hideErrorMessage(idError);
    validAllTaskContent.date.isValid = true;
  };

  checkFormValid();
}

export const checkFormValid = () => {
  const btnCreateTask = document.getElementById('btnCreateTask');
  const isFormValid = Object.values(validAllTaskContent).every(value => value.isValid);
  isFormValid ? btnCreateTask.removeAttribute('disabled'): btnCreateTask.setAttribute('disabled', true);
};
