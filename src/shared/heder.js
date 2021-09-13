import { logoutBtnHandler, openModalInputMenu, profileLinkBtnHandler } from './components';
import { LocalStorageService } from './ls-service';

export const userNameAvatar = () => {
  const headerInfoName = document.getElementById('headerInfoName');
  headerInfoName.innerText = LocalStorageService.getPersonalData().name;
};

export const menuHederHendler = () => {
  const userAvatar = document.getElementById('userAvatar');
  const userAvatarMenu = document.getElementById('userAvatarMenu');
  userAvatar.onclick = () => openModalInputMenu(userAvatarMenu);

  logoutBtnHandler();
  profileLinkBtnHandler();
};
