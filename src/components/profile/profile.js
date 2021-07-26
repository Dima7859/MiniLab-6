import { removeToken, removeUserEmail, removeUserName, removeUserKey } from '../../shared/ls-service';
import { routes } from '../../shared/constants/routes';

export const logoutBtnHandler = () => {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.onclick = () => {
    removeToken();
    removeUserEmail();
    removeUserName();
    removeUserKey();
    window.location.href = routes.startPage;
  };
};
