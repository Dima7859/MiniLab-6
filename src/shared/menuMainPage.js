import { createBoards } from '../api/api-handlers';
import { ERROR_MESSAGES } from '../components/error-messages';
import { clearLookBoards } from '../components/profile/profile';
import { hideErrorMessage, showErrorMessage } from './error-handlers';
import { contentNameValidator } from './validators';
import { viewingBoardsUser } from './viewingBoards';

export const openBoardNameMenu = block => {
  const isClicked = block.getAttribute('clicked');
  if (!isClicked) {
    block.setAttribute('clicked', true);
    block.style.left = '-300px';
  } else {
    block.style.left = '0';
    block.removeAttribute('clicked');
  }
};

export const openModalInputMenu = modalBlock => {
  const isClicked = modalBlock.getAttribute('clicked');
  if (!isClicked) {
    modalBlock.setAttribute('clicked', true);
    modalBlock.style.display = 'flex';
  } else {
    modalBlock.style.display = 'none';
    modalBlock.removeAttribute('clicked');
  }
};

export const validContentOnblur = (inp, btn, validFun, idError, messagesError) => {
  if (!validFun(inp.value)) {
    inp.classList.add('invalid');
    btn.setAttribute('disabled', true);
    showErrorMessage( idError, messagesError);
  } else {
    hideErrorMessage(idError);
    btn.removeAttribute('disabled')
  };
}

export const validContentOninput = (inp, btn, validFun, idError ) => {
  if (validFun(inp.value)) {
    inp.classList.remove('invalid');
    btn.removeAttribute('disabled')
    hideErrorMessage(idError);
  } else {
    btn.setAttribute('disabled', true);
  };
}

export const openMenu = () => {
  const btnOpenMenu = document.querySelector('.mainPage__header__btnMenu');
  const userMenuBoards = document.getElementById('userMenuBoards');
  const btnOpenCreateBoard = document.getElementById('btnOpenCreateBoard');
  const modelBlockCreate = document.querySelector('.mainPage__menuBoards__modelBlock');
  const btnClosedCreateBoard = document.getElementById('btnClosedCreateBoard');
  const btnCreateBoard = document.getElementById('btnCreateBoard');
  const inputCreateBoard = document.getElementById('inputCreateBoard');
  const btnOpenActiveBoard = document.getElementById('btnOpenActiveBoard');
  const btnOpenClosedBoard = document.getElementById('btnOpenClosedBoard');

  btnCreateBoard.setAttribute('disabled', true);

  btnOpenMenu.onclick = () => openBoardNameMenu(userMenuBoards);

  btnOpenCreateBoard.onclick = () => openModalInputMenu(modelBlockCreate);
  btnClosedCreateBoard.onclick = () => openModalInputMenu(modelBlockCreate);

  inputCreateBoard.oninput = () => validContentOninput(inputCreateBoard, btnCreateBoard, contentNameValidator, 'boardError');
  inputCreateBoard.onblur = () => validContentOnblur(inputCreateBoard, btnCreateBoard, contentNameValidator, 'boardError', ERROR_MESSAGES.nameContent);

  btnCreateBoard.onclick = async () => {
    await createBoards(inputCreateBoard.value);
    inputCreateBoard.value = null;
    openModalInputMenu(modelBlockCreate);
    clearLookBoards();
  };

  btnOpenActiveBoard.onclick = () => {
    viewingBoardsUser('Active');
  };

  btnOpenClosedBoard.onclick = () => {
    viewingBoardsUser('Closed');
  }
};
