import { createBoards } from '../api/api-handlers';
import { clearLookBoards } from '../components/profile/profile';
import { viewingBoardsUser } from './viewingBoards';

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

  btnOpenMenu.onclick = () => {
    const isClicked = btnOpenMenu.getAttribute('clicked');
    if (!isClicked) {
      btnOpenMenu.setAttribute('clicked', true);
      userMenuBoards.style.left = '-300px';
    } else {
      userMenuBoards.style.left = '0';
      btnOpenMenu.removeAttribute('clicked');
    }
  };

  const openCreateBoard = () => {
    const isClicked = modelBlockCreate.getAttribute('clicked');
    if (!isClicked) {
      modelBlockCreate.setAttribute('clicked', true);
      modelBlockCreate.style.display = 'flex';
    } else {
      modelBlockCreate.style.display = 'none';
      modelBlockCreate.removeAttribute('clicked');
    }
  }

  btnOpenCreateBoard.onclick = () => openCreateBoard();
  btnClosedCreateBoard.onclick = () => openCreateBoard();

  inputCreateBoard.oninput = () => {
    inputCreateBoard.value !== '' ? btnCreateBoard.removeAttribute('disabled') : btnCreateBoard.setAttribute('disabled', true);
  };

  btnCreateBoard.onclick = () => {
    createBoards(inputCreateBoard.value)
      .then(response => inputCreateBoard.value = null);

    openCreateBoard();
    clearLookBoards();
  };

  btnOpenActiveBoard.onclick = () => {
    viewingBoardsUser('active');
  };

  btnOpenClosedBoard.onclick = () => {
    viewingBoardsUser('closed');
  }
};
