import { logoutBtnHandler } from '../components/profile/profile';
import { LocalStorageService } from './ls-service';

export const userNameAvatar = () => {
  const headerInfoName = document.getElementById('headerInfoName');
  headerInfoName.innerText = LocalStorageService.getPersonalData().name;
};

export const menuHederHendler = () => {
  const userAvatar = document.getElementById('userAvatar');
  const userAvatarMenu = document.getElementById('userAvatarMenu');

  userAvatar.onclick = () => {
    const isClicked = userAvatarMenu.getAttribute('clicked');
    if (!isClicked) {
      userAvatarMenu.style.display = 'flex';
      userAvatarMenu.setAttribute('clicked', true);
    } else {
      userAvatarMenu.removeAttribute('clicked');
      userAvatarMenu.style.display = 'none';
    }
  };
  logoutBtnHandler();
};
