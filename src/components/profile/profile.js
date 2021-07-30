import { clearStorage } from '../../shared/ls-service';
import { routes } from '../../shared/constants/routes';

export const logoutBtnHandler = () => {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.onclick = () => {
    clearStorage();
    window.location.href = routes.startPage;
  };
};

export const clearLookBoards = () => {
  const lookBoardsActive = document.getElementById('lookBoardsActive');
  const lookBoardsClosed = document.getElementById('lookBoardsClosed');

  while (lookBoardsActive.firstChild) {
    lookBoardsActive.removeChild(lookBoardsActive.firstChild);
  };

  while (lookBoardsClosed.firstChild) {
    lookBoardsClosed.removeChild(lookBoardsClosed.firstChild);
  };
};
