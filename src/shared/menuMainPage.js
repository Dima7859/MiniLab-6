import { createBoards } from '../api/api-handlers';
import { ERROR_MESSAGES } from '../components/error-messages';

import { hideBlockSpinner, showBlockSpinner } from '../components/spinner/spinner';
import {
  clearLookBoards,
  openBoardNameMenu,
  openModalInputMenu,
  validContentOnblur,
  validContentOninput
} from './components';
import { contentNameValidator } from './validators';
import { viewingBoardsUser } from './viewingBoards';

export const openMenu = () => {
  const btnOpenMenu = document.querySelector('.mainPage__header__btnMenu');
  const userMenuBoards = document.getElementById('userMenuBoards');
  const btnOpenCreateBoard = document.getElementById('btnOpenCreateBoard');
  const modelBlockCreate = document.getElementById('modelCreateBoard');
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

  btnOpenActiveBoard.onclick = async () => {
    showBlockSpinner();
    viewingBoardsUser('Active');
    setTimeout(() => hideBlockSpinner(),400);
  };

  btnOpenClosedBoard.onclick = () => {
    showBlockSpinner();
    viewingBoardsUser('Closed');
    setTimeout(() => hideBlockSpinner(),400);
  }
};
