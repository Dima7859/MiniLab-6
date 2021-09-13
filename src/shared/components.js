import { routes } from './constants/routes';
import { hideErrorMessage, showErrorMessage } from './error-handlers';
import { LocalStorageService } from './ls-service';

export const logoutBtnHandler = () => {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.onclick = () => {
    LocalStorageService.clearStorage();
    window.location.href = routes.startPage;
  };
};

export const profileLinkBtnHandler = () => {
  const profileLinkBtn = document.getElementById('profileLinkBtn');
  profileLinkBtn.onclick = () => {
    window.location.href = routes.profile;
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

export const validContentOninput = (inp, btn, validFun, idError ) => {
  if (validFun(inp.value)) {
    inp.classList.remove('invalid');
    btn.removeAttribute('disabled')
    hideErrorMessage(idError);
  } else {
    btn.setAttribute('disabled', true);
  };
}

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

export const setUserInfo = () => {
  const photo = document.getElementById('userAvatar');
  const headerInfoName = document.getElementById('headerInfoName');
  const userPhotoUrl = LocalStorageService.getPersonalData().photo;
  photo.style.backgroundImage = userPhotoUrl ?
    `url("${userPhotoUrl}")` : `url("gs://dimade7859-test.appspot.com/photos/C:\fakepath\user.png")`;
  headerInfoName.innerText = LocalStorageService.getPersonalData().name;
}
