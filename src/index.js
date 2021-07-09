import './components/styles/style.scss';
import { paths, routes } from './shared/constants/routes';
import { signInHandler } from './components/sign-in/sign-in';
import { getToken } from './shared/ls-service';
import { logoutBtnHandler } from './components/profile/profile';
import { signUpHendler } from './components/sign-up/sign-up';

window.onload = () => {

  const pathname = Object.values(paths).find( path => path === window.location.pathname );

  switch (pathname) {
    case paths.home:
      const token = getToken();

      if (!token) {
        window.location.href = routes.sign_in;
      } else {
        logoutBtnHandler();
      };
      break;
    case paths.sign_in:
      signInHandler();
      break;
    case paths.sign_up:
      signUpHendler();
      break;
    default:
      break;
  };
};
